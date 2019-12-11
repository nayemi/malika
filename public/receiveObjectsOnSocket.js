function setStatus(element, element_status, element_gain) {

    if (element_status !== undefined && element_status !== null) {
        let elementElement = document.getElementById(element); //must be string!
        //console.log(" name: " + element);
        //console.log(" element_status: " + element_status);
        let element_slider = document.getElementById(element + "-gainSlider");
        let element_output = document.getElementById(element + "-gainOutput");

        //default: bg-light is the class for inactive status = not playing
        if ((" " + elementElement.className + " ").replace(/[\n\t]/g, " ").indexOf("grey-border") > -1) {
            if (element_status === '1') {
                //make it visible
                elementElement.classList.remove('grey-border');
                elementElement.classList.add('blue-border');

                if (element_gain !== undefined) {
                    console.log(element, element_gain);
                    element_slider.value = 1;
                    element_output.innerHTML = 1 + " dB";
                    element_gain.gain.value = 1;

                    // switch (element) {
                    //   case "cup":
                    //     element_slider.value = cupGainValue;
                    //     element_output.innerHTML = cupGainValue + " dB";
                    //     element_gain.gain.value = cupGainValue;
                    //     break;
                    //   case "person":
                    //     element_slider.value = cupGainValue;
                    //     element_output.innerHTML = cupGainValue + " dB";
                    //     element_gain.gain.value = cupGainValue;
                    //     break;
                    //
                    //   default:
                    //     //
                    //     break;
                    // }
                }
            }
        } else { // if element is already visible
            // and is not in the list any more, hide it
            if (element_status === '0') {

                elementElement.classList.remove('blue-border');
                elementElement.classList.add('grey-border');

                if (element_gain !== undefined) {
                    element_slider.value = 0;
                    element_output.innerHTML = 0 + " dB";
                    element_gain.gain.value = 0;
                }
            }
        }
    }
}

function initialize() {
    var socket = io.connect();


    socket.on("objects", function (data) {

        let countItems = JSON.stringify(data.x);
        if (countItems !== undefined) {
            document.getElementById("countItems").innerHTML = `Count: ${countItems}`;
        }

        // data from tensor flow
        let person_status = JSON.stringify(data.person);
        let bottle_status = JSON.stringify(data.bottle);
        let cup_status = JSON.stringify(data.cup);
        let keyboard_status = JSON.stringify(data.keyboard);
        let clock_status = JSON.stringify(data.clock);
        let mouse_status = JSON.stringify(data.mouse);

        // set status for each object and instrument
        if (isPlaying) {
            setStatus('person', person_status, drumsGain);
            setStatus('bottle', bottle_status, seqGain);
            setStatus('cup', cup_status, bassGain);
            setStatus('keyboard', keyboard_status, padsGain);
            setStatus('clock', clock_status, synthGain);
            setStatus('mouse', mouse_status, vocalGain);
        }

    });

}


