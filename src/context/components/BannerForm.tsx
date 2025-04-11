import React from 'react';
import { useBanner, TextField } from '../../context/BannerContext';

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

  const handleSizeChange = (field: TextField, value: string) => {
    const size = parseInt(value);
    if (!isNaN(size) && size >= 12 && size <= 48) {
      setBannerData({
        textSizes: {
          ...textSizes,
          [field]: size
        }
      });
    }
  };

  const renderSizeControl = (field: TextField, label: string) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div>
        <input
          type="number"
          min="12"
          max="48"
          value={textSizes[field]}
          onChange={(e) => handleSizeChange(field, e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {renderSizeControl('name', 'Tamanho do Nome (12-48px)')}
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
        {renderSizeControl('role', 'Tamanho do Cargo (12-48px)')}
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
        {renderSizeControl('email', 'Tamanho do Email (12-48px)')}
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
        {renderSizeControl('github', 'Tamanho do GitHub (12-48px)')}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills (separadas por vírgula)</label>
        <input
          type="text"
          name="skills"
          value={skills.join(', ')}
          onChange={handleSkillChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {renderSizeControl('skills', 'Tamanho das Skills (12-48px)')}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cor do Gradiente (Início)</label>
        <input
          type="color"
          name="from"
          value={gradient.from}
          onChange={handleGradientChange}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cor do Gradiente (Fim)</label>
        <input
          type="color"
          name="to"
          value={gradient.to}
          onChange={handleGradientChange}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cor do Texto</label>
        <input
          type="color"
          name="textColor"
          value={textColor}
          onChange={handleChange}
          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fonte</label>
        <select
          name="fontFamily"
          value={fontFamily}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
      </div>
    </form>
  );
}; 