//globaler Play und Stop Button
//let playStopButton = document.getElementById("playStopButton");
isPlaying = false;

// globaler audio context
let context = new AudioContext();

//**********************
// cup = Bass
let bassSound = new Audio("sounds/Bass.mp3");
let isMuteBass = false;
let bassSource = context.createMediaElementSource(bassSound);
let bassGain = context.createGain();
var bassFilter = context.createBiquadFilter();
var bassConvolver = context.createConvolver();
bassFilter.type = 'allpass';
bassSource.connect(bassFilter);
bassFilter.connect(bassGain);
bassGain.connect(context.destination);


//let bassGainStore = bassGain.gain.value;

// listener für den bass gain slider
bassGainSlider = document.getElementById("cup-gainSlider");
bassGainSlider.addEventListener("input", function (e) {
    let gainValue = (this.value / 10);
    document.getElementById("cup-gainOutput").innerHTML = gainValue + " dB";
    bassGain.gain.value = gainValue;
});

// listener für den bass freq slider
var bassFrequencySlider = document.getElementById("bassFrequencySlider");
bassFrequencySlider.addEventListener("input", function (e) {
    bassFilter.frequency.value = (this.value);
    document.getElementById("bassFrequencyOutput").innerHTML = (this.value) + " Hz";
});

// Bass Filter
var bassFilterSelectList = document.getElementById("bassFilterSelectList");
bassFilterSelectList.addEventListener("change", function(e){
    bassFilter.type = bassFilterSelectList.options[bassFilterSelectList.selectedIndex].value;
});

// Bass Convolver
var bassConvolverSelectList = document.getElementById("bassConvolverSelectList");

//bassLoadImpulseResponse("cave");

bassConvolverSelectList.addEventListener("change", function(e){
    var bassName = bassConvolverSelectList.options[bassConvolverSelectList.selectedIndex].value;
    //var bassConvolverOn = false;
    if(bassName.includes("off")){
        bassFilter.disconnect(bassConvolver);
        bassConvolver.disconnect(bassGain);
        bassFilter.connect(bassGain);
    }
    else{
        if(bassConvolverOn= false){
            bassFilter.disconnect(bassGain);
            bassFilter.connect(bassConvolver);
            bassConvolver.connect(bassGain);
        }
        
        bassLoadImpulseResponse(bassName);
    }
});

function bassLoadImpulseResponse(bassName){
    var request = new XMLHttpRequest();
    request.open("GET",  ("sounds/impulseResponses/" + bassName + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (bassConvolver) {bassConvolver.disconnect(); }
            bassConvolver = context.createConvolver();
            bassConvolver.buffer = buffer;
            bassConvolver.normalize = true;
            bassFilter.connect(bassConvolver);
            bassConvolver.connect(bassGain);
        });
    };
    request.send();
}

// listener für den bass quality slider
var bassQualitySlider = document.getElementById("bassQualitySlider");
bassQualitySlider.addEventListener("input", function (e) {
    bassFilter.Q.value = (this.value);
    document.getElementById("bassQualityOutput").innerHTML = (this.value) + " ";
});


//**********************
// person = drums
let drumsSound = new Audio("sounds/Drums.mp3");
let drumsSource = context.createMediaElementSource(drumsSound);
let drumsGain = context.createGain();
var drumsFilter = context.createBiquadFilter();
var drumsConvolver = context.createConvolver();
drumsFilter.type = 'allpass';
drumsSource.connect(drumsFilter);
drumsFilter.connect(drumsGain);
drumsGain.connect(context.destination);

// listener für den drums slider
drumsGainSlider = document.getElementById("person-gainSlider");
drumsGainSlider.addEventListener("input", function (e) {
    let drumGainValue = (this.value / 10);
    document.getElementById("person-gainOutput").innerHTML = drumGainValue + " dB";
    drumsGain.gain.value = drumGainValue;
});


// listener für den drums freq slider
var drumsFrequencySlider = document.getElementById("drumsFrequencySlider");
drumsFrequencySlider.addEventListener("input", function (e) {
    drumsFilter.frequency.value = (this.value);
    document.getElementById("drumsFrequencyOutput").innerHTML = (this.value) + " Hz";
});

