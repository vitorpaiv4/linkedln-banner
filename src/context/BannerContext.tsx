"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TextField = 'name' | 'role' | 'email' | 'github' | 'skills';

interface TextFieldPosition {
  id: TextField;
  x: number;
  y: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
  fontSize: number;
}

interface BannerData {
  name: string;
  role: string;
  email: string;
  github: string;
  skills: string[];
  theme: string;
  fontFamily: string;
  backgroundType: 'gradient' | 'solid';
  gradient: {
    from: string;
    to: string;
  };
  backgroundColor: string;
  textColor: string;
  textFields: TextFieldPosition[];
  textSizes: {
    [key in TextField]: number;
  };
}

interface BannerContextType extends BannerData {
  selectedField: string | null;
  setBannerData: (data: Partial<BannerData>) => void;
  setSelectedField: (field: string | null) => void;
}

const BannerContext = createContext<BannerContextType | null>(null);

const initialTextFields = [
  { id: 'name' as TextField, x: 50, y: 30, fontSize: 24 },
  { id: 'role' as TextField, x: 50, y: 45, fontSize: 18 },
  { id: 'email' as TextField, x: 50, y: 60, fontSize: 16 },
  { id: 'github' as TextField, x: 50, y: 75, fontSize: 16 },
  { id: 'skills' as TextField, x: 50, y: 90, fontSize: 16 }
];

const initialTextSizes = {
  name: 24,
  role: 18,
  email: 16,
  github: 16,
  skills: 16
};

export const BannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bannerData, setBannerData] = useState<BannerData>({
    name: '',
    role: '',
    email: '',
    github: '',
    skills: [],
    theme: 'light',
    fontFamily: 'sans',
    backgroundType: 'gradient',
    gradient: {
      from: '#4F46E5',
      to: '#06B6D4'
    },
    backgroundColor: '#4F46E5',
    textColor: '#FFFFFF',
    textFields: initialTextFields,
    textSizes: initialTextSizes
  });

  const [selectedField, setSelectedField] = useState<string | null>(null);

  const updateBannerData = (newData: Partial<BannerData>) => {
    setBannerData(prev => ({ ...prev, ...newData }));
  };

  return (
    <BannerContext.Provider 
      value={{
        ...bannerData,
        selectedField,
        setBannerData: updateBannerData,
        setSelectedField
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