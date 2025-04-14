"use client";

import React from 'react';
import { useBanner } from '../context/BannerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBold, 
  faItalic, 
  faUnderline,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faPlus,
  faMinus
} from '@fortawesome/free-solid-svg-icons';

export const ToolBar: React.FC = () => {
  const { 
    gradient, 
    textColor,
    fontFamily,
    setBannerData,
    textFields,
    selectedField,
    backgroundType,
    backgroundColor
  } = useBanner();

  const handleFormatUpdate = (updates: Partial<{ 
    bold: boolean; 
    italic: boolean; 
    underline: boolean; 
    align: 'left' | 'center' | 'right';
    fontSize?: number;
  }>) => {
    if (!selectedField) return;

    setBannerData({
      textFields: textFields.map(f => 
        f.id === selectedField
          ? { ...f, ...updates }
          : f
      )
    });
  };

  const getFieldStyle = () => {
    if (!selectedField) return {
      bold: false,
      italic: false,
      underline: false,
      align: 'center' as const,
      fontSize: 16
    };

    const field = textFields.find(f => f.id === selectedField);
    return {
      bold: field?.bold || false,
      italic: field?.italic || false,
      underline: field?.underline || false,
      align: field?.align || 'center',
      fontSize: field?.fontSize || (
        selectedField === 'name' ? 24 :
        selectedField === 'role' ? 18 : 16
      )
    };
  };

  const style = getFieldStyle();
  const isTextField = selectedField && (selectedField === 'name' || selectedField === 'role' || selectedField === 'email' || selectedField === 'github');

  const handleFontSizeChange = (newSize: number) => {
    handleFormatUpdate({ fontSize: Math.max(8, Math.min(72, newSize)) });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Tipo de Fundo */}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 w-32">Tipo de Fundo:</span>
          <select
            value={backgroundType}
            onChange={(e) => setBannerData({ backgroundType: e.target.value as 'gradient' | 'solid' })}
            className="flex-1 px-3 py-2 border rounded-md"
          >
            <option value="gradient">Gradiente</option>
            <option value="solid">Cor Única</option>
          </select>
        </div>

        {/* Cores do Fundo */}
        {backgroundType === 'gradient' ? (
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 w-32">Gradiente (Início):</span>
              <input
                type="color"
                value={gradient.from}
                onChange={(e) => setBannerData({
                  gradient: { ...gradient, from: e.target.value }
                })}
                className="w-12 h-8 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 w-32">Gradiente (Fim):</span>
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
          <div className="flex items-center">
            <span className="text-sm text-gray-500 w-32">Cor de Fundo:</span>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBannerData({ backgroundColor: e.target.value })}
              className="w-12 h-8 rounded cursor-pointer"
            />
          </div>
        )}

        {/* Cor do Texto */}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 w-32">Cor do Texto:</span>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setBannerData({ textColor: e.target.value })}
            className="w-12 h-8 rounded cursor-pointer"
          />
        </div>

        {/* Fonte */}
        <div className="flex items-center">
          <span className="text-sm text-gray-500 w-32">Fonte:</span>
          <select
            value={fontFamily}
            onChange={(e) => setBannerData({ fontFamily: e.target.value })}
            className="flex-1 px-3 py-2 border rounded-md"
          >
            <optgroup label="Sans-serif">
              <option value="arial">Arial</option>
              <option value="helvetica">Helvetica</option>
              <option value="verdana">Verdana</option>
              <option value="roboto">Roboto</option>
              <option value="opensans">Open Sans</option>
            </optgroup>
            <optgroup label="Serif">
              <option value="times">Times New Roman</option>
              <option value="georgia">Georgia</option>
              <option value="garamond">Garamond</option>
              <option value="merriweather">Merriweather</option>
            </optgroup>
            <optgroup label="Display">
              <option value="montserrat">Montserrat</option>
              <option value="poppins">Poppins</option>
              <option value="raleway">Raleway</option>
              <option value="ubuntu">Ubuntu</option>
            </optgroup>
            <optgroup label="Monospace">
              <option value="consolas">Consolas</option>
              <option value="monaco">Monaco</option>
              <option value="firacode">Fira Code</option>
            </optgroup>
          </select>
        </div>

        {/* Controles de formatação */}
        <div className={`flex items-center transition-opacity ${isTextField ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <span className="text-sm text-gray-500 w-32">Formatação:</span>
          <div className="flex gap-4">
            {/* Controle de tamanho da fonte */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                className="p-2 rounded hover:bg-gray-200"
                onClick={() => handleFontSizeChange(style.fontSize - 1)}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type="number"
                value={style.fontSize}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                className="w-14 px-2 py-1 text-center border rounded"
                min="8"
                max="72"
                disabled={!isTextField}
              />
              <button
                className="p-2 rounded hover:bg-gray-200"
                onClick={() => handleFontSizeChange(style.fontSize + 1)}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                className={`p-2 rounded hover:bg-gray-200 ${style.bold ? 'bg-blue-100' : ''}`}
                onClick={() => handleFormatUpdate({ bold: !style.bold })}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faBold} />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-200 ${style.italic ? 'bg-blue-100' : ''}`}
                onClick={() => handleFormatUpdate({ italic: !style.italic })}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faItalic} />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-200 ${style.underline ? 'bg-blue-100' : ''}`}
                onClick={() => handleFormatUpdate({ underline: !style.underline })}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faUnderline} />
              </button>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                className={`p-2 rounded hover:bg-gray-200 ${style.align === 'left' ? 'bg-blue-100' : ''}`}
                onClick={() => handleFormatUpdate({ align: 'left' })}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faAlignLeft} />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-200 ${style.align === 'center' ? 'bg-blue-100' : ''}`}
                onClick={() => handleFormatUpdate({ align: 'center' })}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faAlignCenter} />
              </button>
              <button
                className={`p-2 rounded hover:bg-gray-200 ${style.align === 'right' ? 'bg-blue-100' : ''}`}
                onClick={() => handleFormatUpdate({ align: 'right' })}
                disabled={!isTextField}
              >
                <FontAwesomeIcon icon={faAlignRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 