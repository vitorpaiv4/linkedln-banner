import React from 'react';
import { useBanner } from '../context/BannerContext';

export const BannerControls: React.FC = () => {
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
    setBannerData
  } = useBanner();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBannerData({ [name]: value });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setBannerData({ skills: newSkills });
  };

  const handleAddSkill = () => {
    setBannerData({ skills: [...skills, ''] });
  };

  const handleRemoveSkill = (index: number) => {
    setBannerData({ skills: skills.filter((_, i) => i !== index) });
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
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Habilidades</label>
        <div className="mt-2 space-y-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleRemoveSkill(index)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            onClick={handleAddSkill}
            className="mt-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800"
          >
            Adicionar Habilidade
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tema</label>
        <select
          name="theme"
          value={theme}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fonte</label>
        <select
          name="fontFamily"
          value={fontFamily}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
        </select>
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
        <label className="block text-sm font-medium text-gray-700">Gradiente</label>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500">De</label>
            <input
              type="color"
              name="from"
              value={gradient.from}
              onChange={handleGradientChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Para</label>
            <input
              type="color"
              name="to"
              value={gradient.to}
              onChange={handleGradientChange}
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 