import React from 'react';
import { useBanner } from '../context/BannerContext';
import { SkillSelector } from './SkillSelector';

interface BannerFormProps {}

export const BannerForm: React.FC<BannerFormProps> = () => {
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
    textSizes,
    setBannerData 
  } = useBanner();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBannerData({ [name]: value });
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBannerData({ skills: value.split(',').map(skill => skill.trim()) });
  };

  const handleGradientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBannerData({
      gradient: {
        ...gradient,
        [name]: value
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-bold mb-4">Configurações do Banner</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cargo</label>
        <input
          type="text"
          name="role"
          value={role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">GitHub</label>
        <input
          type="text"
          name="github"
          value={github}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-6">
        <SkillSelector />
      </div>
    </div>
  );
}; 