import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Search } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import ScrollToTop from '../components/ScrollToTop';
import personVR from '../assets/Person-with-VR-Headset-m_f.png';
import stoneComposition from '../assets/Minimalist-Stone-Composition-m_f.png';
import characterJar from '../assets/Whimsical-Character-in-a-Jar-m_f.png';
import iceCream from '../assets/Three-Scoops-of-Ice-Cream-on-Spoons.webp';
import greenCharacter from '../assets/Green-Character-in-Yellow-Hoodie-m_f.png';
import burgers from '../assets/burgers.webp';
import speakers from '../assets/speakers.webp';
import camera from '../assets/camera.webp';
import bottle from '../assets/bottle.webp';
import cap from '../assets/cap.webp';
import headphones from '../assets/headphones.webp';
import shoes from '../assets/shoes.webp';
import luxuryBoxes from '../assets/luxuryBoxes.webp';
import mouse from '../assets/mouse.webp';
import girl from '../assets/girl.webp';
import book from '../assets/book.webp';
import music from '../assets/music.webp';
import star from '../assets/star.svg';

const Card = ({ src, alt, initialY, rotate, isDarkTheme }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 500, damping: 10 });
    const springY = useSpring(y, { stiffness: 500, damping: 10 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const relativeX = (e.clientX - centerX) / rect.width;
        const relativeY = (e.clientY - centerY) / rect.height;

        x.set(relativeX * 250);
        y.set(relativeY * 150);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ y: initialY, rotate: rotate }}
            animate={{
                y: initialY,
                rotate: rotate
            }}
            style={{
                x: springX,
                y: springY,
                rotate: rotate
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 10 }}
            className={`w-25 h-42 mt-8 sm:w-36 sm:my-6 sm:h-46 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] xl:rounded-[40px] shadow-xl overflow-hidden shrink-0 -ml-12 sm:-ml-14 md:-ml-18 lg:-ml-20 xl:-ml-24 first:ml-0 transition-colors duration-300 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </motion.div>
    );
};

const Home = ({ hideCursor }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const [activeTab, setActiveTab] = useState('All Categories');
    const [isTabsDropdownOpen, setIsTabsDropdownOpen] = useState(false);
    const menuRef = useRef(null);
    const tabsDropdownRef = useRef(null);

    const links = ['Index', 'News', 'Projects', 'Pages', 'Shop', 'Contact'];
    const tabs = ['All Categories', 'Creative', 'Design', 'Photo', 'Style'];

    const categoryImages = {
        'All Categories': [
            burgers,
            speakers,
            camera,
            bottle,
            cap,
            headphones,
            shoes,
            luxuryBoxes,
            mouse
        ],
        'Creative': [
            burgers,
            cap,
            mouse
        ],
        'Design': [
            speakers,
            headphones,
            girl
        ],
        'Photo': [
            camera,
            shoes,
            book
        ],
        'Style': [
            bottle,
            luxuryBoxes,
            music
        ]
    };

    const categoryLabels = {
        'All Categories': ['THE DARK SIDE', 'JUSTICE ROBOT', 'COLOR CURRENT', 'SUBSEQUENT SNEEZE', 'WIGGLY FINGER', 'SHARE SPARK', 'THE DARK SIDE', 'RANDOM RISK', 'STREAM SHOP', 'FREEZING BIRTHDAY'],
        'Creative': ['THE DARK SIDE', 'WIGGLY FINGER', 'FREEZING BIRTHDAY'],
        'Design': ['JUSTICE ROBOT', 'SHARE SPARK', 'Urban Dreams'],
        'Photo': ['COLOR CURRENT', 'RANDOM RISK', 'FASHION FUSION'],
        'Style': ['SUBSEQUENT SNEEZE', 'STREAM SHOP', 'CINEMATIC VISIONS']
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleTabsDropdownClickOutside = (event) => {
            if (tabsDropdownRef.current && !tabsDropdownRef.current.contains(event.target)) {
                setIsTabsDropdownOpen(false);
            }
        };

        if (isTabsDropdownOpen) {
            document.addEventListener('mousedown', handleTabsDropdownClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleTabsDropdownClickOutside);
        };
    }, [isTabsDropdownOpen]);

    return (
        <>
            <CustomCursor hideCursor={hideCursor} />

            <div className={`${isDarkTheme ? 'bg-[#1a1a1a] text-[#fcfcfc]' : 'bg-[#fcfcfc] text-[#1a1a1a]'} min-h-screen font-sans transition-colors duration-300`}>
                {/* 1. Navigation - Fixed below main navbar */}
                <nav className="fixed top-10 left-0 right-0 z-40 flex justify-between items-center px-4 sm:px-6 py-6 sm:py-8 bg-transparent transition-all duration-300">
                    <div className="text-4xl font-semibold tracking-tighter cursor-pointer transition-all duration-300">osty.</div>

                    {/* Desktop Navigation - Hidden when scrolled */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isScrolled ? 0 : 1 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`hidden lg:flex items-center gap-6 sm:gap-8 text-[14px] sm:text-[16px] md:text-[17px] font-semibold ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        style={{ perspective: '1000px' }}
                    >
                        {links.map((link) => (
                            <motion.a
                                key={link}
                                href="#"
                                whileHover={{ rotateX: 360 }}
                                animate={{
                                    color: hoveredLink === null
                                        ? (isDarkTheme ? '#d1d5db' : '#374151')
                                        : hoveredLink === link
                                            ? (isDarkTheme ? '#ffffff' : '#000000')
                                            : (isDarkTheme ? '#4b5563' : '#9ca3af')
                                }}
                                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                                onMouseEnter={() => setHoveredLink(link)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={`cursor-pointer`}
                                style={{ display: 'inline-block', transformOrigin: 'center' }}
                            >
                                {link}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Right Side: Search, Theme Toggle, Menu Button */}
                    <div className="relative">
                        {/* Mobile: All three with background */}
                        <motion.div
                            animate={{
                                backgroundColor: isDarkTheme ? '#333333' : '#7f7f7f',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '0.8rem',
                                gap: '1.25rem'
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`lg:hidden flex items-center`}
                        >
                            <Search size={22} className={`cursor-pointer ${isDarkTheme ? 'text-gray-200' : 'text-white'}`} />
                            <button
                                onClick={toggleTheme}
                                className="w-4 h-8 bg-gray-400 rounded-full cursor-pointer hover:h-9 transition-all duration-300 flex items-start pt-1 pb-1 justify-center relative overflow-hidden"
                                title="Toggle Theme"
                            >
                                <div
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${isDarkTheme ? 'translate-y-3 bg-white' : 'translate-y-0 bg-black'}`}
                                ></div>
                            </button>
                            {/* Menu Button - Only on mobile */}
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={toggleMenu}
                                    className={`${isDarkTheme ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} px-5 py-3 rounded-lg cursor-pointer transition-colors duration-300 flex justify-center items-center gap-2`}
                                >
                                    <span className="text-sm font-semibold">Menu</span>
                                    {/* Hamburger Icon - Two White Lines */}
                                    <div className="flex items-center justify-center flex-col gap-1">
                                        <span className={`w-4 h-0.5 ${isDarkTheme ? 'bg-black' : 'bg-white'} transition-colors duration-300`}></span>
                                        <span className={`w-4 h-0.5 ${isDarkTheme ? 'bg-black' : 'bg-white'} transition-colors duration-300`}></span>
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                        {/* Desktop: Search, theme, and menu with background when scrolled */}
                        <motion.div
                            animate={{
                                backgroundColor: isScrolled ? (isDarkTheme ? '#333333' : '#7f7f7f') : 'transparent',
                                padding: isScrolled ? '0.2rem 0.5rem' : '0rem',
                                borderRadius: isScrolled ? '0.8rem' : '0rem',
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`hidden lg:flex items-center gap-5`}
                        >
                            <motion.div
                                animate={{ color: isScrolled ? '#ffffff' : (isDarkTheme ? '#d1d5db' : '#374151') }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Search size={22} className="cursor-pointer" />
                            </motion.div>
                            <button
                                onClick={toggleTheme}
                                className="w-4 h-8 bg-gray-400 rounded-full cursor-pointer hover:h-9 transition-all duration-300 flex items-start pt-1 pb-1 justify-center relative overflow-hidden"
                                title="Toggle Theme"
                            >
                                <div
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${isDarkTheme ? 'translate-y-3 bg-white' : 'translate-y-0 bg-black'}`}
                                ></div>
                            </button>

                            {/* Menu Button - Desktop - Only show when scrolled with smooth animation */}
                            <motion.button
                                initial={{ opacity: 0, width: 0, pointerEvents: 'none', paddingLeft: 0, paddingRight: 0 }}
                                animate={{
                                    opacity: isScrolled ? 1 : 0,
                                    width: isScrolled ? 'auto' : 0,
                                    pointerEvents: isScrolled ? 'auto' : 'none',
                                    paddingLeft: isScrolled ? '2rem' : '0',
                                    paddingRight: isScrolled ? '2rem' : '0'
                                }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                onClick={toggleMenu}
                                className={`${isDarkTheme ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} py-2.5 sm:py-3 rounded-lg cursor-pointer transition-colors duration-300 flex items-center justify-center gap-3 overflow-hidden`}
                            >
                                <span className="text-xl  whitespace-nowrap">Menu</span>
                                {/* Hamburger Icon - Two White Lines */}
                                <div className="flex items-center justify-center flex-col gap-1">
                                    <span className={`w-5 h-0.5 ${isDarkTheme ? 'bg-black' : 'bg-white'} transition-colors duration-300`}></span>
                                    <span className={`w-5 h-0.5 ${isDarkTheme ? 'bg-black' : 'bg-white'} transition-colors duration-300`}></span>
                                </div>
                            </motion.button>
                        </motion.div>
                        

                        {/* Dropdown Menu */}
                        <motion.div
                            ref={menuRef}
                            data-dropdown-menu
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{
                                opacity: isMenuOpen ? 1 : 0,
                                y: isMenuOpen ? 0 : -10,
                                scale: isMenuOpen ? 1 : 0.95,
                                pointerEvents: isMenuOpen ? 'auto' : 'none'
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className={`absolute top-full right-0 mt-2 rounded-lg shadow-xl py-2 min-w-[150px] z-80 transition-colors duration-300 ${isDarkTheme ? 'bg-[#333333]' : 'bg-[#7f7f7f]'}`}
                        >
                            <a href="#" className={`block px-4 py-2 transition-all duration-300 border-b ${isDarkTheme ? 'text-gray-200 hover:text-yellow-500 hover:bg-[#444444] hover:pl-5 border-gray-600' : 'text-white hover:text-yellow-500 hover:bg-[#666666] hover:pl-5 border-gray-500'}`}>Index</a>
                            <a href="#" className={`block px-4 py-2 transition-all duration-300 border-b ${isDarkTheme ? 'text-gray-200 hover:text-yellow-500 hover:bg-[#444444] hover:pl-5 border-gray-600' : 'text-white hover:text-yellow-500 hover:bg-[#666666] hover:pl-5 border-gray-500'}`}>News</a>
                            <a href="#" className={`block px-4 py-2 transition-all duration-300 border-b ${isDarkTheme ? 'text-gray-200 hover:text-yellow-500 hover:bg-[#444444] hover:pl-5 border-gray-600' : 'text-white hover:text-yellow-500 hover:bg-[#666666] hover:pl-5 border-gray-500'}`}>Projects</a>
                            <a href="#" className={`block px-4 py-2 transition-all duration-300 border-b ${isDarkTheme ? 'text-gray-200 hover:text-yellow-500 hover:bg-[#444444] hover:pl-5 border-gray-600' : 'text-white hover:text-yellow-500 hover:bg-[#666666] hover:pl-5 border-gray-500'}`}>Pages</a>
                            <a href="#" className={`block px-4 py-2 transition-all duration-300 border-b ${isDarkTheme ? 'text-gray-200 hover:text-yellow-500 hover:bg-[#444444] hover:pl-5 border-gray-600' : 'text-white hover:text-yellow-500 hover:bg-[#666666] hover:pl-5 border-gray-500'}`}>Shop</a>
                            <a href="#" className={`block px-4 py-2 transition-all duration-300 ${isDarkTheme ? 'text-gray-200 hover:text-white hover:bg-[#444444] hover:pl-5' : 'text-white hover:bg-[#666666] hover:pl-5'}`}>Contact</a>
                        </motion.div>
                    </div>
                </nav>

                {/* 2. Hero Section */}
                <section className="text-center sm:px-6 pt-40">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl pb-3 sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.7rem] font-bold tracking-tight sm:max-w-3xl sm:mx-auto leading-[1.1] sm:leading-[1.05] transition-all duration-300"
                    >
                        A place to display your masterpiece
                    </motion.h1>
                </section>

                {/* 3. The Overlapping Image Gallery */}
                <section className="w-full flex justify-center items-center pt-4 sm:pt-6 pb-2 sm:pb-4 px-2 sm:px-0">
                    <div className="flex items-center justify-center w-full">
                        {/* Card 1 - Right tilt, upper position */}
                        <Card
                            src={personVR}
                            alt="Card 1"
                            initialY={0}
                            rotate={5}
                            isDarkTheme={isDarkTheme}
                        />

                        {/* Card 2 - Left tilt, lower position */}
                        <Card
                            src={stoneComposition}
                            alt="Card 2"
                            initialY={-25}
                            rotate={-5}
                            isDarkTheme={isDarkTheme}
                        />

                        {/* Card 3 - Right tilt, upper position */}
                        <Card
                            src={characterJar}
                            alt="Card 3"
                            initialY={0}
                            rotate={5}
                            isDarkTheme={isDarkTheme}
                        />

                        {/* Card 4 - Left tilt, lower position */}
                        <Card
                            src={iceCream}
                            alt="Card 4"
                            initialY={-35}
                            rotate={-5}
                            isDarkTheme={isDarkTheme}
                        />

                        {/* Card 5 - Right tilt, upper position */}
                        <Card
                            src={greenCharacter}
                            alt="Card 5"
                            initialY={0}
                            rotate={5}
                            isDarkTheme={isDarkTheme}
                        />
                    </div>
                </section>

                {/* 4. Description & CTAs */}
                <section className="text-center py-4 sm:py-5 px-4 sm:px-0">
                    <p className={`w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] mx-auto ${isDarkTheme ? 'text-gray-200' : 'text-black'} text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-snug mb-4 sm:mb-5 transition-colors duration-300`}>
                        Artists can display their masterpieces, and buyers can discover and purchase works that resonate with them.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                        <button className={`${isDarkTheme ? 'bg-[#fcfcfc] text-[#1a1a1a] hover:bg-white' : 'bg-[#1a1a1a] text-white hover:bg-black'} px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base md:text-[18px] font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95`}>
                            Contact Me
                        </button>
                        <button className={`${isDarkTheme ? 'bg-[#333] text-white hover:bg-[#444]' : 'bg-[#f0f0f0] text-[#1a1a1a] hover:bg-[#e5e5e5]'} px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] text-sm sm:text-base md:text-[18px] font-bold transition-all duration-300 hover:scale-105 active:scale-95`}>
                            Discover Our Work
                        </button>
                    </div>

                    {/* Pill Tabs */}
                    <div className="mt-8 relative">
                        {/* Desktop Tabs */}
                        <div
                            className={`hidden cursor-pointer lg:flex justify-center w-[500px] mx-auto items-center ${isDarkTheme ? 'bg-[#1f2937]' : 'bg-[#e5e7eb]'
                                } rounded-2xl p-1.5`}
                        >
                            {tabs.map((tab, index) => (
                                <motion.button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    animate={{
                                        backgroundColor:
                                            activeTab === tab
                                                ? isDarkTheme
                                                    ? '#ffffff'
                                                    : '#000000'
                                                : 'transparent',
                                        color:
                                            activeTab === tab
                                                ? isDarkTheme
                                                    ? '#000000'
                                                    : '#ffffff'
                                                : isDarkTheme
                                                    ? '#9ca3af'
                                                    : '#6b7280',
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`px-5 py-2 rounded-xl cursor-pointer text-sm font-medium ${index === 0
                                            ? 'rounded-l-xl'
                                            : index === tabs.length - 1
                                                ? 'rounded-r-xl'
                                                : ''
                                        }`}
                                >
                                    {tab}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Dropdown */}
                        <div className="lg:hidden relative flex justify-center">
                            <motion.button
                                onClick={() => setIsTabsDropdownOpen(!isTabsDropdownOpen)}
                                className={`px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${isDarkTheme ? 'bg-[#1f2937]' : 'bg-[#e5e7eb]'
                                    }`}
                            >
                                {activeTab}
                                <motion.svg
                                    animate={{ rotate: isTabsDropdownOpen ? 180 : 0 }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </motion.svg>
                            </motion.button>

                            {isTabsDropdownOpen && (
                                <motion.div
                                    ref={tabsDropdownRef}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`absolute top-full mt-2 w-[180px] rounded-xl shadow-xl py-2 z-50 ${isDarkTheme ? 'bg-[#1f2937]' : 'bg-[#e5e7eb]'
                                        }`}
                                >
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => {
                                                setActiveTab(tab);
                                                setIsTabsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-black/10"
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>

                </section>

                {/* 5. Image Grid Section */}
                <section className="py-8 px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Grid with responsive columns */}
                        <div className={`grid gap-6 ${activeTab === 'All Categories'
                            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
                            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
                            }`}>
                            {/* Generate image cards based on active tab */}
                            {categoryImages[activeTab]?.map((src, index) => (
                                <div
                                    key={`${activeTab}-${index}`}
                                    className="group"
                                >
                                    {/* Image container with hover zoom effect */}
                                    <div className={`relative overflow-hidden rounded-2xl w-full aspect-[4/3] group ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                        {/* Actual image with CSS hover zoom */}
                                        <img
                                            src={src}
                                            alt={`${activeTab} work ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-40 transition-opacity duration-1000"></div>
                                    </div>
                                    {/* Text below image with justify-between - tab name on left, category label on right */}
                                    <div className="mt-3 flex justify-between items-center">
                                        <h3 className={`text-base sm:text-xl font-extrabold ${isDarkTheme ? 'text-white' : 'text-black'
                                            }`}>
                                            {categoryLabels[activeTab]?.[index]}
                                        </h3>
                                        <span className={`text-base sm:text-sm  text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                            {activeTab}
                                        </span>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="flex justify-center mt-12">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`group flex items-center gap-3 rounded-full px-12 py-4 font-bold text-lg relative overflow-hidden ${isDarkTheme ? 'bg-yellow-400 text-black' : 'bg-yellow-400 text-black'} transition-colors`}
                            >
                                {/* Load More Text - moves right on hover */}
                                <span className="group-hover:translate-x-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    Load More
                                </span>
                                {/* Dots - fades out on hover */}
                                <div className="group-hover:opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="relative w-6 h-6">
                                        {/* Top dot */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full"></div>
                                        {/* Right dot */}
                                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-current rounded-full"></div>
                                        {/* Bottom dot */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full"></div>
                                    </div>
                                </div>
                                {/* Dots copy - appears from left on hover */}
                                <div className="absolute left-12 -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="relative w-6 h-6">
                                        {/* Top dot */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full"></div>
                                        {/* Right dot */}
                                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-current rounded-full"></div>
                                        {/* Bottom dot */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full"></div>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                    </div>
                </section>

                {/* Scroll to Top Button */}
                <ScrollToTop />

                {/* Footer Ticker */}
                <footer className={`mt-12 py-20 ${isDarkTheme ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-black'} border-t border-gray-300 overflow-hidden`}>
                    <motion.ul
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                        className="flex items-center gap-8 whitespace-nowrap w-max"
                    >
                        <li className="text-4xl sm:text-7xl font-bold">Photography</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">Video Production</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">Design & Branding</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">eCommerce</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">Mobile Application</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        {/* Duplicate for seamless loop */}
                        <li className="text-4xl sm:text-7xl font-bold">Photography</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">Video Production</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">Design & Branding</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">eCommerce</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                        <li className="text-4xl sm:text-7xl font-bold">Mobile Application</li>
                        <li><img src={star} alt="Star" className="w-5 h-5 sm:w-10 sm:h-10" /></li>
                    </motion.ul>
                </footer>

            </div>
        </>
    );
};

export default Home;