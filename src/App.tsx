import React from 'react';
import './App.css';
import MelodyGenerator from './components/MelodyGenerator';

function App() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="credits text-slate-400 mb-8 text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            Random Riffs Studio
          </h1>
          <p className="text-sm opacity-75">
            Project by{' '}
            <span className="text-purple-400">KARAN BISHT</span>,{' '}
            <span className="text-blue-400">MAYANK BISHT</span>,{' '}
            <span className="text-indigo-400">AKASH KUMAR</span>
          </p>
        </div>
        <MelodyGenerator />
      </div>
    </div>
  );
}

export default App;
