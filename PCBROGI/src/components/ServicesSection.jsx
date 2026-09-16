import { motion } from 'framer-motion'

export default function ServicesSection() {
  const services = [
    {
      icon: '🎨',
      title: '3D Web Design',
      description: 'Immersive 3D experiences using Three.js and WebGL that captivate your audience.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Lightning-fast load times and smooth 60fps animations for seamless user experience.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📱',
      title: 'Responsive Development',
      description: 'Pixel-perfect designs that adapt beautifully to any device or screen size.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🌟',
      title: 'Awwwards-Style Animations',
      description: 'Award-winning micro-interactions and scroll animations that tell your story.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: '🔧',
      title: 'Custom Solutions',
      description: 'Tailored web applications built with modern technologies and best practices.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🚀',
      title: 'SEO & Analytics',
      description: 'Search engine optimized sites with integrated analytics for data-driven decisions.',
      gradient: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <section id="services" className="min-h-screen py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We offer comprehensive digital solutions to elevate your brand and engage your audience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.3)'
              }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 transition-all cursor-pointer group"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg`}
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {service.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
