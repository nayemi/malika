function initialize() {
    var socket = io.connect();

    socket.on("objects", function (data) {

        let countItems = JSON.stringify(data.x);
        if (countItems !== undefined) {
            document.getElementById("countItems").innerHTML = `Count: ${countItems}`;
        }

        let container = document.getElementById("container");
        let drumsInitalPlayed = false;

        if (data.names !== undefined) {

            data.names.forEach(function (element) {

                let elementExists = document.getElementById(element);

                if (document.body.contains(elementExists)) {

                    //console.log("erkanntes Element :" + element);
                    //console.log("elementExists"+ elementExists);

                    //sichtbar machen der Tonspuren im Browser
                    elementExists.classList.remove('d-none');

                    // if(!drumsInitalPlayed && element === 'person'){
                    //     console.log(drumsInitalPlayed);
                    //     drumsInitalPlayed = true;
                    //     drumsSound.play();
                    //     drumsMuteButton.innerHTML = "OFF";
                    // }



                }

            });
        }

        //document.getElementById("names").innerHTML = `current_object_names: ${data.names}`;
    });

}