// drums Filter
var drumsFilterSelectList = document.getElementById("drumsFilterSelectList");
drumsFilterSelectList.addEventListener("change", function(e){
    drumsFilter.type = drumsFilterSelectList.options[drumsFilterSelectList.selectedIndex].value;
});

// drums Convolver
var drumsConvolverSelectList = document.getElementById("drumsConvolverSelectList");

//drumsLoadImpulseResponse("cave");

drumsConvolverSelectList.addEventListener("change", function(e){
    var drumsName = drumsConvolverSelectList.options[drumsConvolverSelectList.selectedIndex].value;
    //var drumsConvolverOn = false;
    if(drumsName.includes("off")){
        drumsFilter.disconnect(drumsConvolver);
        drumsConvolver.disconnect(drumsGain);
        drumsFilter.connect(drumsGain);
    }
    else{
        if(drumsConvolverOn= false){
            drumsFilter.disconnect(drumsGain);
            drumsFilter.connect(drumsConvolver);
            drumsConvolver.connect(drumsGain);
        }
        
        drumsLoadImpulseResponse(drumsName);
    }
});

function drumsLoadImpulseResponse(drumsName){
    var request = new XMLHttpRequest();
    request.open("GET",  ("sounds/impulseResponses/" + drumsName + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (drumsConvolver) {drumsConvolver.disconnect(); }
            drumsConvolver = context.createConvolver();
            drumsConvolver.buffer = buffer;
            drumsConvolver.normalize = true;
            drumsFilter.connect(drumsConvolver);
            drumsConvolver.connect(drumsGain);
        });
    };
    request.send();
}

// listener für den drums quality slider
var drumsQualitySlider = document.getElementById("drumsQualitySlider");
drumsQualitySlider.addEventListener("input", function (e) {
    drumsFilter.Q.value = (this.value);
    document.getElementById("drumsQualityOutput").innerHTML = (this.value) + " ";
});



//**********************
// bottle = Sequences
let seqSound = new Audio("sounds/Sequences.mp3");
let seqSource = context.createMediaElementSource(seqSound);
let seqGain = context.createGain();
var seqFilter = context.createBiquadFilter();
var seqConvolver = context.createConvolver();
seqFilter.type = 'allpass';
seqSource.connect(seqFilter);
seqFilter.connect(seqGain);
seqGain.connect(context.destination);

// listener für den seq slider
seqGainSlider = document.getElementById("bottle-gainSlider");
seqGainSlider.addEventListener("input", function (e) {
    let seqGainValue = (this.value / 10);
    document.getElementById("bottle-gainOutput").innerHTML = seqGainValue + " dB";
    seqGain.gain.value = seqGainValue;
});

// listener für den seq freq slider
var seqFrequencySlider = document.getElementById("seqFrequencySlider");
seqFrequencySlider.addEventListener("input", function (e) {
    seqFilter.frequency.value = (this.value);
    document.getElementById("seqFrequencyOutput").innerHTML = (this.value) + " Hz";
});

// seq Filter
var seqFilterSelectList = document.getElementById("seqFilterSelectList");
seqFilterSelectList.addEventListener("change", function(e){
    seqFilter.type = seqFilterSelectList.options[seqFilterSelectList.selectedIndex].value;
});

// seq Convolver
var seqConvolverSelectList = document.getElementById("bassConvolverSelectList");

//seqLoadImpulseResponse("cave");

seqConvolverSelectList.addEventListener("change", function(e){
    var seqName = seqConvolverSelectList.options[seqConvolverSelectList.selectedIndex].value;
    //var seqConvolverOn = false;
    if(seqName.includes("off")){
        seqFilter.disconnect(seqConvolver);
        seqConvolver.disconnect(seqGain);
        seqFilter.connect(seqsGain);
    }
    else{
        if(seqConvolverOn= false){
            seqFilter.disconnect(seqGain);
            seqFilter.connect(seqConvolver);
            seqConvolver.connect(seqGain);
        }
        
        seqLoadImpulseResponse(seqName);
    }
});

