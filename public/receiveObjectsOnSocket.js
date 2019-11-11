function initialize() {
    var socket = io.connect();

    socket.on("objects", function (data) {

        let countItems = JSON.stringify(data.x);
        if (countItems !== undefined) {
            document.getElementById("countItems").innerHTML = `Count: ${countItems}`;
        }

        let container = document.getElementById("container");

        if (data.names !== undefined) {

            data.names.forEach(function (element) {

                let elementExists = document.getElementById(element);

                if (document.body.contains(elementExists)) {

                    //console.log("erkanntes Element :" + element);
                    //console.log("elementExists"+ elementExists);

                    //sichtbar machen der Tonspuren im Browser
                    elementExists.classList.remove('d-none');
                }

            });
        }

        //document.getElementById("names").innerHTML = `current_object_names: ${data.names}`;
    });

}


