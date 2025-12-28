import React from 'react';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full font-sans z-50 overflow-hidden">
      {/* Envato Market Top Bar (Matches image_6769c3.png) */}
      <div className="bg-[#262626] py-3 px-6 flex justify-between items-center text-white">
        <div className="flex items-center gap-1">
          <img
            src="logo.svg"
            alt="envato market"
            className="h-5"
          />
        </div>
        <button className="bg-[#82b440] hover:bg-[#6f9a37] transition-colors px-4.5 py-1.5 rounded-md text-[14px] font-bold">
          Buy now
        </button>
      </div>
    </header>
  );
};

export default Navbar;