function seqLoadImpulseResponse(seqName){
    var request = new XMLHttpRequest();
    request.open("GET",  ("sounds/impulseResponses/" + seqName + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (seqConvolver) {seqsConvolver.disconnect(); }
            seqConvolver = context.createConvolver();
            seqConvolver.buffer = buffer;
            seqConvolver.normalize = true;
            seqFilter.connect(seqConvolver);
            seqConvolver.connect(seqGain);
        });
    };
    request.send();
}

// listener für den seq quality slider
var seqQualitySlider = document.getElementById("seqQualitySlider");
seqQualitySlider.addEventListener("input", function (e) {
    seqFilter.Q.value = (this.value);
    document.getElementById("seqQualityOutput").innerHTML = (this.value) + " ";
});

//**********************
// keyboard = Pads
let padsSound = new Audio("sounds/Pads.mp3");
let padsSource = context.createMediaElementSource(padsSound);
let padsGain = context.createGain();
var padsFilter = context.createBiquadFilter();
var padsConvolver = context.createConvolver();
padsFilter.type = 'allpass';
padsSource.connect(padsFilter);
padsFilter.connect(padsGain);
padsGain.connect(context.destination);

// listener für den pads slider
padsGainSlider = document.getElementById("keyboard-gainSlider");
padsGainSlider.addEventListener("input", function (e) {
    let padsGainValue = (this.value / 10);
    document.getElementById("keyboard-gainOutput").innerHTML = padsGainValue + " dB";
    padsGain.gain.value = padsGainValue;
});

// listener für den pads freq slider
var padsFrequencySlider = document.getElementById("padsFrequencySlider");
padsFrequencySlider.addEventListener("input", function (e) {
    padsFilter.frequency.value = (this.value);
    document.getElementById("padsFrequencyOutput").innerHTML = (this.value) + " Hz";
});

// padsFilter
var padsFilterSelectList = document.getElementById("padsFilterSelectList");
padsFilterSelectList.addEventListener("change", function(e){
    bpadsFilter.type = padsFilterSelectList.options[padsFilterSelectList.selectedIndex].value;
});

// pads Convolver
var padsConvolverSelectList = document.getElementById("padsConvolverSelectList");

//padsLoadImpulseResponse("cave");

padsConvolverSelectList.addEventListener("change", function(e){
    var padsName = padsConvolverSelectList.options[padsConvolverSelectList.selectedIndex].value;
    //var padsConvolverOn = false;
    if(padsName.includes("off")){
        padsFilter.disconnect(padsConvolver);
        padsConvolver.disconnect(padsGain);
        padsFilter.connect(padsGain);
    }
    else{
        if(padsConvolverOn= false){
            padsFilter.disconnect(padsGain);
            padsFilter.connect(padsConvolver);
            padsConvolver.connect(padsGain);
        }
        
        padsLoadImpulseResponse(padsName);
    }
});

function padsLoadImpulseResponse(padsName){
    var request = new XMLHttpRequest();
    request.open("GET",  ("sounds/impulseResponses/" + padsName + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (padsConvolver) {padsConvolver.disconnect(); }
            padsConvolver = context.createConvolver();
            padsConvolver.buffer = buffer;
            padsConvolver.normalize = true;
            padsFilter.connect(padsConvolver);
            padsConvolver.connect(padsGain);
        });
    };
    request.send();
}

// listener für den pads quality slider
var padsQualitySlider = document.getElementById("padsQualitySlider");
padsQualitySlider.addEventListener("input", function (e) {
    padsFilter.Q.value = (this.value);
    document.getElementById("padsQualityOutput").innerHTML = (this.value) + " ";
});

//**********************
// clock = Synth
let synthSound = new Audio("sounds/Synth.mp3");
let synthSource = context.createMediaElementSource(synthSound);
let synthGain = context.createGain();
var synthFilter = context.createBiquadFilter();
var synthConvolver = context.createConvolver();
synthFilter.type = 'allpass';
synthSource.connect(synthFilter);
synthFilter.connect(synthGain);
synthGain.connect(context.destination);

