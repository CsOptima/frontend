import React from 'react';
import { IconButton } from '../atoms/IconButton';

export const SearchInput = ({ value, onChange, onSubmit, error }) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-[680px] mx-auto group">
      {/* Заднее свечение */}
      <div className={`absolute -inset-[2px] opacity-5 blur-xl rounded-[30px] pointer-events-none transition-opacity duration-700 group-hover:opacity-15 ${error ? 'bg-red-500 opacity-20' : 'bg-[#7E7CF9]'}`} />
      
      {/* Контейнер инпута */}
      <div className={`relative flex items-center w-full bg-[#222225] border rounded-[24px] p-2 pl-6 shadow-2xl shadow-black/50 transition-colors ${error ? 'border-red-500/50' : 'border-white/5 group-focus-within:border-white/10'}`}>
        
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите url сайта"
          className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-500 text-lg font-light h-full"
        />
        
        <div className="ml-2">
          <IconButton onClick={onSubmit} disabled={!value} />
        </div>
      </div>
      
      {/* Сообщение об ошибке валидации */}
      {error && (
        <div className="absolute -bottom-8 left-6 text-red-400 text-sm animate-fadeIn">
          {error}
        </div>
      )}
    </div>
  );
};