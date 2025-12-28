import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-400 rounded-lg shadow-lg cursor-pointer z-50 flex flex-col items-center justify-center gap-1 hover:bg-yellow-500 transition-colors"
                    title="Scroll to top"
                >
                    {/* Three dots forming upward arrow */}
                    <div className="relative w-6 h-4 hover:h-6 transition-all duration-300">
                        {/* Top dot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full"></div>
                        {/* Left dot */}
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black rounded-full"></div>
                        {/* Right dot */}
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black rounded-full"></div>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
