import React from 'react';
import { useBanner } from '../context/BannerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const Banner: React.FC = () => {
  const { name, role, email, github, skills, theme, fontFamily, gradient, textColor } = useBanner();

  return (
    <div
      className="w-[1128px] h-[191px] bg-gradient-to-r p-8"
      style={{
        background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`,
        fontFamily,
        color: textColor
      }}
    >
      <h2 className={`text-2xl font-bold ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}`}>
        {name || 'Nome do Usuário'}
      </h2>
      <p className={`text-xl ${fontFamily === 'serif' ? 'font-serif' : fontFamily === 'monospace' ? 'font-mono' : 'font-sans'}`}>
        {role || 'Cargo do Usuário'}
      </p>

      <div className="mt-4 flex items-center gap-4">
        <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
        <span>{email}</span>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <FontAwesomeIcon icon={faGithub} className="text-xl" />
        <span>{github}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-white/10 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
