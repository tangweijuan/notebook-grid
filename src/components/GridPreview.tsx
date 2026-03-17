import { useEffect, useRef, useState } from 'react';
import { GridConfig } from '../App';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface GridPreviewProps {
  config: GridConfig;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const paperDimensions: Record<string, { width: number; height: number }> = {
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  A6: { width: 105, height: 148 },
  A7: { width: 74, height: 105 },
};

export function GridPreview({ config, canvasRef }: GridPreviewProps) {
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate scale relative to A4
  const paperSizeScales: Record<string, number> = {
    A4: 1.0,
    A5: 148 / 210,  // ~0.705
    A6: 105 / 210,  // 0.5
    A7: 74 / 210,   // ~0.352
  };

  const baseScale = paperSizeScales[config.paperSize] || 1.0;
  const effectiveZoom = zoom * baseScale;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dimensions = paperDimensions[config.paperSize];
    const dpr = window.devicePixelRatio || 1;
    
    // Use a fixed pixels-per-mm ratio for consistent line widths across all paper sizes
    const pixelsPerMm = 4 * dpr; // Consistent scale for all paper sizes

    // Set canvas size based on paper dimensions in mm
    canvas.width = dimensions.width * pixelsPerMm;
    canvas.height = dimensions.height * pixelsPerMm;

    // Disable image smoothing for crisp lines
    ctx.imageSmoothingEnabled = false;

    // Clear canvas with paper color
    ctx.fillStyle = config.paperColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set grid style - fixed 1px line width for crisp rendering
    ctx.strokeStyle = config.gridColor;
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    const gridSizeScaled = config.gridSize * pixelsPerMm;

    switch (config.gridType) {
      case 'square':
        // Draw vertical lines - calculate each position independently to avoid cumulative errors
        const numVerticalLines = Math.floor(dimensions.width / config.gridSize) + 1;
        for (let i = 0; i < numVerticalLines; i++) {
          const x = Math.round(i * gridSizeScaled) + 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        // Draw horizontal lines - calculate each position independently to avoid cumulative errors
        const numHorizontalLines = Math.floor(dimensions.height / config.gridSize) + 1;
        for (let i = 0; i < numHorizontalLines; i++) {
          const y = Math.round(i * gridSizeScaled) + 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        break;

      case 'dot':
        // Draw dots at intersections - larger radius for better visibility
        const dotRadius = 1 * dpr;
        ctx.fillStyle = config.gridColor;
        const numDotsX = Math.floor(dimensions.width / config.gridSize) + 1;
        const numDotsY = Math.floor(dimensions.height / config.gridSize) + 1;
        for (let i = 0; i < numDotsX; i++) {
          for (let j = 0; j < numDotsY; j++) {
            const x = Math.round(i * gridSizeScaled);
            const y = Math.round(j * gridSizeScaled);
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;

      case 'horizontal':
        // Draw horizontal lines only
        const numHLines = Math.floor(dimensions.height / config.gridSize) + 1;
        for (let i = 0; i < numHLines; i++) {
          const y = Math.round(i * gridSizeScaled) + 0.5;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        break;

      case 'vertical':
        // Draw vertical lines only
        const numVLines = Math.floor(dimensions.width / config.gridSize) + 1;
        for (let i = 0; i < numVLines; i++) {
          const x = Math.round(i * gridSizeScaled) + 0.5;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        break;
    }
  }, [config, canvasRef]);

  const dimensions = paperDimensions[config.paperSize];
  const aspectRatio = dimensions.height / dimensions.width;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(200, prev + 10));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(25, prev - 10));
  };

  const handleReset = () => {
    setZoom(100);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 relative">
      {/* Preview Area */}
      <div ref={containerRef} className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-center min-h-full">
          <div 
            className="bg-white shadow-lg transition-transform" 
            style={{ 
              maxWidth: 'min(90%, 600px)',
              maxHeight: 'calc(100vh - 160px)',
              width: 'fit-content',
              height: 'fit-content',
              transform: `scale(${effectiveZoom / 100})`,
              transformOrigin: 'center center',
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full block"
              style={{
                aspectRatio: `${dimensions.width} / ${dimensions.height}`,
                maxWidth: '600px',
                maxHeight: 'calc(100vh - 160px)',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>

      {/* Zoom Controls - Fixed Bottom Right */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          style={{ width: '36px', height: '36px' }}
          onClick={handleZoomIn}
          disabled={zoom >= 200}
          title="放大 (Ctrl/Cmd +)"
        >
          <ZoomIn className="size-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          style={{ width: '36px', height: '36px' }}
          onClick={handleZoomOut}
          disabled={zoom <= 25}
          title="缩小 (Ctrl/Cmd -)"
        >
          <ZoomOut className="size-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          style={{ width: '36px', height: '36px' }}
          onClick={handleReset}
          title="重置 100%"
        >
          <RotateCcw className="size-5" />
        </Button>
      </div>
    </div>
  );
}