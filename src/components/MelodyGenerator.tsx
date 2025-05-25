
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw } from 'lucide-react';
import PianoKeyboard from './PianoKeyboard';
import { generateMelody, createAudioContext, playNote } from '@/utils/musicUtils';

const MelodyGenerator = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState([120]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [melody, setMelody] = useState<Array<{note: string, frequency: number}>>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const noteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio context and generate first melody
    const initAudio = async () => {
      const ctx = createAudioContext();
      setAudioContext(ctx);
      generateNewMelody();
    };
    
    initAudio();
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (noteTimeoutRef.current) clearTimeout(noteTimeoutRef.current);
    };
  }, []);

  const generateNewMelody = () => {
    const newMelody = generateMelody();
    setMelody(newMelody);
    setCurrentNoteIndex(-1);
    console.log('Generated new melody:', newMelody);
  };

  const startPlayback = () => {
    if (!audioContext || melody.length === 0) return;

    setIsPlaying(true);
    setCurrentNoteIndex(0);
    
    const beatDuration = (60 / tempo[0]) * 1000; // Convert BPM to ms
    let noteIndex = 0;

    const playNextNote = () => {
      if (noteIndex < melody.length) {
        const note = melody[noteIndex];
        setCurrentNoteIndex(noteIndex);
        
        // Play the note
        playNote(audioContext, note.frequency, 0.5);
        
        // Reset note highlight after note duration
        noteTimeoutRef.current = setTimeout(() => {
          setCurrentNoteIndex(-1);
        }, beatDuration * 0.8);
        
        noteIndex++;
      } else {
        // Melody finished, restart
        noteIndex = 0;
      }
    };

    // Play first note immediately
    playNextNote();
    
    // Set up interval for subsequent notes
    intervalRef.current = setInterval(playNextNote, beatDuration);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentNoteIndex(-1);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (noteTimeoutRef.current) {
      clearTimeout(noteTimeoutRef.current);
      noteTimeoutRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 justify-center">
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 mr-2" />
              ) : (
                <Play className="w-6 h-6 mr-2" />
              )}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button
              onClick={() => {
                stopPlayback();
                generateNewMelody();
              }}
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3 rounded-full transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              New Melody
            </Button>
          </div>

          <div className="space-y-3">
            <label className="text-slate-300 text-sm font-medium block">
              Tempo: {tempo[0]} BPM
            </label>
            <Slider
              value={tempo}
              onValueChange={setTempo}
              max={180}
              min={60}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Piano Keyboard */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Piano</CardTitle>
        </CardHeader>
        <CardContent>
          <PianoKeyboard 
            melody={melody} 
            currentNoteIndex={currentNoteIndex}
            audioContext={audioContext}
          />
        </CardContent>
      </Card>

      {/* Melody Display */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Current Melody</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {melody.map((note, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  index === currentNoteIndex
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-110 shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {note.note}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MelodyGenerator;
