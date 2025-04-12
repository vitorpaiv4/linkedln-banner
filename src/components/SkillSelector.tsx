import React, { useState } from 'react';
import { availableSkills } from '../config/skillsConfig';
import { useBanner } from '../context/BannerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const SkillSelector: React.FC = () => {
  const { skills, setBannerData } = useBanner();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(availableSkills.length / itemsPerPage);

  const handleSkillClick = (skillId: string) => {
    const currentSkills = skills || [];
    const isSelected = currentSkills.includes(skillId);

    if (isSelected) {
      setBannerData({
        skills: currentSkills.filter(id => id !== skillId)
      });
    } else {
      setBannerData({
        skills: [...currentSkills, skillId]
      });
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleSkills = availableSkills.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Selecione suas skills</h3>
      <div className="relative">
        <div className="flex items-center">
          {totalPages > 1 && currentPage > 0 && (
            <button
              onClick={prevPage}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 z-10 mr-2"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}
          
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {visibleSkills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => handleSkillClick(skill.id)}
                  className={`p-2 border rounded-lg flex flex-col items-center gap-2 transition-all hover:shadow-md ${
                    skills?.includes(skill.id)
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-300'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img
                      src={skill.imagePath}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700">{skill.name}</span>
                </button>
              ))}
            </div>
          </div>

          {totalPages > 1 && currentPage < totalPages - 1 && (
            <button
              onClick={nextPage}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 z-10 ml-2"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 