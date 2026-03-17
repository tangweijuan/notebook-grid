import { Grid2X2, Grip, AlignJustify, Tally4, Image, FileCode } from 'lucide-react';
import { GridConfig, PaperSize, GridType } from '../App';

interface ControlPanelProps {
  config: GridConfig;
  updateConfig: (updates: Partial<GridConfig>) => void;
  onExportPNG: () => void;
  onExportSVG: () => void;
}

const paperSizes: { size: PaperSize; dimensions: string }[] = [
  { size: 'A4', dimensions: '210×297mm' },
  { size: 'A5', dimensions: '148×210mm' },
  { size: 'A6', dimensions: '105×148mm' },
  { size: 'A7', dimensions: '74×105mm' },
];

const gridTypes: { type: GridType; icon: React.ReactNode; label: string }[] = [
  { type: 'square', icon: <Grid2X2 size={20} />, label: '方形网格' },
  { type: 'dot', icon: <Grip size={20} />, label: '点阵网格' },
  { type: 'horizontal', icon: <AlignJustify size={20} />, label: '横线网格' },
  { type: 'vertical', icon: <Tally4 size={20} />, label: '竖线网格' },
];

const presetGridColors = [
  { color: '#d2d2d2', label: '浅灰' },
  { color: '#999999', label: '中灰' },
  { color: '#82A3AA', label: '青灰' },
  { color: '#c8d5e0', label: '浅蓝' },
  { color: '#d4c5b9', label: '米色' },
  { color: '#000000', label: '黑色' },
];

