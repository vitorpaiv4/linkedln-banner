"use client";

import React from 'react';
import { useBanner, TextField } from '../context/BannerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMinus, 
  faPlus, 
  faBold, 
  faItalic, 
  faUnderline, 
  faAlignLeft,
  faAlignCenter,
  faAlignRight
} from '@fortawesome/free-solid-svg-icons';

interface ToolBarProps {
  selectedField: TextField | null;
}

export const ToolBar: React.FC<ToolBarProps> = ({ selectedField }) => {
  const { textFields, textSizes, setBannerData } = useBanner();

  const handleFontSizeChange = (increment: boolean) => {
    if (!selectedField) return;

    setBannerData({
      textSizes: {
        ...textSizes,
        [selectedField]: Math.max(8, Math.min(72, textSizes[selectedField] + (increment ? 2 : -2)))
      }
    });
  };

  const handleStyleChange = (style: 'bold' | 'italic' | 'underline') => {
    if (!selectedField) return;

    setBannerData({
      textFields: textFields.map(field => 
        field.id === selectedField
          ? { ...field, [style]: !field[style] }
          : field
      )
    });
  };

  const handleAlignmentChange = (align: 'left' | 'center' | 'right') => {
    if (!selectedField) return;

    setBannerData({
      textFields: textFields.map(field => 
        field.id === selectedField
          ? { ...field, align }
          : field
      )
    });
  };

  const getCurrentField = () => textFields.find(f => f.id === selectedField);

  if (!selectedField) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <p className="text-gray-500 text-center">Clique em um texto para editá-lo</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center gap-6">
        {/* Controles de Tamanho */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Tamanho:</span>
          <button 
            onClick={() => handleFontSizeChange(false)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            type="number"
            value={textSizes[selectedField]}
            onChange={(e) => {
              const size = Math.max(8, Math.min(72, parseInt(e.target.value) || 8));
              setBannerData({
                textSizes: {
                  ...textSizes,
                  [selectedField]: size
                }
              });
            }}
            className="w-16 text-center border rounded-md px-2 py-1"
          />
          <button 
            onClick={() => handleFontSizeChange(true)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Estilos de Texto */}
        <div className="flex items-center gap-2 border-l pl-6">
          <button 
            className={`p-2 rounded transition-colors ${getCurrentField()?.bold ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleStyleChange('bold')}
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button 
            className={`p-2 rounded transition-colors ${getCurrentField()?.italic ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleStyleChange('italic')}
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button 
            className={`p-2 rounded transition-colors ${getCurrentField()?.underline ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleStyleChange('underline')}
          >
            <FontAwesomeIcon icon={faUnderline} />
          </button>
        </div>

        {/* Alinhamento */}
        <div className="flex items-center gap-2 border-l pl-6">
          <button 
            className={`p-2 rounded transition-colors ${getCurrentField()?.align === 'left' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleAlignmentChange('left')}
          >
            <FontAwesomeIcon icon={faAlignLeft} />
          </button>
          <button 
            className={`p-2 rounded transition-colors ${getCurrentField()?.align === 'center' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleAlignmentChange('center')}
          >
            <FontAwesomeIcon icon={faAlignCenter} />
          </button>
          <button 
            className={`p-2 rounded transition-colors ${getCurrentField()?.align === 'right' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => handleAlignmentChange('right')}
          >
            <FontAwesomeIcon icon={faAlignRight} />
          </button>
        </div>
      </div>
    </div>
  );
}; 