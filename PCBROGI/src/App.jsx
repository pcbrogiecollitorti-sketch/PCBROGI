import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function RotatingCube() {
  const meshRef = useRef()
  
  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

function App() {
  useEffect(() => {
    gsap.from('.hero-title', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out'
    })
    
    gsap.from('.hero-subtitle', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      delay: 0.5,
      ease: 'power4.out'
    })
  }, [])

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <RotatingCube />
          <OrbitControls enableZoom={false} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center h-full text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          PCBROGI
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-2xl text-center px-4">
          Esperienze digitali immersive con grafica 3D WebGL e animazioni stile Awwwards
        </p>
        
        <motion.button
          className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Scopri di più
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎨', title: 'Design Moderno', desc: 'UI/UX all\'avanguardia' },
            { icon: '⚡', title: 'Performance', desc: 'Ottimizzato per il web' },
            { icon: '🌐', title: '3D WebGL', desc: 'Grafica immersiva' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.2 }}
              whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
