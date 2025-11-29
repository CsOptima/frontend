import React from 'react';
import { Logo } from '../atoms/Logo';
import { useAnalysis } from '../../context/AnalysisContext';

const NavLink = ({ targetId, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <a 
      href={`#${targetId}`} 
      onClick={handleClick}
      // Убрал bg, padding и rounded. Теперь это просто текст.
      className="text-[#C9C9F0] hover:text-white transition-colors text-[15px] font-normal cursor-pointer tracking-wide"
    >
      {children}
    </a>
  );
};

export const Header = () => {
  const { isNavVisible } = useAnalysis();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#151517]/90 backdrop-blur-md border-b border-white/5">
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center">
        
        {/* Логотип */}
        <div className="flex-shrink-0 z-10">
          <Logo />
        </div>
        
        {/* Навигация по центру */}
        <div className={`
            absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
            transition-all duration-700 ease-in-out
            ${isNavVisible ? 'opacity-100 translate-y-[-50%]' : 'opacity-0 -translate-y-full pointer-events-none'}
          `}>
          
          {/* 
              Убрал классы bg-[#1A1A1D], border, shadow и т.д.
              Увеличил gap с 2 до 8, чтобы ссылки не слипались.
          */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink targetId="metrics">Метрики</NavLink>
            <NavLink targetId="improve">Улучшить текст</NavLink>
            <NavLink targetId="features">Возможности</NavLink>
            <NavLink targetId="contacts">Контакты</NavLink>
          </nav>
          
        </div>

      </div>
    </header>
  );
};