import React from "react";
import LogoSvg from "../../assets/logo.svg";

export const Logo = () => {
  return (
    <a href="#">
      <div className="flex items-center gap-3 select-none cursor-pointer group">
        {/* SVG Иконка */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <img src={LogoSvg} alt="Logo" />
        </div>

        {/* Текст Geoptima */}
        <span className="text-white text-3xl font-normal tracking-wide">
          Geoptima
        </span>
      </div>
    </a>
  );
};
