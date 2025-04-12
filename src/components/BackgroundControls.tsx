import React from 'react';
import { useBanner } from '../context/BannerContext';

export const BackgroundControls: React.FC = () => {
  const { backgroundType, setBannerData } = useBanner();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 w-24">Tipo de Fundo:</span>
        <select
          value={backgroundType}
          onChange={(e) => setBannerData({ backgroundType: e.target.value as 'gradient' | 'solid' })}
          className="flex-1 px-3 py-2 border rounded-md"
        >
          <option value="gradient">Gradiente</option>
          <option value="solid">Cor Única</option>
        </select>
      </div>
    </div>
  );
}; 