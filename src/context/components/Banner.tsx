import { FaGithub, FaEnvelope } from 'react-icons/fa';

interface BannerProps {
  name: string;
  role: string;
  email: string;
  github: string;
  skills: string[]; // ex: ['JS', 'C#', 'HTML', 'CSS']
}

export const Banner = ({ name, role, email, github, skills }: BannerProps) => {
  return (
    <div className="bg-gradient-to-r from-black to-purple-900 text-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{role} - {name}</h1>

      <div className="flex gap-4 mt-4">
        {skills.map(skill => (
          <img key={skill} src={`/skills/${skill.toLowerCase()}.png`} alt={skill} className="h-12" />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <FaEnvelope className="text-xl" />
        <span>{email}</span>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <FaGithub className="text-xl" />
        <span>{github}</span>
      </div>
    </div>
  );
};