// listener für den synth slider
synthGainSlider = document.getElementById("clock-gainSlider");
synthGainSlider.addEventListener("input", function (e) {
    let synthGainValue = (this.value / 10);
    document.getElementById("clock-gainOutput").innerHTML = synthGainValue + " dB";
    synthGain.gain.value = synthGainValue;
});

// listener für den synth freq slider
var synthFrequencySlider = document.getElementById("synthFrequencySlider");
synthFrequencySlider.addEventListener("input", function (e) {
    synthFilter.frequency.value = (this.value);
    document.getElementById("synthFrequencyOutput").innerHTML = (this.value) + " Hz";
});

// synth Filter
var synthFilterSelectList = document.getElementById("synthFilterSelectList");
synthFilterSelectList.addEventListener("change", function(e){
    synthFilter.type = synthFilterSelectList.options[synthFilterSelectList.selectedIndex].value;
});

// synth Convolver
var synthConvolverSelectList = document.getElementById("synthConvolverSelectList");

//synthLoadImpulseResponse("cave");

synthConvolverSelectList.addEventListener("change", function(e){
    var synthName = synthConvolverSelectList.options[synthConvolverSelectList.selectedIndex].value;
    //var synthConvolverOn = false;
    if(synthName.includes("off")){
        synthFilter.disconnect(synthConvolver);
        synthConvolver.disconnect(synthGain);
        synthFilter.connect(synthGain);
    }
    else{
        if(synthConvolverOn= false){
            synthFilter.disconnect(synthGain);
            synthFilter.connect(synthConvolver);
            synthConvolver.connect(synthGain);
        }
        
        synthLoadImpulseResponse(synthName);
    }
});

function synthLoadImpulseResponse(synthName){
    var request = new XMLHttpRequest();
    request.open("GET",  ("sounds/impulseResponses/" + synthName + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (synthConvolver) {synthConvolver.disconnect(); }
            synthConvolver = context.createConvolver();
            synthConvolver.buffer = buffer;
            synthConvolver.normalize = true;
            synthFilter.connect(synthConvolver);
            synthConvolver.connect(synthGain);
        });
    };
    request.send();
}

// listener für den synth quality slider
var synthQualitySlider = document.getElementById("synthQualitySlider");
synthQualitySlider.addEventListener("input", function (e) {
    synthFilter.Q.value = (this.value);
    document.getElementById("synthQualityOutput").innerHTML = (this.value) + " ";
});

//**********************
// mouse = Vocals
let vocalSound = new Audio("sounds/Vocals.mp3");
let vocalSource = context.createMediaElementSource(vocalSound);
let vocalGain = context.createGain();
var vocalFilter = context.createBiquadFilter();
var vocalConvolver = context.createConvolver();
vocalFilter.type = 'allpass';
vocalSource.connect(vocalFilter);
vocalFilter.connect(vocalGain);
vocalGain.connect(context.destination);

// listener für den vocal slider
vocalGainSlider = document.getElementById("mouse-gainSlider");
vocalGainSlider.addEventListener("input", function (e) {
    let vocalGainValue = (this.value / 10);
    document.getElementById("mouse-gainOutput").innerHTML = vocalGainValue + " dB";
    vocalGain.gain.value = vocalGainValue;
});

// listener für den vocal freq slider
var vocalFrequencySlider = document.getElementById("vocalFrequencySlider");
vocalFrequencySlider.addEventListener("input", function (e) {
    vocalFilter.frequency.value = (this.value);
    document.getElementById("vocalFrequencyOutput").innerHTML = (this.value) + " Hz";
});

// vocal Filter
var vocalFilterSelectList = document.getElementById("vocalFilterSelectList");
vocalFilterSelectList.addEventListener("change", function(e){
    vocalFilter.type = vocalFilterSelectList.options[vocalFilterSelectList.selectedIndex].value;
});

// vocal Convolver
var vocalConvolverSelectList = document.getElementById("vocalConvolverSelectList");

//vocalLoadImpulseResponse("cave");

