import React, { useState, useRef } from 'react';
import { useBanner, TextField } from '../../context/BannerContext';
import html2canvas from 'html2canvas';

interface BannerPreviewProps {}

export const BannerPreview: React.FC<BannerPreviewProps> = () => {
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
    textPositions,
    textSizes,
    setBannerData
  } = useBanner();

  const bannerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<TextField | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, field: TextField) => {
    e.preventDefault();
    setDragging(field);
    const banner = e.currentTarget.closest('.banner-container') as HTMLElement;
    const rect = banner.getBoundingClientRect();
    
    setStartPos({
      x: e.clientX - (textPositions[field].x * rect.width / 100),
      y: e.clientY - (textPositions[field].y * rect.height / 100)
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const banner = e.currentTarget as HTMLElement;
    const rect = banner.getBoundingClientRect();
    
    const x = ((e.clientX - startPos.x) / rect.width) * 100;
    const y = ((e.clientY - startPos.y) / rect.height) * 100;

    setBannerData({
      textPositions: {
        ...textPositions,
        [dragging]: {
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y))
        }
      }
    });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleDownload = async () => {
    if (!bannerRef.current) return;

    try {
      const canvas = await html2canvas(bannerRef.current, {
        width: bannerRef.current.offsetWidth * 2,
        height: bannerRef.current.offsetHeight * 2,
        background: 'transparent',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = 'linkedin-banner.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erro ao gerar a imagem:', error);
    }
  };

  const renderDraggableElement = (field: TextField, content: React.ReactNode) => (
    <div 
      className="absolute cursor-move"
      style={{
        left: `${textPositions[field].x}%`,
        top: `${textPositions[field].y}%`,
        transform: 'translate(-50%, -50%)',
        fontSize: `${textSizes[field]}px`,
        userSelect: 'none',
        pointerEvents: dragging && dragging !== field ? 'none' : 'auto'
      }}
      onMouseDown={(e) => handleMouseDown(e, field)}
    >
      {content}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={bannerRef}
        className="banner-container w-[1400px] h-[350px] rounded-lg p-8 relative"
        style={{
          background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
          color: textColor
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {renderDraggableElement('name', (
          <h2 className={`font-bold ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}`}>
            {name || 'Nome do Usuário'}
          </h2>
        ))}

        {renderDraggableElement('role', (
          <p className={`${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}`}>
            {role || 'Cargo do Usuário'}
          </p>
        ))}

        {renderDraggableElement('email', email && (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
            </svg>
            <span>{email}</span>
          </div>
        ))}

        {renderDraggableElement('github', github && (
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>github.com/{github}</span>
          </div>
        ))}

        {renderDraggableElement('skills', (
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <img 
                key={index}
                src={`/skills/${skill.toLowerCase()}.png`}
                alt={skill}
                className="w-12 h-12 object-contain"
              />
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        Baixar Banner
      </button>
    </div>
  );
}; 