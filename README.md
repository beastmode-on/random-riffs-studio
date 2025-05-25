
# Melody Generator 🎵

A beautiful web application that generates random, musically pleasing melodies using advanced music theory and Web Audio API synthesis. Each melody is unique and follows proper musical scales to ensure pleasant listening.

![Melody Generator Demo](https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=600&q=80)

## ✨ Features

- **Random Melody Generation**: Creates unique melodies using pentatonic, major, minor, and dorian scales
- **High-Quality Audio**: Real-time audio synthesis using Web Audio API with piano-like sounds
- **Interactive Piano Keyboard**: Visual feedback showing which notes are being played
- **Tempo Control**: Adjustable playback speed from 60-180 BPM
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Visualization**: See the melody notes as they play

## 🚀 Technologies Used

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Web Audio API** - Real-time audio synthesis
- **Vite** - Fast build tool and development server

## 📋 Requirements

To run this application locally, you need:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- A modern web browser with Web Audio API support (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd melody-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:8080` to view the application.

## 🎮 How to Use

1. **Generate a Melody**: Click "New Melody" to create a random musical sequence
2. **Play/Pause**: Use the play button to start or pause the melody playback
3. **Adjust Tempo**: Use the slider to change the playback speed (60-180 BPM)
4. **Interactive Piano**: Click on piano keys to play individual notes
5. **Visual Feedback**: Watch the piano keys light up as the melody plays

## 🎼 Music Theory

The app uses several musical concepts to generate pleasant melodies:

- **Pentatonic Scale**: 5-note scales that sound good in any combination
- **Major Scale**: Traditional happy-sounding Western scale
- **Minor Scale**: More melancholy and emotional
- **Dorian Mode**: Jazz-influenced scale with a unique character

The melody generator uses intelligent voice leading, preferring stepwise motion with occasional leaps to create natural-sounding musical phrases.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MelodyGenerator.tsx    # Main component with playback controls
│   ├── PianoKeyboard.tsx      # Visual piano keyboard
│   └── ui/                    # shadcn/ui components
├── utils/
│   └── musicUtils.ts          # Music theory and audio synthesis
├── pages/
│   └── Index.tsx              # Main application page
└── hooks/                     # Custom React hooks
```

## 🎵 Audio Implementation

The application uses the Web Audio API to create realistic piano sounds:

- **Oscillator Type**: Triangle wave for warm, piano-like tone
- **ADSR Envelope**: Attack, Decay, Sustain, Release for natural sound dynamics
- **Real-time Synthesis**: All audio generated in the browser, no external files needed

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful color transitions using Tailwind CSS
- **Smooth Animations**: CSS transitions for button interactions and note highlights
- **Dark Theme**: Easy on the eyes with purple and blue accent colors
- **Responsive Layout**: Adapts to all screen sizes automatically

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not supported)

## 🚀 Deployment

The app can be deployed to any static hosting service:

1. **Build the project**
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting provider:
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Multiple instrument sounds (guitar, violin, flute)
- [ ] Harmony generation (chords and bass lines)
- [ ] Export melodies as MIDI files
- [ ] Save and load favorite melodies
- [ ] Different time signatures
- [ ] Drum accompaniment
- [ ] Social sharing features

---

**Enjoy creating beautiful melodies!** 🎼✨
