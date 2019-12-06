//**********************
//Objekt für den wavesufer
//https://wavesurfer-js.org/


bassWavesurfer = WaveSurfer.create({
    container: '#bassWaveform',
    waveColor: '#18a2b8',
    progressColor: '#184D63',
    interact: false
});

drumWavesurfer = WaveSurfer.create({
    container: '#drumsWaveform',
    waveColor: '#18a2b8',
    progressColor: '#184D63',
    interact: false
});

seqWavesurfer = WaveSurfer.create({
    container: '#seqWaveform',
    waveColor: '#18a2b8',
    progressColor: '#184D63',
    interact: false
});

padsWavesurfer = WaveSurfer.create({
    container: '#padsWaveform',
    waveColor: '#18a2b8',
    progressColor: '#184D63',
    interact: false
});

synthWavesurfer = WaveSurfer.create({
    container: '#synthWaveform',
    waveColor: '#18a2b8',
    progressColor: '#184D63',
    interact: false
});

vocalWavesurfer = WaveSurfer.create({
    container: '#vocalWaveform',
    waveColor: '#18a2b8',
    progressColor: '#184D63',
    interact: false
});


bassWavesurfer.load('sounds/Bass.mp3');
drumWavesurfer.load('sounds/Drums.mp3');
seqWavesurfer.load('sounds/Sequences.mp3');
padsWavesurfer.load('sounds/Pads.mp3');
synthWavesurfer.load('sounds/Synth.mp3');
vocalWavesurfer.load('sounds/Vocals.mp3');


