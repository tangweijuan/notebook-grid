import { useState, useRef } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { GridPreview } from './components/GridPreview';

export type PaperSize = 'A4' | 'A5' | 'A6' | 'A7';
export type GridType = 'square' | 'dot' | 'horizontal' | 'vertical';

export interface GridConfig {
  paperSize: PaperSize;
  gridType: GridType;
  gridSize: number;
  gridColor: string;
  paperColor: string;
}

export default function App() {
  const [config, setConfig] = useState<GridConfig>({
    paperSize: 'A4',
    gridType: 'square',
    gridSize: 5,
    gridColor: '#d2d2d2',
    paperColor: '#ffffff',
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateConfig = (updates: Partial<GridConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const paperDimensions: Record<PaperSize, { width: number; height: number }> = {
    A4: { width: 210, height: 297 },
    A5: { width: 148, height: 210 },
    A6: { width: 105, height: 148 },
    A7: { width: 74, height: 105 },
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `grid-${config.paperSize}-${config.gridType}-${config.gridSize}mm.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const handleExportSVG = () => {
    const dimensions = paperDimensions[config.paperSize];
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${dimensions.width}mm`);
    svg.setAttribute('height', `${dimensions.height}mm`);
    svg.setAttribute('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Add background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', config.paperColor);
    svg.appendChild(background);

    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridGroup.setAttribute('stroke', config.gridColor);
    gridGroup.setAttribute('stroke-width', '0.25');
    gridGroup.setAttribute('fill', 'none');

    switch (config.gridType) {
      case 'square':
        // Vertical lines
        for (let x = 0; x <= dimensions.width; x += config.gridSize) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', x.toString());
          line.setAttribute('y1', '0');
          line.setAttribute('x2', x.toString());
          line.setAttribute('y2', dimensions.height.toString());
          gridGroup.appendChild(line);
        }
        // Horizontal lines
        for (let y = 0; y <= dimensions.height; y += config.gridSize) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', '0');
          line.setAttribute('y1', y.toString());
          line.setAttribute('x2', dimensions.width.toString());
          line.setAttribute('y2', y.toString());
          gridGroup.appendChild(line);
        }
        break;

      case 'dot':
        // Create a group for dots with fill instead of stroke
        gridGroup.setAttribute('fill', config.gridColor);
        gridGroup.setAttribute('stroke', 'none');
        for (let x = 0; x <= dimensions.width; x += config.gridSize) {
          for (let y = 0; y <= dimensions.height; y += config.gridSize) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x.toString());
            circle.setAttribute('cy', y.toString());
            circle.setAttribute('r', '0.5');
            gridGroup.appendChild(circle);
          }
        }
        break;

      case 'horizontal':
        for (let y = 0; y <= dimensions.height; y += config.gridSize) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', '0');
          line.setAttribute('y1', y.toString());
          line.setAttribute('x2', dimensions.width.toString());
          line.setAttribute('y2', y.toString());
          gridGroup.appendChild(line);
        }
        break;

      case 'vertical':
        for (let x = 0; x <= dimensions.width; x += config.gridSize) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', x.toString());
          line.setAttribute('y1', '0');
          line.setAttribute('x2', x.toString());
          line.setAttribute('y2', dimensions.height.toString());
          gridGroup.appendChild(line);
        }
        break;
    }

    svg.appendChild(gridGroup);

    // Convert to string and download
    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `grid-${config.paperSize}-${config.gridType}-${config.gridSize}mm.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <ControlPanel 
        config={config} 
        updateConfig={updateConfig} 
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
      />
      <GridPreview config={config} canvasRef={canvasRef} />
    </div>
  );
}