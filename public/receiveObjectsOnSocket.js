function setStatus(element, element_status) {

    if (element_status !== undefined && element_status !== null) {
        let elementElement = document.getElementById(element); //must be string!
        console.log(" name: " + element);
        console.log(" element_status: " + element_status);

        //if element is hidden; d-none is the class checked for visibility
        if ((" " + elementElement.className + " ").replace(/[\n\t]/g, " ").indexOf("d-none") > -1) {
            if (element_status === '1') {
                //make it visible
                elementElement.classList.remove('d-none');
            }
        } else {// if element is visible
            if (element_status === '0') {
                // and is not in the list, now hide it
                elementElement.classList.add('d-none');
            }
        }
    }
}

function initialize() {
    var socket = io.connect();

    socket.on("objects", function (data) {

        let countItems = JSON.stringify(data.x);
        if (countItems !== undefined) {
            document.getElementById("countItems").innerHTML = `Anzahl Gegenstände: ${countItems}`;
        }

        //let container = document.getElementById("container");
        //let drumsInitalPlayed = false;

        let person_status = JSON.stringify(data.person);
        let bottle_status = JSON.stringify(data.bottle);
        let cup_status = JSON.stringify(data.cup);
        let keyboard_status = JSON.stringify(data.keyboard);
        let clock_status = JSON.stringify(data.clock);


        setStatus('person', person_status);
        setStatus('bottle', bottle_status);
        setStatus('cup', cup_status);
        setStatus('keyboard', keyboard_status);
        setStatus('clock', clock_status);


        //let items = ["person", person_status, "bottle"];

        //console.log(items);


        /*      if (person !== undefined) {
                  console.log("status person: " + person);
                  let personElement = document.getElementById(" ' "+ person + " ' "); //must be string!

                  //if element is hidden; d-none is the class checked for visibility
                  if ( (" " + personElement.className + " ").replace(/[\n\t]/g, " ").indexOf("d-none") > -1 ){
                      if (person === '1') {
                          //make it visible
                          personElement.classList.remove('d-none');
                      }
                  } else {// if element is visible
                      if(person === '0'){
                          // and is not in the list, now hide it
                          personElement.classList.add('d-none');
                      }
                  }
              }*/


        // if (data.names !== undefined) {
        //
        //     data.names.forEach(function (element) {
        //
        //         let elementExists = document.getElementById(element);
        //
        //         if (document.body.contains(elementExists)) {
        //
        //             //console.log("erkanntes Element :" + element);
        //             //console.log("elementExists"+ elementExists);
        //
        //             //sichtbar machen der Tonspuren im Browser
        //             elementExists.classList.remove('d-none');
        //
        //             // if(!drumsInitalPlayed && element === 'person'){
        //             //     console.log(drumsInitalPlayed);
        //             //     drumsInitalPlayed = true;
        //             //     drumsSound.play();
        //             //     drumsMuteButton.innerHTML = "OFF";
        //             // }
        //
        //
        //
        //         }
        //
        //     });
        // }

        //document.getElementById("names").innerHTML = `current_object_names: ${data.names}`;
    });

}


