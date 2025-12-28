import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ hideCursor }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [wiggle, setWiggle] = useState(0);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Check if hovering over dropdown menu
      const target = e.target;
      const dropdownMenu = target.closest('[data-dropdown-menu]');

      if (dropdownMenu) {
        setIsHoveringDropdown(true);
      } else {
        setIsHoveringDropdown(false);
      }

      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;

      // Horizontal movement - expand X
      if (Math.abs(dx) > Math.abs(dy)) {
        const stretch = Math.min(Math.abs(dx) / 30, 1);
        setScaleX(1 + stretch);
        setScaleY(1);
      }
      // Vertical movement - expand Y
      else {
        const stretch = Math.min(Math.abs(dy) / 30, 1);
        setScaleY(1 + stretch);
        setScaleX(1);
      }

      // Wiggle based on movement speed
      const speed = Math.sqrt(dx * dx + dy * dy);
      setWiggle(speed / 20);

      prevMousePos.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Decay wiggle
    const decayInterval = setInterval(() => {
      if (wiggle > 0.1) {
        setWiggle(w => w * 0.85);
      } else {
        setWiggle(0);
      }
    }, 16);

    // Reset scales when idle
    const resetInterval = setInterval(() => {
      setScaleX(1);
      setScaleY(1);
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(decayInterval);
      clearInterval(resetInterval);
    };
  }, [wiggle]);

  const shouldHide = hideCursor || isHoveringDropdown;

  return (
    <>
      {/* Outer Ring - Yellow with wiggle texture */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-yellow-300 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          opacity: shouldHide ? 0 : 1,
          scale: shouldHide ? 0.5 : 1,
          scaleX: scaleX,
          scaleY: scaleY,
          rotate: wiggle * (Math.random() - 0.5) * 8
        }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        style={{
          boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)'
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-yellow-300 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          opacity: shouldHide ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 1000 }}
      />
    </>
  );
};

export default CustomCursor;
