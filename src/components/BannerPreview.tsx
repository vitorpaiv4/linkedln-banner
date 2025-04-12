import React, { useRef, useState } from 'react';
import { useBanner } from '../context/BannerContext';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ToolBar } from './ToolBar';
import { BackgroundControls } from './BackgroundControls';

export type TextField = 'name' | 'role' | 'email' | 'github' | 'skills';

export const BannerPreview: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedField, setSelectedField] = useState<TextField | null>(null);
  
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
    textSizes,
    setBannerData
  } = useBanner();

  const getFieldPosition = (id: TextField) => {
    const field = textFields.find(f => f.id === id);
    return field || { 
      id, 
      x: 50, 
      y: 50,
      bold: false,
      italic: false,
      underline: false,
      align: 'center' as const
    };
  };

  const handleMouseDown = (e: React.MouseEvent, field: TextField) => {
    if (!bannerRef.current) return;
    
    const position = getFieldPosition(field);
    const rect = bannerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - (position.x * rect.width / 100),
      y: e.clientY - (position.y * rect.height / 100)
    });
    setIsDragging(field);
    setSelectedField(field);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !bannerRef.current) return;

    const rect = bannerRef.current.getBoundingClientRect();
    const x = ((e.clientX - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - dragOffset.y) / rect.height) * 100;

    setBannerData({
      textFields: textFields.map(field => 
        field.id === isDragging 
          ? { ...field, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
          : field
      )
    });
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleDownload = async () => {
    if (!bannerRef.current) return;

    const canvas = await html2canvas(bannerRef.current);
    const link = document.createElement('a');
    link.download = 'linkedin-banner.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">
      <BackgroundControls />
      <ToolBar selectedField={selectedField} />
      <div
        ref={bannerRef}
        className="w-[1128px] h-[191px] p-8 relative"
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
      >
        <div
          className={`absolute cursor-move ${selectedField === 'name' ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
          style={{
            left: `${getFieldPosition('name').x}%`,
            top: `${getFieldPosition('name').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.name}px`,
            textAlign: getFieldPosition('name').align || 'center',
            fontWeight: getFieldPosition('name').bold ? 'bold' : 'normal',
            fontStyle: getFieldPosition('name').italic ? 'italic' : 'normal',
            textDecoration: getFieldPosition('name').underline ? 'underline' : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'name')}
        >
          <h2 className={`font-bold ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}`}>
            {name || 'Nome do Usuário'}
          </h2>
        </div>

        <div
          className={`absolute cursor-move ${selectedField === 'role' ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
          style={{
            left: `${getFieldPosition('role').x}%`,
            top: `${getFieldPosition('role').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.role}px`,
            textAlign: getFieldPosition('role').align || 'center',
            fontWeight: getFieldPosition('role').bold ? 'bold' : 'normal',
            fontStyle: getFieldPosition('role').italic ? 'italic' : 'normal',
            textDecoration: getFieldPosition('role').underline ? 'underline' : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'role')}
        >
          <p className={fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}>
            {role || 'Cargo do Usuário'}
          </p>
        </div>

        <div
          className={`absolute cursor-move ${selectedField === 'email' ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
          style={{
            left: `${getFieldPosition('email').x}%`,
            top: `${getFieldPosition('email').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.email}px`,
            textAlign: getFieldPosition('email').align || 'center',
            fontWeight: getFieldPosition('email').bold ? 'bold' : 'normal',
            fontStyle: getFieldPosition('email').italic ? 'italic' : 'normal',
            textDecoration: getFieldPosition('email').underline ? 'underline' : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'email')}
        >
          <div className="flex items-center gap-4">
            {email && <FontAwesomeIcon icon={faEnvelope} className="text-xl" />}
            <span>{email}</span>
          </div>
        </div>

        <div
          className={`absolute cursor-move ${selectedField === 'github' ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
          style={{
            left: `${getFieldPosition('github').x}%`,
            top: `${getFieldPosition('github').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.github}px`,
            textAlign: getFieldPosition('github').align || 'center',
            fontWeight: getFieldPosition('github').bold ? 'bold' : 'normal',
            fontStyle: getFieldPosition('github').italic ? 'italic' : 'normal',
            textDecoration: getFieldPosition('github').underline ? 'underline' : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'github')}
        >
          <div className="flex items-center gap-4">
            {github && <FontAwesomeIcon icon={faGithub} className="text-xl" />}
            <span>{github}</span>
          </div>
        </div>

        <div
          className={`absolute cursor-move ${selectedField === 'skills' ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
          style={{
            left: `${getFieldPosition('skills').x}%`,
            top: `${getFieldPosition('skills').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.skills}px`,
            textAlign: getFieldPosition('skills').align || 'center',
            fontWeight: getFieldPosition('skills').bold ? 'bold' : 'normal',
            fontStyle: getFieldPosition('skills').italic ? 'italic' : 'normal',
            textDecoration: getFieldPosition('skills').underline ? 'underline' : 'none'
          }}
          onMouseDown={(e) => handleMouseDown(e, 'skills')}
        >
          <div className="flex flex-wrap gap-4">
            {skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Baixar Banner
      </button>
    </div>
  );
};