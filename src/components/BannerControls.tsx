import React from 'react';
import { useBanner } from '../context/BannerContext';

export const BannerControls: React.FC = () => {
  const {
    name,
    role,
    email,
    github,
    skills,
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
    </div>
  );
}; 