vocalConvolverSelectList.addEventListener("change", function(e){
    var vocalName = vocalConvolverSelectList.options[vocalConvolverSelectList.selectedIndex].value;
    //var vocalConvolverOn = false;
    if(vocalName.includes("off")){
        vocalFilter.disconnect(vocalConvolver);
        vocalConvolver.disconnect(vocalGain);
        vocalFilter.connect(vocalsGain);
    }
    else{
        if(vocalConvolverOn= false){
            vocalFilter.disconnect(vocalGain);
            vocalFilter.connect(vocalConvolver);
            vocalConvolver.connect(vocalGain);
        }
        
        vocalLoadImpulseResponse(vocalName);
    }
});

function vocalLoadImpulseResponse(vocalName){
    var request = new XMLHttpRequest();
    request.open("GET",  ("sounds/impulseResponses/" + vocalName + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (vocalConvolver) {vocalConvolver.disconnect(); }
            vocalConvolver = context.createConvolver();
            vocalConvolver.buffer = buffer;
            vocalConvolver.normalize = true;
            vocalFilter.connect(vocalConvolver);
            vocalConvolver.connect(vocalGain);
        });
    };
    request.send();
}

// listener für den vocal quality slider
var vocalQualitySlider = document.getElementById("vocalQualitySlider");
vocalQualitySlider.addEventListener("input", function (e) {
    vocalFilter.Q.value = (this.value);
    document.getElementById("vocalQualityOutput").innerHTML = (this.value) + " ";
});


//**********************
//Event Listener für den globalen Play und Stop-Button
// playStopButton.addEventListener("click", function (e) {
//     if (isPlaying) {
//         bassSound.pause();
//         drumsSound.pause();
//         seqSound.pause();
//         padsSound.pause();
//         synthSound.pause();
//         vocalSound.pause();
//         playStopButton.innerHTML = "Play Tracks";
//     } else {
//         bassSound.play();
//         bassGain.gain.value = 0;
//         drumsSound.play();
//         drumsGain.gain.value = 0;
//         seqSound.play();
//         seqGain.gain.value = 0;
//         padsSound.play();
//         padsGain.gain.value = 0;
//         synthSound.play();
//         synthGain.gain.value = 0;
//         vocalSound.play();
//         vocalGain.gain.value = 0;
//         playStopButton.innerHTML = "Stop Tracks";
//     }
//     isPlaying = !isPlaying;
// });


let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");

let firstTime = true;

playButton.addEventListener("click", function (e) {

    if (!isPlaying) {
        if(firstTime) {
            bassGain.gain.value = 0; // only first time!!!
            drumsGain.gain.value = 0;
            seqGain.gain.value = 0;
            padsGain.gain.value = 0;
            synthGain.gain.value = 0;
            vocalGain.gain.value = 0;
            firstTime = false;
        }

        bassSound.play();
        drumsSound.play();
        seqSound.play();
        padsSound.play();
        synthSound.play();
        vocalSound.play();

        this.classList.remove('btn-secondary');
        this.classList.add('btn-info');

        pauseButton.classList.remove('btn-info');
        pauseButton.classList.add('btn-secondary');
    }
    isPlaying = true;
});
pauseButton.addEventListener("click", function (e) {

    if (isPlaying) {
        bassSound.pause();
        drumsSound.pause();
        seqSound.pause();
        padsSound.pause();
        synthSound.pause();
        vocalSound.pause();

        this.classList.remove('btn-secondary');
        this.classList.add('btn-info');

        playButton.classList.remove('btn-info');
        playButton.classList.add('btn-secondary');
    }
    isPlaying = false;
});


// let stopButton = document.getElementById("stopButton");
//
// stopButton.addEventListener("click", function (e) {
//
//     console.log("clicked stop");
//
//
//     bassSound.stop();
//         drumsSound.stop();
//         seqSound.stop();
//         padsSound.stop();
//         synthSound.stop();
//         vocalSound.stop();
//
//         this.classList.remove('btn-secondary');
//         this.classList.add('btn-info');
//
// });
