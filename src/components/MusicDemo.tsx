import React, { useState } from 'react';
import { generateGraphMelody, scales } from '../utils/graphMusicUtils';
import { Note } from '../utils/musicUtils';

const MusicDemo: React.FC = () => {
  const [melody, setMelody] = useState<Note[]>([]);
  const [selectedScale, setSelectedScale] = useState<string>('major');
  const [melodyLength, setMelodyLength] = useState<number>(8);

  const generateNewMelody = () => {
    const newMelody = generateGraphMelody(melodyLength, selectedScale);
    setMelody(newMelody);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Random Riffs Studio Demo</h1>
      
      <div className="mb-4">
        <label className="block mb-2">
          Select Scale:
          <select 
            value={selectedScale}
            onChange={(e) => setSelectedScale(e.target.value)}
            className="ml-2 p-1 border rounded"
          >
            {Object.keys(scales).map(scale => (
              <option key={scale} value={scale}>{scale}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Melody Length:
          <input
            type="number"
            value={melodyLength}
            onChange={(e) => setMelodyLength(parseInt(e.target.value))}
            min="1"
            max="16"
            className="ml-2 p-1 border rounded w-20"
          />
        </label>
      </div>

      <button
        onClick={generateNewMelody}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Melody
      </button>

      {melody.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Melody:</h2>
          <div className="grid grid-cols-4 gap-2">
            {melody.map((note, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded text-center">
                <div className="font-mono">{note.note}</div>
                <div className="text-sm text-gray-600">{note.frequency.toFixed(2)} Hz</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicDemo; 