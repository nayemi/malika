//globaler Play und Stop Button
let playStopButton = document.getElementById("playStopButton");
let isPlaying = false;



let context = new AudioContext();


// cup = Bass
cup_sound = false;


let guitarSound = new Audio("sounds/Bass.mp3");
let isMuteGuitar = false;
let guitarSource = context.createMediaElementSource(guitarSound);
let guitarGain = context.createGain();
let guitarGainStore = 0;
guitarSource.connect(guitarGain);
guitarGain.connect(context.destination);


guitarGainSlider = document.getElementById("cup-gainSlider");
guitarGainSlider.addEventListener("input", function (e) {
    let gainValue = (this.value / 10);
    document.getElementById("cup-gainOutput").innerHTML = gainValue + " dB";
    guitarGain.gain.value = gainValue;
});

// if(cup_sound){
//     guitarGain.gain.value = 10;
// } else {
//     guitarGain.gain.value = 0;
// }

// guitarMuteButton = document.getElementById('cup-muteButton');
// guitarMuteButton.addEventListener("click", function (e) {
//     guitarGainStore = (guitarGainSlider.value / 10);
//     if (isMuteGuitar) {
//         guitarGain.gain.value = 0;
//         this.innerHTML = "ON";
//         guitarSound.pause();
//         console.log("Mute guitar = "+ isMuteGuitar);
//     } else {
//         guitarGain.gain.value = guitarGainStore;
//         this.innerHTML = "OFF";
//          guitarSound.play();
//     }
//     isMuteGuitar = !isMuteGuitar;
// });



// person = drums
person_sound = false;

let drumsSound = new Audio("sounds/Drums.mp3");
let isMuteDrums = false;
let drumsSource = context.createMediaElementSource(drumsSound);
let drumsGain = context.createGain();
let drumsGainStore = 0;
drumsSource.connect(drumsGain);
drumsGain.connect(context.destination);



drumsGainSlider = document.getElementById("person-gainSlider");
drumsGainSlider.addEventListener("input", function (e) {
    let drumGainValue = (this.value / 10);
    document.getElementById("person-gainOutput").innerHTML = drumGainValue + " dB";
    drumsGain.gain.value = drumGainValue;
});


/*if(person_sound){
    guitarGain.gain.value = 10;
} else {
    guitarGain.gain.value = 0;
}*/

//drumsMuteButton = document.getElementById('person-muteButton');
// drumsMuteButton.addEventListener("click", function (e) {
//     drumsGainStore = (drumsGainSlider.value / 10);
//     if (isMuteDrums) {
//         drumsGain.gain.value = 0;
//         this.innerHTML = "ON";
//         //drumsSound.pause();
//         console.log("mute drums = "+ isMuteDrums);
//     } else {
//         drumsGain.gain.value = drumsGainStore;
//         this.innerHTML = "OFF";
//          //drumsSound.play();
//     }
//     isMuteDrums = !isMuteDrums;
// });





//Event Listener für den globalen Play und Stop-Button

playStopButton.addEventListener("click", function (e) {
    if (isPlaying) {
        guitarSound.pause();
        //guitarMuteButton.innerHTML = "Play";
        drumsSound.pause();
        //drumsMuteButton.innerHTML = "Play";

        playStopButton.innerHTML = "Play Tracks";
    } else {
        guitarSound.play();
        //guitarMuteButton.innerHTML = "Pause";
        drumsSound.play();
        //drumsMuteButton.innerHTML = "Pause";


        playStopButton.innerHTML = "Stop Tracks";
    }

    isPlaying = !isPlaying;
});



function ckeckMute(){

    if ((" " + guitarGainSlider.className + " ").replace(/[\n\t]/g, " ").indexOf("mute") > -1) {
         guitarGain.gain.value = 10;
    } else {
        guitarGain.gain.value = 0;
    }

}