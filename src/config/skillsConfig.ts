import javascriptLogo from '../assets/skills/JavaScript-logo.png';
import typescriptLogo from '../assets/skills/TYPE SCRIPT LOGO.png';
import pythonLogo from '../assets/skills/Python-logo-notext.svg.png';
import javaLogo from '../assets/skills/java-coffee-cup-logo.png';
import csharpLogo from '../assets/skills/Csharp_Logo.png';
import goLogo from '../assets/skills/Go-Logo_Blue.png';
import rubyLogo from '../assets/skills/Ruby_logo.svg.png';
import sqlLogo from '../assets/skills/Sql_data_base_with_logo.png';
import cssLogo from '../assets/skills/CSS-3-logo-01.png';
import htmlLogo from '../assets/skills/images (1).png';

export interface Skill {
  id: string;
  name: string;
  imagePath: string;
}

export const availableSkills: Skill[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    imagePath: javascriptLogo
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    imagePath: typescriptLogo
  },
  {
    id: 'python',
    name: 'Python',
    imagePath: pythonLogo
  },
  {
    id: 'java',
    name: 'Java',
    imagePath: javaLogo
  },
  {
    id: 'csharp',
    name: 'C#',
    imagePath: csharpLogo
  },
  {
    id: 'go',
    name: 'Go',
    imagePath: goLogo
  },
  {
    id: 'ruby',
    name: 'Ruby',
    imagePath: rubyLogo
  },
  {
    id: 'sql',
    name: 'SQL',
    imagePath: sqlLogo
  },
  {
    id: 'css',
    name: 'CSS',
    imagePath: cssLogo
  },
  {
    id: 'html',
    name: 'HTML',
    imagePath: htmlLogo
  }
]; 