import React from 'react';
import { Bike } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-orange-100 z-50 h-16 flex items-center justify-center shadow-sm">
      <div className="flex items-center gap-2 text-orange-600">
        <div className="bg-orange-100 p-2 rounded-full">
          <Bike size={24} className="text-orange-600" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">橘子老師</h1>
          <p className="text-xs text-orange-400 font-medium">AI 自行車教練</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
