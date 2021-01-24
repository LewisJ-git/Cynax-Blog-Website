const canvas = document.getElementById('visualizer'),
      context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioElement = document.getElementById("myAudio");
let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;
let source = audioCtx.createMediaElementSource(audioElement);
source.connect(analyser);
//this connects our music back to the default output, such as your //speakers 
source.connect(audioCtx.destination);
let data = new Uint8Array(analyser.frequencyBinCount);


const wave = {
    y: canvas.height-1,
    wavelength: 0.01,
    amp: 100,
    freq: 0.20
}

const strokeHSL = {
    h: 191,
    s: 79,
    l: 63
}

const strokeColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.9
}

// let inc = wave.freq;
// let dec = wave.freq;

function animate() {
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(data);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(0, canvas.height/2);
    context.lineWidth = 3;
    for (let i = 0, j = canvas.width; i < canvas.width, j >= 0; i++, j--) {
        if (i <= canvas.width/2) {
            // context.lineTo(i, wave.y + Math.sin(i * wave.wavelength) * data[i]);
            context.lineTo(i, wave.y + (-1.5*data[i]));
        }
        else {
            context.lineTo(i, wave.y + (-1.5*data[j]));
        }
    }

    // context.strokeStyle = 'hsl('+strokeHSL.h+' ,'+strokeHSL.s+'%, '+strokeHSL.l+'%)';
    context.strokeStyle = 'rgba('+strokeColor.r+' ,'+strokeColor.g+', '+strokeColor.b+', '+strokeColor.a+')';
    context.stroke();

    // inc += wave.freq;
    // dec -= wave.freq;
}

audioElement.onplay = ()=>{ 
    audioCtx.resume();
}

animate();

