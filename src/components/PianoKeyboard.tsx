
import React from 'react';
import { playNote } from '@/utils/musicUtils';

interface PianoKeyboardProps {
  melody: Array<{note: string, frequency: number}>;
  currentNoteIndex: number;
  audioContext: AudioContext | null;
}

const PianoKeyboard = ({ melody, currentNoteIndex, audioContext }: PianoKeyboardProps) => {
  const whiteKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'];
  const blackKeys = ['C#4', 'D#4', 'F#4', 'G#4', 'A#4', 'C#5', 'D#5', 'F#5', 'G#5', 'A#5'];
  
  const noteFrequencies: Record<string, number> = {
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
    'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
    'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33
  };

  const getCurrentNote = () => {
    if (currentNoteIndex >= 0 && currentNoteIndex < melody.length) {
      return melody[currentNoteIndex].note;
    }
    return null;
  };

  const handleKeyClick = (note: string) => {
    if (audioContext) {
      const frequency = noteFrequencies[note];
      if (frequency) {
        playNote(audioContext, frequency, 0.3);
      }
    }
  };

  const isKeyActive = (note: string) => {
    const currentNote = getCurrentNote();
    return currentNote === note;
  };

  const getBlackKeyPosition = (note: string) => {
    const positions: Record<string, string> = {
      'C#4': 'left-[8.33%]', 'D#4': 'left-[16.67%]',
      'F#4': 'left-[33.33%]', 'G#4': 'left-[41.67%]', 'A#4': 'left-[50%]',
      'C#5': 'left-[66.67%]', 'D#5': 'left-[75%]',
      'F#5': 'left-[91.67%]', 'G#5': 'left-[100%]', 'A#5': 'left-[108.33%]'
    };
    return positions[note] || '';
  };

  return (
    <div className="relative bg-slate-900 p-6 rounded-lg">
      <div className="relative h-48 overflow-hidden">
        {/* White Keys */}
        <div className="flex h-full">
          {whiteKeys.map((note) => (
            <button
              key={note}
              onClick={() => handleKeyClick(note)}
              className={`flex-1 border-2 border-slate-600 transition-all duration-150 ${
                isKeyActive(note)
                  ? 'bg-gradient-to-b from-purple-400 to-blue-400 border-purple-300 shadow-lg transform scale-95'
                  : 'bg-white hover:bg-slate-100'
              }`}
              style={{ minWidth: '40px' }}
            >
              <div className="flex items-end justify-center h-full pb-4">
                <span className={`text-xs font-medium ${
                  isKeyActive(note) ? 'text-white' : 'text-slate-600'
                }`}>
                  {note}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Black Keys */}
        <div className="absolute top-0 left-0 w-full h-2/3">
          {blackKeys.map((note) => (
            <button
              key={note}
              onClick={() => handleKeyClick(note)}
              className={`absolute w-8 h-full border border-slate-800 transition-all duration-150 ${
                isKeyActive(note)
                  ? 'bg-gradient-to-b from-purple-600 to-blue-600 shadow-lg transform scale-105'
                  : 'bg-slate-800 hover:bg-slate-700'
              } ${getBlackKeyPosition(note)}`}
              style={{ transform: 'translateX(-50%)' }}
            >
              <div className="flex items-end justify-center h-full pb-2">
                <span className={`text-xs font-medium ${
                  isKeyActive(note) ? 'text-white' : 'text-slate-400'
                }`}>
                  {note.replace('#', '♯')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PianoKeyboard;
