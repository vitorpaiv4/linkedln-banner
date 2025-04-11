import React, { useRef, useState } from 'react';
import { useBanner } from '../context/BannerContext';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const BannerPreview: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedField, setDraggedField] = useState<string | null>(null);
  
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
    setTextFields
  } = useBanner();

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsDragging(true);
    setDraggedField(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedField || !bannerRef.current) return;

    const bannerRect = bannerRef.current.getBoundingClientRect();
    const x = ((e.clientX - bannerRect.left) / bannerRect.width) * 100;
    const y = ((e.clientY - bannerRect.top) / bannerRect.height) * 100;

    setTextFields(
      textFields.map(field => 
        field.id === draggedField 
          ? { ...field, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
          : field
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedField(null);
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
    <div className="flex flex-col items-center gap-4">
      <div
        ref={bannerRef}
        className="relative w-[1128px] h-[191px] bg-gradient-to-r overflow-hidden"
        style={{
          background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
          fontFamily
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {textFields.map(field => (
          <div
            key={field.id}
            className={`absolute cursor-move select-none ${isDragging && draggedField === field.id ? 'z-10' : ''}`}
            style={{
              left: `${field.x}%`,
              top: `${field.y}%`,
              transform: 'translate(-50%, -50%)',
              color: textColor,
              pointerEvents: isDragging && draggedField !== field.id ? 'none' : 'auto'
            }}
            onMouseDown={(e) => handleMouseDown(e, field.id)}
          >
            {field.id === 'name' && name}
            {field.id === 'role' && role}
            {field.id === 'email' && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{email}</span>
              </div>
            )}
            {field.id === 'github' && (
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGithub} />
                <span>{github}</span>
              </div>
            )}
            {field.id === 'skills' && skills.join(' • ')}
          </div>
        ))}
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Baixar Banner
      </button>
    </div>
  );
}; 