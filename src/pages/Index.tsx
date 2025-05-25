import MelodyGenerator from "@/components/MelodyGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Graph-Based Melody Generator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Generate beautiful, random melodies using graph theory and music theory principles. 
            Our algorithm uses weighted graphs to create natural-sounding musical progressions.
          </p>
        </div>
        <MelodyGenerator />
      </div>
    </div>
  );
};

export default Index;