export function ControlPanel({ config, updateConfig, onExportPNG, onExportSVG }: ControlPanelProps) {
  return (
    <div className="w-80 bg-slate-50 border-r border-slate-200 p-4 overflow-y-auto shadow-sm">
      {/* App Title */}
      <div className="mb-6 flex items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <g clipPath="url(#clip0_35_22)">
            <rect width="64" height="64" rx="10" fill="url(#paint0_linear_35_22)"/>
            <g filter="url(#filter0_ddi_35_22)">
              <path d="M8 28C8 23.5817 11.5817 20 16 20H62V64H8V28Z" fill="url(#paint1_linear_35_22)"/>
            </g>
            <g filter="url(#filter1_ddi_35_22)">
              <path d="M13 22C13 17.5817 16.5817 14 21 14H67V64H13V22Z" fill="url(#paint2_linear_35_22)"/>
            </g>
            <g filter="url(#filter2_ddi_35_22)">
              <path d="M18 16C18 11.5817 21.5817 8 26 8H72V64H18V16Z" fill="url(#paint3_linear_35_22)" shapeRendering="crispEdges"/>
              <path d="M28 18H72" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M28 27H72" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M28 36H72" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M28 45H72" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M28 54H72" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M28 63H72" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M64 18V64" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M55 18V64" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M46 18V64" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M37 18V64" stroke="#82A3AA" strokeLinecap="round"/>
              <path d="M28 18V64" stroke="#82A3AA" strokeLinecap="round"/>
            </g>
          </g>
          <defs>
            <filter id="filter0_ddi_35_22" x="5" y="18" width="59" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_22"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_35_22" result="effect2_dropShadow_35_22"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_35_22" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="1" dy="1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_35_22"/>
            </filter>
            <filter id="filter1_ddi_35_22" x="10" y="12" width="59" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_22"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_35_22" result="effect2_dropShadow_35_22"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_35_22" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="1" dy="1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_35_22"/>
            </filter>
            <filter id="filter2_ddi_35_22" x="15" y="6" width="59.5" height="60.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_35_22"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_35_22" result="effect2_dropShadow_35_22"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_35_22" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="1" dy="1"/>
              <feGaussianBlur stdDeviation="0.5"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_35_22"/>
            </filter>
            <linearGradient id="paint0_linear_35_22" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#286876"/>
              <stop offset="0.237695" stopColor="#0B3A48"/>
            </linearGradient>
            <linearGradient id="paint1_linear_35_22" x1="35" y1="20" x2="35" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7F6F9"/>
              <stop offset="0.25738" stopColor="#DEDEDE"/>
            </linearGradient>
            <linearGradient id="paint2_linear_35_22" x1="40" y1="14" x2="40" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7F6F9"/>
              <stop offset="0.25738" stopColor="#DEDEDE"/>
            </linearGradient>
            <linearGradient id="paint3_linear_35_22" x1="45" y1="8" x2="45" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F7F6F9"/>
              <stop offset="0.25738" stopColor="#DEDEDE"/>
            </linearGradient>
            <clipPath id="clip0_35_22">
              <rect width="64" height="64" rx="10" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div>
          <h1 className="text-gray-900 mb-0.5">Notebook Grid</h1>
          <p className="text-sm text-gray-500">在线网格纸生成器</p>
        </div>
      </div>

      {/* Paper Size */}
      <div className="mb-5">
        <label className="block text-gray-700 mb-2">纸张尺寸</label>
        <div className="grid grid-cols-2 gap-2">
          {paperSizes.map(({ size, dimensions }) => (
            <button
              key={size}
              onClick={() => updateConfig({ paperSize: size })}
              className={`p-2.5 rounded-lg border transition-all shadow-sm ${
                config.paperSize === size
                  ? 'border-teal-600 bg-teal-50 text-teal-800 shadow-md'
                  : 'border-slate-200 bg-white text-gray-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="text-center">
                <div className="font-medium">{size}</div>
                <div className="text-xs opacity-70">{dimensions}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Type */}
      <div className="mb-5">
        <label className="block text-gray-700 mb-2">网格类型</label>
        <div className="grid grid-cols-2 gap-2">
          {gridTypes.map(({ type, icon, label }) => (
            <button
              key={type}
              onClick={() => updateConfig({ gridType: type })}
              className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-1.5 shadow-sm ${
                config.gridType === type
                  ? 'border-teal-600 bg-teal-50 text-teal-800 shadow-md'
                  : 'border-slate-200 bg-white text-gray-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {icon}
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Size */}
      <div className="mb-5">
        <label className="block text-gray-700 mb-2">
          网格尺寸
          <span className="float-right text-teal-700 font-medium">{config.gridSize}mm</span>
        </label>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={config.gridSize}
          onChange={(e) => updateConfig({ gridSize: Number(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1mm</span>
          <span>30mm</span>
        </div>
      </div>

      {/* Grid Color */}
      <div className="mb-5">
        <label className="block text-gray-700 mb-2">网格颜色</label>
        <div className="flex gap-2 items-center mb-2">
          <input
            type="color"
            value={config.gridColor}
            onChange={(e) => updateConfig({ gridColor: e.target.value })}
            className="h-10 w-16 rounded-lg cursor-pointer border border-slate-200 shadow-sm text-[rgb(10,10,10)]"
          />
          <input
            type="text"
            value={config.gridColor}
            onChange={(e) => updateConfig({ gridColor: e.target.value })}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 shadow-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {presetGridColors.map(({ color, label }) => (
            <button
              key={color}
              onClick={() => updateConfig({ gridColor: color })}
              className={`w-8 h-8 rounded border transition-all shadow-sm ${
                config.gridColor.toLowerCase() === color.toLowerCase()
                  ? 'border-teal-600 ring-2 ring-teal-200'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              style={{ backgroundColor: color }}
              title={label}
            />
          ))}
        </div>
      </div>

      {/* Paper Color */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">纸张颜色</label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={config.paperColor}
            onChange={(e) => updateConfig({ paperColor: e.target.value })}
            className="h-10 w-16 rounded-lg cursor-pointer border border-slate-200 shadow-sm"
          />
          <input
            type="text"
            value={config.paperColor}
            onChange={(e) => updateConfig({ paperColor: e.target.value })}
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 shadow-sm"
          />
        </div>
      </div>

      {/* Export PNG Button */}
      <div className="mb-2.5">
        <button
          onClick={onExportPNG}
          className="w-full p-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <Image size={18} className="mr-2" />
          导出PNG
        </button>
      </div>

      {/* Export SVG Button */}
      <div className="mb-2">
        <button
          onClick={onExportSVG}
          className="w-full p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center shadow-md hover:shadow-lg"
        >
          <FileCode size={18} className="mr-2" />
          导出SVG
        </button>
      </div>
    </div>
  );
}