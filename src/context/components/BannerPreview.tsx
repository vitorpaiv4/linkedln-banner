import React, { useRef, useState } from 'react';
import { useBanner, TextField } from '../BannerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { ToolBar } from '../../components/ToolBar';

export const BannerPreview: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const {
    name,
    role,
    email,
    github,
    skills,
    theme,
    fontFamily,
    gradient,
    textColor,
    textFields,
    textSizes,
    setBannerData
  } = useBanner();

  const getFieldPosition = (id: TextField) => {
    const field = textFields.find(f => f.id === id);
    return field || { x: 50, y: 50 };
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
      <div className="flex justify-center items-center mb-8">
        <img 
          src={require('../bannex-icon.png')} 
          alt="Bannex Logo" 
          className="h-16 w-auto object-contain"
          style={{ maxWidth: '200px' }}
        />
      </div>
      <ToolBar />
      <div
        ref={bannerRef}
        className="w-[1128px] h-[191px] bg-gradient-to-r p-8 relative"
        style={{
          background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
          fontFamily,
          color: textColor
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute cursor-move"
          style={{
            left: `${getFieldPosition('name').x}%`,
            top: `${getFieldPosition('name').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.name}px`
          }}
          onMouseDown={(e) => handleMouseDown(e, 'name')}
        >
          <h2 className={`font-bold ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}`}>
            {name || 'Nome do Usuário'}
          </h2>
        </div>

        <div
          className="absolute cursor-move"
          style={{
            left: `${getFieldPosition('role').x}%`,
            top: `${getFieldPosition('role').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.role}px`
          }}
          onMouseDown={(e) => handleMouseDown(e, 'role')}
        >
          <p className={fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}>
            {role || 'Cargo do Usuário'}
          </p>
        </div>

        <div
          className="absolute cursor-move"
          style={{
            left: `${getFieldPosition('email').x}%`,
            top: `${getFieldPosition('email').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.email}px`
          }}
          onMouseDown={(e) => handleMouseDown(e, 'email')}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            <span>{email}</span>
          </div>
        </div>

        <div
          className="absolute cursor-move"
          style={{
            left: `${getFieldPosition('github').x}%`,
            top: `${getFieldPosition('github').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.github}px`
          }}
          onMouseDown={(e) => handleMouseDown(e, 'github')}
        >
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
            <span>{github}</span>
          </div>
        </div>

        <div
          className="absolute cursor-move"
          style={{
            left: `${getFieldPosition('skills').x}%`,
            top: `${getFieldPosition('skills').y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: `${textSizes.skills}px`
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