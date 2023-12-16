import Tuna from 'tunajs';
import {audioContext} from '../App'
const tuna = new Tuna(audioContext); // this is working

interface options {
  lowPassFrequency: any
  highPassFrequency: any
  highPassType: any
  lowPassType: any
}
export const defaultSettings: options = {
  lowPassFrequency: 350,
  highPassFrequency: 350,
  highPassType: 'highpass',
  lowPassType: 'lowpass',
}

export const robot = {
  lowPassType: 'lowpass',
  lowPassFrequency: 100,
  highPassType: 'highpass',
  highPassFrequency: 5500,
  gain: new tuna.Gain({ gain: 1000 }),
  compressor: new tuna.Compressor({
    threshold: -10,
    makeupGain: 5,
    attack: 5,
    release: 500,
    ratio: 9,
    knee: 36,
    automakeup: false,
    bypass: false
  }),
  chorus: new tuna.Chorus({
    rate: 6,
    feedback: 0.3,
    delay: 0.6,
    bypass: false,
  }),
};

export const wobbly = {
  lowPassType: 'lowpass',
  lowPassFrequency: 150,
  highPassType: 'highpass',
  highPassFrequency: 6000,
  wahwah: new tuna.WahWah({
    automode: true,
    baseFrequency: 0.2,
    excursionOctaves: 6,
    sweep: 0.35,
    resonance: 36,
    sensitivity: -0.3,
    bypass: false
  }),
  pingPongDelay: new tuna.PingPongDelay({
    wetLevel: 0.6,
    feedback: 0.7,
    delayTimeLeft: 60,
    delayTimeRight: 100,
  }),
  gain: new tuna.Gain({ gain: 450})
}

export const alien = {
  lowPassType: 'lowpass',
  lowPassFrequency: 50,
  highPassType: 'highpass',
  highPassFrequency: 7000,
  gain: new tuna.Gain({ gain: 150 }),
  compressor: new tuna.Compressor({
    threshold: -80,
    makeupGain: 20,
    attack: 1,
    release: 250,
    ratio: 4,
    knee: 5,
    automakeup: false,
    bypass: false
  }),
  phaser: new tuna.Phaser({
    rate: 23,
    depth: 0.4,
    feedback: 0.6,
    stereoPhase: 20,
    baseModulationFrequency: 1000,
    bypass: false
  }),
}