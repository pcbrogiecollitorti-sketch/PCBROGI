import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrganicShape from './components/OrganicShape'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function HeroContent({ mousePosition }) {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    tl.from(titleRef.current, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      stagger: 0.2
    })
    .from(subtitleRef.current, {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    }, '-=1')
    .from(buttonRef.current, {
      duration: 1,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.7)'
    }, '-=0.8')

    return () => tl.kill()
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
      <h1 
        ref={titleRef}
        className="text-6xl md:text-9xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center"
      >
        PCBROGI
      </h1>
      <p 
        ref={subtitleRef}
        className="text-xl md:text-2xl text-gray-300 max-w-3xl text-center leading-relaxed"
      >
        Esperienze digitali immersive con grafica 3D WebGL e animazioni stile Awwwards
      </p>
      
      <motion.a
        ref={buttonRef}
        href="#about"
        className="mt-10 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Scopri di più
      </motion.a>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  )
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section with 3D Background */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <OrganicShape mousePosition={mousePosition} />
            </Float>
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Hero Content */}
        <HeroContent mousePosition={mousePosition} />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 PCBROGI. All rights reserved. Crafted with ❤️ using Three.js & React
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
