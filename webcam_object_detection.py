import numpy as np
import os
import tensorflow as tf
import cv2
from collections import Counter

import server

# start server
server.start()

# import object detection utils
from object_detection.utils import ops as utils_ops
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util

# What model
MODEL_NAME = 'ssd_mobilenet_v1_coco_2017_11_17'

# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_FROZEN_GRAPH = MODEL_NAME + '/frozen_inference_graph.pb'

# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = os.path.join(
    'object_detection/data',
    'mscoco_label_map.pbtxt')

# Anzahl Frames im Counter-Array
FRAMES = 15
#Schwellwert
THRESHOLD = 8

# load detection graph
detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.compat.v1.GraphDef()
    with tf.compat.v2.io.gfile.GFile(PATH_TO_FROZEN_GRAPH, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')

category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)


# algorithmus um ein einzelnes bild zu analysieren.
def run_inference_for_single_image(image, graph):
    if 'detection_masks' in tensor_dict:
        # The following processing is only for single image
        detection_boxes = tf.squeeze(tensor_dict['detection_boxes'], [0])
        detection_masks = tf.squeeze(tensor_dict['detection_masks'], [0])
        # Reframe is required to translate mask from box coordinates to image coordinates and fit the image size.
        real_num_detection = tf.cast(tensor_dict['num_detections'][0], tf.int32)
        detection_boxes = tf.slice(detection_boxes, [0, 0], [real_num_detection, -1])
        detection_masks = tf.slice(detection_masks, [0, 0, 0], [real_num_detection, -1, -1])
        detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
            detection_masks, detection_boxes, image.shape[0], image.shape[1])
        detection_masks_reframed = tf.cast(
            tf.greater(detection_masks_reframed, 0.5), tf.uint8)
        # Follow the convention by adding back the batch dimension
        tensor_dict['detection_masks'] = tf.expand_dims(
            detection_masks_reframed, 0)
    image_tensor = tf.compat.v1.get_default_graph().get_tensor_by_name('image_tensor:0')

    # count_inference = count_inference + 1

    # Run inference
    output_dict = sess.run(tensor_dict,
                           feed_dict={image_tensor: np.expand_dims(image, 0)})

    # all outputs are float32 numpy arrays, so convert types as appropriate
    output_dict['num_detections'] = int(output_dict['num_detections'][0])
    output_dict['detection_classes'] = output_dict[
        'detection_classes'][0].astype(np.uint8)

    output_dict['detection_boxes'] = output_dict['detection_boxes'][0]
    output_dict['detection_scores'] = output_dict['detection_scores'][0]
    if 'detection_masks' in output_dict:
        output_dict['detection_masks'] = output_dict['detection_masks'][0]
    return output_dict


# webcam frames mit OpenCV erkennen
cap = cv2.VideoCapture(0)
try:
    with detection_graph.as_default():
        with tf.compat.v1.Session() as sess:
            # Get handles to input and output tensors
            ops = tf.compat.v1.get_default_graph().get_operations()
            all_tensor_names = {output.name for op in ops for output in op.outputs}
            tensor_dict = {}
            for key in [
                'num_detections', 'detection_boxes', 'detection_scores',
                'detection_classes', 'detection_masks'
            ]:
                tensor_name = key + ':0'
                if tensor_name in all_tensor_names:
                    tensor_dict[key] = tf.compat.v1.get_default_graph().get_tensor_by_name(
                        tensor_name)

            # count_inference = aktueller Durchlauf
            count_inference = 0

            # array für aktuelle objekte
            current_object_names = []

            while True:

                # count_inference inkrementieren
                count_inference = count_inference + 1

                ret, image_np = cap.read()
                # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
                image_np_expanded = np.expand_dims(image_np, axis=0)

                # Actual detection.
                output_dict = run_inference_for_single_image(image_np, detection_graph)

                # Visualization of the results of a detection.
                vis_util.visualize_boxes_and_labels_on_image_array(
                    image_np,
                    output_dict['detection_boxes'],
                    output_dict['detection_classes'],
                    output_dict['detection_scores'],
                    category_index,
                    instance_masks=output_dict.get('detection_masks'),
                    use_normalized_coordinates=True,
                    line_thickness=8)

                ###################
                # funktionen aufrufen die erkannte labels an den server sendet
                ##

                # nur objekte erkennen die mehr als 50% treffergenauigkeit aufweisen
                final_score = np.squeeze(output_dict['detection_scores'])
                count = 0
                for i in range(100):
                    if output_dict['detection_scores'] is None or final_score[i] > 0.5:
                        count = count + 1

                print('number of detected obj: ', count)
                counted_objects = int(count)
                server.send(message='objects', data={'x': counted_objects})

                # schleife um erkannte labels ausgeben
                printcount = 0

                for i in output_dict['detection_classes']:
                    printcount = printcount + 1

                    if count > 0:
                        # neue objekte des aktuellen frames hinzufügen
                        current_object_names.append(category_index[i]['name'])

                        # sortieren
                        current_object_names = sorted(current_object_names, key=str.lower)

                    if count_inference == FRAMES:
                        # print("count_inference: ", count_inference)
                        # print('current_object_names: ', current_object_names)

                        # häufigkeitsanalyse der wörter
                        counter_arr = Counter(current_object_names)
                        possible_obj = ['person', 'bottle', 'cup', 'keyboard', 'clock', 'mouse']

                        for item in range(len(possible_obj)):
                            current_item_count = counter_arr[possible_obj[item]]
                            # print('current_item_count', current_item_count)
                            # print('possible_obj[item]', possible_obj[item])

                            if current_item_count >= THRESHOLD:
                                server.send(message='objects', data={str(possible_obj[item]): 1})
                            else:
                                server.send(message='objects', data={str(possible_obj[item]): 0})

                        # delete state
                        current_object_names = []
                        count_inference = 0
                        # alte werte überschreiben

                    if (printcount == count):
                        break
                ###################
                ##

                # bild mit cv2 in frame anzeigen
                cv2.imshow('object_detection', cv2.resize(image_np, (800, 600)))
                if cv2.waitKey(25) & 0xFF == ord('q'):
                    cap.release()
                    cv2.destroyAllWindows()
                    break
except Exception as e:
    print(e)
    cap.release()
