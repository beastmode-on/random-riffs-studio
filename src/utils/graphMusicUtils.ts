import { Note } from './musicUtils';

interface NoteNode {
  note: string;
  frequency: number;
}

interface NoteEdge {
  from: string;
  to: string;
  weight: number;
}

class MusicGraph {
  private nodes: Map<string, NoteNode>;
  private edges: Map<string, NoteEdge[]>;
  
  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  addNode(note: string, frequency: number) {
    this.nodes.set(note, { note, frequency });
    if (!this.edges.has(note)) {
      this.edges.set(note, []);
    }
  }

  addEdge(from: string, to: string, weight: number) {
    const edges = this.edges.get(from) || [];
    edges.push({ from, to, weight });
    this.edges.set(from, edges);
  }

  getNextNote(currentNote: string): NoteNode | null {
    const edges = this.edges.get(currentNote);
    if (!edges || edges.length === 0) return null;

    // Use weights to determine next note
    const totalWeight = edges.reduce((sum, edge) => sum + edge.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const edge of edges) {
      random -= edge.weight;
      if (random <= 0) {
        return this.nodes.get(edge.to) || null;
      }
    }
    
    return this.nodes.get(edges[0].to) || null;
  }
}

// Musical note frequencies (A4 = 440Hz)
const noteFrequencies: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
  'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
};

// Musical intervals and their weights
const intervalWeights = {
  unison: 1,    // Same note
  second: 10,   // Step-wise motion (highest priority)
  third: 8,     // Common in melodies
  fourth: 6,    // Perfect fourth
  fifth: 7,     // Perfect fifth
  sixth: 4,     // Major/minor sixth
  seventh: 3,   // Major/minor seventh
  octave: 5     // Octave jump
};

// Calculate interval between two notes
function getInterval(note1: string, note2: string): number {
  const noteValues: Record<string, number> = {
    'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4,
    'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9,
    'A#': 10, 'B': 11
  };

  const [note1Name, note1Octave] = note1.split(/(\d+)/);
  const [note2Name, note2Octave] = note2.split(/(\d+)/);
  
  const note1Value = noteValues[note1Name];
  const note2Value = noteValues[note2Name];
  
  if (note1Value === undefined || note2Value === undefined) return 0;
  
  const octaveDiff = parseInt(note2Octave) - parseInt(note1Octave);
  const semitones = (note2Value - note1Value + 12) % 12 + octaveDiff * 12;
  
  return semitones;
}

// Get weight based on interval
function getWeightForInterval(semitones: number): number {
  switch (semitones) {
    case 0: return intervalWeights.unison;
    case 1:
    case 2: return intervalWeights.second;
    case 3:
    case 4: return intervalWeights.third;
    case 5: return intervalWeights.fourth;
    case 7: return intervalWeights.fifth;
    case 8:
    case 9: return intervalWeights.sixth;
    case 10:
    case 11: return intervalWeights.seventh;
    case 12: return intervalWeights.octave;
    default: return 1;
  }
}

// Create graph based on musical scale and rules
function createMusicGraph(scale: string[]): MusicGraph {
  const graph = new MusicGraph();
  
  // Add all notes as nodes
  scale.forEach(note => {
    graph.addNode(note, noteFrequencies[note]);
  });
  
  // Add edges with weights based on music theory rules
  scale.forEach((note1) => {
    scale.forEach((note2) => {
      if (note1 !== note2) {
        const interval = getInterval(note1, note2);
        const weight = getWeightForInterval(interval);
        
        // Add directional edge
        graph.addEdge(note1, note2, weight);
      }
    });
  });
  
  return graph;
}

// Musical scales
const scales = {
  pentatonic: ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'],
  major: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
  minor: ['C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5'],
  dorian: ['C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'A#4', 'C5']
};

export function generateGraphMelody(length: number = 8, selectedScale?: string): Note[] {
  // Select scale based on parameter or random
  const scaleNames = Object.keys(scales);
  const scale = selectedScale || scaleNames[Math.floor(Math.random() * scaleNames.length)];
  const scaleNotes = scales[scale as keyof typeof scales];
  
  // Create graph for selected scale
  const musicGraph = createMusicGraph(scaleNotes);
  
  // Generate melody using graph traversal
  const melody: Note[] = [];
  let currentNote = scaleNotes[Math.floor(scaleNotes.length / 2)]; // Start in middle
  
  for (let i = 0; i < length; i++) {
    const noteNode = i === 0 ? 
      { note: currentNote, frequency: noteFrequencies[currentNote] } : 
      musicGraph.getNextNote(currentNote);
    
    if (noteNode) {
      melody.push({ note: noteNode.note, frequency: noteNode.frequency });
      currentNote = noteNode.note;
    }
  }
  
  return melody;
}

export { noteFrequencies, scales }; 