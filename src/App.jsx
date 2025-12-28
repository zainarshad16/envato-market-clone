import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { ReactLenis } from 'lenis/react';

function App() {
  // 1. Create the state here to track the mouse position relative to the Nav
  const [isOverNav, setIsOverNav] = useState(false);

  return (
    <ReactLenis root>
      <div 
        onMouseEnter={() => setIsOverNav(true)} 
        onMouseLeave={() => setIsOverNav(false)}
      >
        <NavBar />
      </div>

      <Home hideCursor={isOverNav} />
    </ReactLenis>
  );
}

export default App;