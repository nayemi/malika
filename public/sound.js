//globaler Play und Stop Button
let playStopButton = document.getElementById("playStopButton");
isPlaying = false;

// globaler audio context
let context = new AudioContext();

//**********************
// cup = Bass
let guitarSound = new Audio("sounds/Bass.mp3");
let isMuteGuitar = false;
let guitarSource = context.createMediaElementSource(guitarSound);
let guitarGain = context.createGain();
guitarSource.connect(guitarGain);
guitarGain.connect(context.destination);

//let guitarGainStore = guitarGain.gain.value;

// listener für den bass slider
guitarGainSlider = document.getElementById("cup-gainSlider");
guitarGainSlider.addEventListener("input", function (e) {
    let gainValue = (this.value / 10);
    document.getElementById("cup-gainOutput").innerHTML = gainValue + " dB";
    guitarGain.gain.value = gainValue;
});

//**********************
// person = drums
let drumsSound = new Audio("sounds/Drums.mp3");
let drumsSource = context.createMediaElementSource(drumsSound);
let drumsGain = context.createGain();
drumsSource.connect(drumsGain);
drumsGain.connect(context.destination);

// listener für den drums slider
drumsGainSlider = document.getElementById("person-gainSlider");
drumsGainSlider.addEventListener("input", function (e) {
    let drumGainValue = (this.value / 10);
    document.getElementById("person-gainOutput").innerHTML = drumGainValue + " dB";
    drumsGain.gain.value = drumGainValue;
});

//**********************
// bottle = Sequences
let seqSound = new Audio("sounds/Sequences.mp3");
let seqSource = context.createMediaElementSource(seqSound);
let seqGain = context.createGain();
seqSource.connect(seqGain);
seqGain.connect(context.destination);

// listener für den seq slider
seqGainSlider = document.getElementById("bottle-gainSlider");
seqGainSlider.addEventListener("input", function (e) {
    let seqGainValue = (this.value / 10);
    document.getElementById("bottle-gainOutput").innerHTML = seqGainValue + " dB";
    seqGain.gain.value = seqGainValue;
});

//**********************
// keyboard = Pads
let padsSound = new Audio("sounds/Pads.mp3");
let padsSource = context.createMediaElementSource(padsSound);
let padsGain = context.createGain();
padsSource.connect(padsGain);
padsGain.connect(context.destination);

// listener für den pads slider
padsGainSlider = document.getElementById("keyboard-gainSlider");
padsGainSlider.addEventListener("input", function (e) {
    let padsGainValue = (this.value / 10);
    document.getElementById("keyboard-gainOutput").innerHTML = padsGainValue + " dB";
    padsGain.gain.value = padsGainValue;
});

//**********************
// clock = Synth
let synthSound = new Audio("sounds/Synth.mp3");
let synthSource = context.createMediaElementSource(synthSound);
let synthGain = context.createGain();
synthSource.connect(synthGain);
synthGain.connect(context.destination);

// listener für den synth slider
synthGainSlider = document.getElementById("clock-gainSlider");
synthGainSlider.addEventListener("input", function (e) {
    let synthGainValue = (this.value / 10);
    document.getElementById("clock-gainOutput").innerHTML = synthGainValue + " dB";
    synthGain.gain.value = synthGainValue;
});

//**********************
// mouse = Synth
let vocalSound = new Audio("sounds/Vocals.mp3");
let vocalSource = context.createMediaElementSource(vocalSound);
let vocalGain = context.createGain();
vocalSource.connect(vocalGain);
vocalGain.connect(context.destination);

// listener für den vocal slider
vocalGainSlider = document.getElementById("mouse-gainSlider");
vocalGainSlider.addEventListener("input", function (e) {
    let vocalGainValue = (this.value / 10);
    document.getElementById("mouse-gainOutput").innerHTML = vocalGainValue + " dB";
    vocalGain.gain.value = vocalGainValue;
});



//**********************
//Event Listener für den globalen Play und Stop-Button
playStopButton.addEventListener("click", function (e) {

    if (isPlaying) {
        guitarSound.pause();
        drumsSound.pause();
        seqSound.pause();
        padsSound.pause();
        synthSound.pause();
        vocalSound.pause();
        playStopButton.innerHTML = "Play Tracks";
    } else {
        guitarSound.play();
        guitarGain.gain.value = 0;
        drumsSound.play();
        drumsGain.gain.value = 0;
        seqSound.play();
        seqGain.gain.value = 0;
        padsSound.play();
        padsGain.gain.value = 0;
        synthSound.play();
        synthGain.gain.value = 0;
        vocalSound.play();
        vocalGain.gain.value = 0;

        playStopButton.innerHTML = "Stop Tracks";
    }

    isPlaying = !isPlaying;
});
