import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Node {
  x: number;
  y: number;
  note: string;
  radius: number;
  color: string;
  scale: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface GraphVisualizerProps {
  melody: Array<{note: string, frequency: number}>;
  currentNoteIndex: number;
  scale: string;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ melody, currentNoteIndex, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodesRef = useRef<Node[]>([]);
  
  // Calculate node positions in a circle
  const createNodes = (notes: string[]): Node[] => {
    const radius = 150;
    const centerX = 300;
    const centerY = 200;
    
    return notes.map((note, index) => {
      const angle = (index / notes.length) * 2 * Math.PI;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        note,
        radius: 20,
        color: melody.some(m => m.note === note) ? '#6366f1' : '#475569',
        scale: 1
      };
    });
  };

  // Handle mouse movement for interactivity
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if mouse is over any node
    const hoveredNodeObj = nodesRef.current.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < node.radius;
    });

    setHoveredNode(hoveredNodeObj?.note || null);
  };

  // Draw the graph
  const drawGraph = (ctx: CanvasRenderingContext2D, nodes: Node[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw edges with weights
    if (melody.length > 1) {
      for (let i = 0; i < melody.length - 1; i++) {
        const fromNode = nodes.find(n => n.note === melody[i].note);
        const toNode = nodes.find(n => n.note === melody[i + 1].note);
        
        if (fromNode && toNode) {
          // Draw edge
          ctx.beginPath();
          ctx.strokeStyle = '#4c1d95';
          ctx.lineWidth = 2;
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();

          // Draw direction arrow
          const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
          const arrowLength = 10;
          const arrowWidth = 8;
          
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          
          ctx.beginPath();
          ctx.moveTo(midX - arrowLength * Math.cos(angle - Math.PI / 6), 
                    midY - arrowLength * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(midX, midY);
          ctx.lineTo(midX - arrowLength * Math.cos(angle + Math.PI / 6),
                    midY - arrowLength * Math.sin(angle + Math.PI / 6));
          ctx.strokeStyle = '#6d28d9';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    // Draw nodes with animations
    nodes.forEach(node => {
      const isHovered = hoveredNode === node.note;
      const isCurrent = currentNoteIndex >= 0 && melody[currentNoteIndex]?.note === node.note;
      
      // Node glow effect
      if (isHovered || isCurrent) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
        ctx.arc(node.x, node.y, node.radius * 1.5, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Main node
      ctx.beginPath();
      ctx.fillStyle = isHovered ? '#818cf8' : node.color;
      ctx.arc(node.x, node.y, node.radius * (isHovered ? 1.1 : 1), 0, 2 * Math.PI);
      ctx.fill();

      // Node border
      if (isCurrent) {
        ctx.beginPath();
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.arc(node.x, node.y, node.radius + 5, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Note text
      ctx.fillStyle = '#ffffff';
      ctx.font = `${isHovered ? 'bold ' : ''}12px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.note, node.x, node.y);
    });

    // Draw scale name
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Scale: ${scale.charAt(0).toUpperCase() + scale.slice(1)}`, 10, 10);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get unique notes from melody
    const uniqueNotes = Array.from(new Set(melody.map(m => m.note)));
    const nodes = createNodes(uniqueNotes);
    nodesRef.current = nodes;
    
    // Animation frame
    let animationFrame: number;
    const animate = () => {
      drawGraph(ctx, nodes);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [melody, currentNoteIndex, hoveredNode, scale]);

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Melody Graph Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="border border-slate-700 rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredNode(null)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GraphVisualizer; 