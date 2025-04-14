import React, { useRef, useState } from 'react';
import { useBanner } from '../context/BannerContext';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToolBar } from './ToolBar';
import { availableSkills } from '../config/skillsConfig';

export type TextField = 'name' | 'role' | 'email' | 'github' | 'skills';

export const BannerPreview: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sizes, setSizes] = useState<Record<string, number>>({
    name: 24,
    role: 18,
    email: 16,
    github: 16
  });
  const [skillSizes, setSkillSizes] = useState<Record<string, number>>({});
  const [skillPositions, setSkillPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [guides, setGuides] = useState<{ x: number | undefined; y: number | undefined; isCenter?: boolean }[]>([]);

  const {
    name,
    role,
    email,
    github,
    skills,
    fontFamily,
    backgroundType,
    gradient,
    backgroundColor,
    textColor,
    textFields,
    setBannerData,
    selectedField,
    setSelectedField
  } = useBanner();

  const getFieldPosition = (id: string) => {
    const field = textFields.find(f => f.id === id);
    return field || { 
      id, 
      x: 50, 
      y: 50,
      bold: false,
      italic: false,
      underline: false,
      align: 'center' as const,
      fontSize: id === 'name' ? 24 : id === 'role' ? 18 : 16
    };
  };

  const getSkillPosition = (skillId: string) => {
    return skillPositions[skillId] || { x: 50, y: 50 };
  };

  const checkAlignment = (x: number, y: number) => {
    const newGuides: { x: number | undefined; y: number | undefined; isCenter?: boolean }[] = [];
    const threshold = 5; // Distância em pixels para considerar alinhamento
    const centerThreshold = 1; // Distância mais precisa para o centro

    // Verifica alinhamento com o centro
    if (Math.abs(50 - x) < centerThreshold) {
      newGuides.push({ x: 50, y: undefined, isCenter: true });
    }
    if (Math.abs(50 - y) < centerThreshold) {
      newGuides.push({ x: undefined, y: 50, isCenter: true });
    }

    // Verifica alinhamento com outros elementos
    textFields.forEach(field => {
      if (Math.abs(field.x - x) < threshold) {
        newGuides.push({ x: field.x, y: undefined });
      }
      if (Math.abs(field.y - y) < threshold) {
        newGuides.push({ x: undefined, y: field.y });
      }
    });

    // Verifica alinhamento com skills
    Object.values(skillPositions).forEach(pos => {
      if (Math.abs(pos.x - x) < threshold) {
        newGuides.push({ x: pos.x, y: undefined });
      }
      if (Math.abs(pos.y - y) < threshold) {
        newGuides.push({ x: undefined, y: pos.y });
      }
    });

    setGuides(newGuides);
  };

  const handleMouseDown = (field: string, e: React.MouseEvent) => {
    if (!bannerRef.current) return;
    
    const position = getFieldPosition(field);
    const rect = bannerRef.current.getBoundingClientRect();
    
    const elementX = (position.x * rect.width) / 100;
    const elementY = (position.y * rect.height) / 100;
    
    setDragOffset({
      x: e.clientX - elementX,
      y: e.clientY - elementY
    });
    
    setIsDragging(field);
    setSelectedField(field);
    checkAlignment(position.x, position.y);
  };

  const handleSkillMouseDown = (skillId: string, e: React.MouseEvent) => {
    if (!bannerRef.current) return;
    
    const position = getSkillPosition(skillId);
    const rect = bannerRef.current.getBoundingClientRect();
    
    const elementX = (position.x * rect.width) / 100;
    const elementY = (position.y * rect.height) / 100;
    
    setDragOffset({
      x: e.clientX - elementX,
      y: e.clientY - elementY
    });
    
    setIsDragging(skillId);
    setSelectedField(skillId);
    checkAlignment(position.x, position.y);
  };

  const handleTouchStart = (field: string, e: React.TouchEvent) => {
    if (!bannerRef.current) return;
    
    const position = getFieldPosition(field);
    const rect = bannerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    const elementX = (position.x * rect.width) / 100;
    const elementY = (position.y * rect.height) / 100;
    
    setDragOffset({
      x: touch.clientX - elementX,
      y: touch.clientY - elementY
    });
    
    setIsDragging(field);
    setSelectedField(field);
    checkAlignment(position.x, position.y);
  };

  const handleSkillTouchStart = (skillId: string, e: React.TouchEvent) => {
    if (!bannerRef.current) return;
    
    const position = getSkillPosition(skillId);
    const rect = bannerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    
    const elementX = (position.x * rect.width) / 100;
    const elementY = (position.y * rect.height) / 100;
    
    setDragOffset({
      x: touch.clientX - elementX,
      y: touch.clientY - elementY
    });
    
    setIsDragging(skillId);
    setSelectedField(skillId);
    checkAlignment(position.x, position.y);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!bannerRef.current) return;

    if (isDragging) {
      const touch = e.touches[0];
      const rect = bannerRef.current.getBoundingClientRect();
      const x = ((touch.clientX - dragOffset.x) / rect.width) * 100;
      const y = ((touch.clientY - dragOffset.y) / rect.height) * 100;

      const boundedX = Math.max(0, Math.min(100, x));
      const boundedY = Math.max(0, Math.min(100, y));

      if (isDragging === 'name' || isDragging === 'role' || isDragging === 'email' || isDragging === 'github') {
        setBannerData({
          textFields: textFields.map(field => 
            field.id === isDragging 
              ? { ...field, x: boundedX, y: boundedY }
              : field
          )
        });
        checkAlignment(boundedX, boundedY);
      } else {
        setSkillPositions(prev => ({
          ...prev,
          [isDragging]: { x: boundedX, y: boundedY }
        }));
        checkAlignment(boundedX, boundedY);
      }
    } else if (isResizing) {
      const touch = e.touches[0];
      const movementY = touch.clientY - (e.target as HTMLElement).getBoundingClientRect().top;
      
      if (isResizing === 'name' || isResizing === 'role' || isResizing === 'email' || isResizing === 'github') {
        const currentSize = sizes[isResizing];
        const newSize = Math.max(12, Math.min(48, currentSize + (movementY * -0.1)));
        
        setSizes(prev => ({
          ...prev,
          [isResizing]: newSize
        }));
      } else {
        const currentSize = skillSizes[isResizing] || 32;
        const newSize = Math.max(16, Math.min(64, currentSize + (movementY * -0.1)));
        
        setSkillSizes(prev => ({
          ...prev,
          [isResizing]: newSize
        }));
      }
    }
  };

  const handleResizeStart = (field: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsResizing(field);
    setSelectedField(field);
  };

  const handleSkillResizeStart = (skillId: string, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsResizing(skillId);
    setSelectedField(skillId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bannerRef.current) return;

    if (isDragging) {
      const rect = bannerRef.current.getBoundingClientRect();
      const x = ((e.clientX - dragOffset.x) / rect.width) * 100;
      const y = ((e.clientY - dragOffset.y) / rect.height) * 100;

      const boundedX = Math.max(0, Math.min(100, x));
      const boundedY = Math.max(0, Math.min(100, y));

      if (isDragging === 'name' || isDragging === 'role' || isDragging === 'email' || isDragging === 'github') {
        setBannerData({
          textFields: textFields.map(field => 
            field.id === isDragging 
              ? { ...field, x: boundedX, y: boundedY }
              : field
          )
        });
        checkAlignment(boundedX, boundedY);
      } else {
        setSkillPositions(prev => ({
          ...prev,
          [isDragging]: { x: boundedX, y: boundedY }
        }));
        checkAlignment(boundedX, boundedY);
      }
    } else if (isResizing) {
      if (isResizing === 'name' || isResizing === 'role' || isResizing === 'email' || isResizing === 'github') {
        const currentSize = sizes[isResizing];
        const newSize = Math.max(12, Math.min(48, currentSize + (e.movementY * -0.5)));
        
        setSizes(prev => ({
          ...prev,
          [isResizing]: newSize
        }));
      } else {
        const currentSize = skillSizes[isResizing] || 32;
        const newSize = Math.max(16, Math.min(64, currentSize + (e.movementY * -0.5)));
        
        setSkillSizes(prev => ({
          ...prev,
          [isResizing]: newSize
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setIsResizing(null);
    setGuides([]);
  };

  const handleDownload = async () => {
    if (!bannerRef.current) return;

    try {
      const canvas = await html2canvas(bannerRef.current, {
        useCORS: true
      });

      const link = document.createElement('a');
      link.download = 'linkedin-banner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(null);
    setIsResizing(null);
    setGuides([]);
  };

  const handleFormatUpdate = (field: string, updates: Partial<{ bold: boolean; italic: boolean; underline: boolean; align: 'left' | 'center' | 'right' }>) => {
    setBannerData({
      textFields: textFields.map(f => 
        f.id === field
          ? { ...f, ...updates }
          : f
      )
    });
  };

  const getFontFamily = (font: string) => {
    const fontMap: Record<string, string> = {
      // Sans-serif
      'arial': 'Arial, sans-serif',
      'helvetica': 'Helvetica, Arial, sans-serif',
      'verdana': 'Verdana, Geneva, sans-serif',
      'roboto': '"Roboto", sans-serif',
      'opensans': '"Open Sans", sans-serif',
      
      // Serif
      'times': '"Times New Roman", Times, serif',
      'georgia': 'Georgia, serif',
      'garamond': 'Garamond, serif',
      'merriweather': '"Merriweather", serif',
      
      // Display
      'montserrat': '"Montserrat", sans-serif',
      'poppins': '"Poppins", sans-serif',
      'raleway': '"Raleway", sans-serif',
      'ubuntu': '"Ubuntu", sans-serif',
      
      // Monospace
      'consolas': 'Consolas, monospace',
      'monaco': 'Monaco, monospace',
      'firacode': '"Fira Code", monospace',
    };

    return fontMap[font] || 'Arial, sans-serif';
  };

  const renderField = (field: string, content: React.ReactNode) => {
    const position = getFieldPosition(field);
    const size = position.fontSize || (
      field === 'name' ? 24 :
      field === 'role' ? 18 : 16
    );

    return (
      <div
        className={`absolute cursor-move ${selectedField === field && !isResizing ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: `${size}px`,
          textAlign: position.align || 'center',
          fontWeight: position.bold ? 'bold' : 'normal',
          fontStyle: position.italic ? 'italic' : 'normal',
          textDecoration: position.underline ? 'underline' : 'none'
        }}
        onMouseDown={(e) => handleMouseDown(field, e)}
        onTouchStart={(e) => handleTouchStart(field, e)}
      >
        <div className="relative">
          {content}
          {selectedField === field && (
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize touch-none"
              onMouseDown={(e) => handleResizeStart(field, e)}
              onTouchStart={(e) => handleResizeStart(field, e)}
            />
          )}
        </div>
      </div>
    );
  };

  const renderSkill = (skillId: string) => {
    const skill = availableSkills.find(s => s.id === skillId);
    if (!skill) return null;

    const position = getSkillPosition(skillId);
    const size = skillSizes[skillId] || 32;

    return (
      <div
        key={skillId}
        className={`absolute cursor-move ${selectedField === skillId && !isResizing ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseDown={(e) => handleMouseDown(skillId, e)}
        onTouchStart={(e) => handleSkillTouchStart(skillId, e)}
      >
        <div className="relative">
          <img
            src={skill.imagePath}
            alt={skill.name}
            style={{ width: `${size}px`, height: `${size}px` }}
            className="object-contain"
            title={skill.name}
          />
          {selectedField === skillId && (
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize touch-none"
              onMouseDown={(e) => handleSkillResizeStart(skillId, e)}
              onTouchStart={(e) => handleSkillResizeStart(skillId, e)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <ToolBar />

      <div className="flex justify-center">
        <div
          ref={bannerRef}
          className="w-full max-w-[1128px] aspect-[1128/191] relative"
          style={{
            background: backgroundType === 'gradient'
              ? `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
              : backgroundColor,
            fontFamily,
            color: textColor
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Linhas de guia */}
          {guides.map((guide, index) => (
            <div
              key={index}
              className="absolute pointer-events-none"
              style={{
                left: guide.x !== undefined ? `${guide.x}%` : '0',
                top: guide.y !== undefined ? `${guide.y}%` : '0',
                width: guide.x !== undefined ? '1px' : '100%',
                height: guide.y !== undefined ? '1px' : '100%',
                backgroundColor: guide.isCenter ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.5)',
                zIndex: 10
              }}
            />
          ))}

          {/* Container para centralizar o conteúdo */}
          <div className="absolute inset-0 overflow-hidden">
            {name && renderField('name', (
              <h2 className="font-bold" style={{ fontFamily: getFontFamily(fontFamily) }}>
                {name}
              </h2>
            ))}

            {role && renderField('role', (
              <p style={{ fontFamily: getFontFamily(fontFamily) }}>
                {role}
              </p>
            ))}

            {email && renderField('email', (
              <div className="flex items-center gap-4" style={{ fontFamily: getFontFamily(fontFamily) }}>
                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                <span>{email}</span>
              </div>
            ))}

            {github && renderField('github', (
              <div className="flex items-center gap-4" style={{ fontFamily: getFontFamily(fontFamily) }}>
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
                <span>{github}</span>
              </div>
            ))}

            {skills && skills.map(skillId => renderSkill(skillId))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Baixar Banner
        </button>
      </div>
    </div>
  );
};