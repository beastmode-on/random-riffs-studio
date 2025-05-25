import React from 'react';
import './App.css';
import MelodyGenerator from './components/MelodyGenerator';

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <div className="credits text-slate-400 mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            Random Riffs Studio
          </h1>
          <p className="text-sm sm:text-base opacity-75">
            Project by{' '}
            <span className="text-purple-400 whitespace-nowrap">KARAN BISHT</span>,{' '}
            <span className="text-blue-400 whitespace-nowrap">MAYANK BISHT</span>,{' '}
            <span className="text-indigo-400 whitespace-nowrap">AKASH KUMAR</span>
          </p>
        </div>
        <MelodyGenerator />
      </div>
    </div>
  );
}

export default App;
