"use client";

import React from 'react';
import { useBanner } from '../context/BannerContext';

export const ToolBar: React.FC = () => {
  const { 
    gradient, 
    textColor,
    fontFamily,
    setBannerData 
  } = useBanner();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="space-y-4">
        {/* Cor do Gradiente */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 w-24">Cor do Gradiente (Início):</span>
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
            <span className="text-sm text-gray-500 w-24">Cor do Gradiente (Fim):</span>
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

        {/* Cor do Texto */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 w-24">Cor do Texto:</span>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setBannerData({ textColor: e.target.value })}
            className="w-12 h-8 rounded cursor-pointer"
          />
        </div>

        {/* Fonte */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 w-24">Fonte:</span>
          <select
            value={fontFamily}
            onChange={(e) => setBannerData({ fontFamily: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-md"
          >
            <option value="sans">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Monospace</option>
          </select>
        </div>
      </div>
    </div>
  );
}; 