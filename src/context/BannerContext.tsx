"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TextField = 'name' | 'role' | 'email' | 'github' | 'skills';

export interface BannerContextType {
  name: string;
  role: string;
  email: string;
  github: string;
  skills: string[];
  theme: string;
  fontFamily: string;
  gradient: {
    from: string;
    to: string;
  };
  textColor: string;
  textFields: {
    id: TextField;
    x: number;
    y: number;
  }[];
  textSizes: Record<TextField, number>;
  setBannerData: (data: Partial<BannerContextType>) => void;
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setEmail: (email: string) => void;
  setGithub: (github: string) => void;
  setSkills: (skills: string[]) => void;
  setTheme: (theme: string) => void;
  setFontFamily: (fontFamily: string) => void;
  setGradient: (gradient: { from: string; to: string }) => void;
  setTextColor: (textColor: string) => void;
  setTextFields: (textFields: { id: TextField; x: number; y: number }[]) => void;
  setTextSizes: (textSizes: Record<TextField, number>) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

const initialTextFields = [
  { id: 'name' as TextField, x: 50, y: 30 },
  { id: 'role' as TextField, x: 50, y: 45 },
  { id: 'email' as TextField, x: 50, y: 60 },
  { id: 'github' as TextField, x: 50, y: 75 },
  { id: 'skills' as TextField, x: 50, y: 90 }
];

const initialTextSizes = {
  name: 24,
  role: 18,
  email: 16,
  github: 16,
  skills: 16
};

export const BannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [theme, setTheme] = useState('light');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [gradient, setGradient] = useState({ from: '#4F46E5', to: '#7C3AED' });
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textFields, setTextFields] = useState(initialTextFields);
  const [textSizes, setTextSizes] = useState(initialTextSizes);

  const setBannerData = (data: Partial<BannerContextType>) => {
    if (data.name !== undefined) setName(data.name);
    if (data.role !== undefined) setRole(data.role);
    if (data.email !== undefined) setEmail(data.email);
    if (data.github !== undefined) setGithub(data.github);
    if (data.skills !== undefined) setSkills(data.skills);
    if (data.theme !== undefined) setTheme(data.theme);
    if (data.fontFamily !== undefined) setFontFamily(data.fontFamily);
    if (data.gradient !== undefined) setGradient(data.gradient);
    if (data.textColor !== undefined) setTextColor(data.textColor);
    if (data.textFields !== undefined) setTextFields(data.textFields);
    if (data.textSizes !== undefined) setTextSizes(data.textSizes);
  };

  return (
    <BannerContext.Provider
      value={{
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
        textSizes,
        setBannerData,
        setName,
        setRole,
        setEmail,
        setGithub,
        setSkills,
        setTheme,
        setFontFamily,
        setGradient,
        setTextColor,
        setTextFields,
        setTextSizes
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
}; 