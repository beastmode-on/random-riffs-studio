
// Music theory and audio utilities

export interface Note {
  note: string;
  frequency: number;
}

// Note frequencies (A4 = 440Hz)
const noteFrequencies: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
  'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
  'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
  'G#5': 830.61, 'A5': 880.00
};

// Musical scales for pleasant melodies
const scales = {
  pentatonic: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5'],
  major: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
  dorian: ['C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'A#4', 'C5'],
  minor: ['C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5']
};

export const createAudioContext = (): AudioContext => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  return new AudioContext();
};

export const playNote = (audioContext: AudioContext, frequency: number, duration: number = 0.5) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = 'triangle'; // Piano-like sound
  
  // ADSR envelope for more realistic piano sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01); // Attack
  gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.1); // Decay
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + duration - 0.1); // Sustain
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration); // Release
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const generateMelody = (length: number = 8): Note[] => {
  const scaleNames = Object.keys(scales);
  const randomScale = scaleNames[Math.floor(Math.random() * scaleNames.length)];
  const scaleNotes = scales[randomScale as keyof typeof scales];
  
  console.log(`Generating melody in ${randomScale} scale`);
  
  const melody: Note[] = [];
  let lastNoteIndex = Math.floor(scaleNotes.length / 2); // Start in middle
  
  for (let i = 0; i < length; i++) {
    // Generate melodic movement (prefer steps, allow some leaps)
    const movement = Math.random();
    let nextNoteIndex;
    
    if (movement < 0.4) {
      // Step up
      nextNoteIndex = Math.min(lastNoteIndex + 1, scaleNotes.length - 1);
    } else if (movement < 0.8) {
      // Step down
      nextNoteIndex = Math.max(lastNoteIndex - 1, 0);
    } else {
      // Small leap (2-3 steps)
      const leap = Math.random() > 0.5 ? 2 : -2;
      nextNoteIndex = Math.max(0, Math.min(scaleNotes.length - 1, lastNoteIndex + leap));
    }
    
    const note = scaleNotes[nextNoteIndex];
    const frequency = noteFrequencies[note];
    
    if (frequency) {
      melody.push({ note, frequency });
      lastNoteIndex = nextNoteIndex;
    }
  }
  
  return melody;
};

// Add some rhythmic variation
export const generateRhythm = (length: number = 8): number[] => {
  const rhythms = [
    [1, 1, 1, 1, 1, 1, 1, 1], // All quarter notes
    [2, 1, 1, 2, 1, 1], // Some half notes
    [1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1], // Some eighth notes
  ];
  
  return rhythms[Math.floor(Math.random() * rhythms.length)];
};
