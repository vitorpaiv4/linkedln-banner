import React from 'react';
import { useBanner } from '../context/BannerContext';

export const BackgroundControls: React.FC = () => {
  const { backgroundType, gradient, backgroundColor, textColor, setBannerData } = useBanner();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-6">
        {/* Tipo de Fundo */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Tipo de Fundo:</span>
          <select
            value={backgroundType}
            onChange={(e) => setBannerData({ backgroundType: e.target.value as 'gradient' | 'solid' })}
            className="px-3 py-2 border rounded-md"
          >
            <option value="gradient">Gradiente</option>
            <option value="solid">Cor Única</option>
          </select>
        </div>

        {/* Controles de Cor */}
        {backgroundType === 'gradient' ? (
          <div className="flex items-center gap-4 border-l pl-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">De:</span>
              <input
                type="color"
                value={gradient.from}
                onChange={(e) => setBannerData({
                  gradient: { ...gradient, from: e.target.value }
                })}
                className="w-12 h-8 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Para:</span>
              <input
                type="color"
                value={gradient.to}
                onChange={(e) => setBannerData({
                  gradient: { ...gradient, to: e.target.value }
                })}
                className="w-12 h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 border-l pl-6">
            <span className="text-sm text-gray-500">Cor:</span>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBannerData({ backgroundColor: e.target.value })}
              className="w-12 h-8 rounded cursor-pointer"
            />
          </div>
        )}

        {/* Cor do Texto */}
        <div className="flex items-center gap-2 border-l pl-6">
          <span className="text-sm text-gray-500">Cor do Texto:</span>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setBannerData({ textColor: e.target.value })}
            className="w-12 h-8 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}; 