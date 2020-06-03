let audioCtx: AudioContext;
let gain: GainNode;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new(window.AudioContext)();

    gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);
    gain.gain.value = -0.99;
  }
}

getAudioContext();

const getOscillator = () => {
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(gain);
  oscillator.connect(audioCtx.destination);
  oscillator.type = 'square';

  return oscillator;
}

export const playTone = (frequency: number, duration: number = 10) => {
  const oscillator = getOscillator();
  if (oscillator) {
    oscillator.frequency.value = frequency;
    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
    }, duration);
  }
}

export const playTones = (frequencies: number[], duration: number = 20) => {
  if (!frequencies.length) {
    return;
  }

  playTone(frequencies[0], duration);
  setTimeout(() => {
    playTones(frequencies.slice(1));
  }, duration);
}
