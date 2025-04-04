import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLaptopCode, FaBrain, FaChartLine, FaGraduationCap, FaUsers } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const featureCardVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {/* Background pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px',
          }} />
        </div>
        
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 mb-16 md:mb-0 md:pr-16"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Start Upskilling With Our 
              <span className="text-yellow-300 block mt-2">
                <span className="text-pink-300">&lt;</span>
                POWERFUL
                <span className="text-pink-300">/&gt;</span>
              </span> 
              Learning Pathways
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Personalized learning experiences based on your aptitude. Get recommendations for resources you need to master and practice to excel in your studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/assessment')}
                className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold flex items-center justify-center"
              >
                Take Free Assessment
                <FaArrowRight className="ml-2" />
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Explore Courses
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative z-10">
              <img 
                src="https://placehold.co/600x400/indigo/white?text=Dashboard+Preview" 
                alt="Student Dashboard Preview" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 p-4 rounded-lg shadow-lg">
                <div className="text-indigo-900 font-bold">
                  <span className="block text-sm">Personalized</span>
                  <span className="text-2xl">AI Powered</span>
                </div>
              </div>
            </div>
            
            {/* Floating icons */}
            <motion.div 
              className="absolute -top-10 -left-10 bg-pink-500 p-4 rounded-full shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <FaBrain size={30} className="text-white" />
            </motion.div>
            
            <motion.div 
              className="absolute top-1/2 -right-8 bg-green-500 p-4 rounded-full shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 3.5, 
                repeat: Infinity,
                repeatType: "reverse", 
                delay: 0.5 
              }}
            >
              <FaChartLine size={30} className="text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Our Platform Helps You Succeed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform analyzes your strengths and areas for improvement to create a personalized learning journey
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLaptopCode size={40} className="text-indigo-500" />,
                title: "Personalized Assessment",
                description: "Take our pre and post assessments to understand your strengths and areas for improvement"
              },
              {
                icon: <FaBrain size={40} className="text-pink-500" />,
                title: "AI-Powered Recommendations",
                description: "Get custom learning resources and practice materials based on your assessment results"
              },
              {
                icon: <FaChartLine size={40} className="text-green-500" />,
                title: "Track Your Progress",
                description: "Visualize your growth with interactive dashboards and analytics"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all"
                variants={featureCardVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <FaGraduationCap />, value: "95%", label: "Student Satisfaction" },
              { icon: <FaUsers />, value: "10,000+", label: "Active Students" },
              { icon: <FaLaptopCode />, value: "500+", label: "Courses" },
              { icon: <FaChartLine />, value: "87%", label: "Improvement Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="p-6 bg-gray-50 rounded-xl"
              >
                <div className="text-indigo-600 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-900 text-white py-16">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
            Create your personalized learning pathway today and take the first step toward academic excellence
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-10 py-4 rounded-lg font-bold text-lg transform transition hover:scale-105"
          >
            Get Started Now
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;