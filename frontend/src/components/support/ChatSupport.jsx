import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaTimes, FaComments } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatMessage = ({ message, isBot }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start max-w-3/4`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'
        } mr-2`}>
          {isBot ? <FaRobot /> : <FaUser />}
        </div>
        <div className={`px-4 py-2 rounded-lg ${
          isBot ? 'bg-gray-100 text-gray-700' : 'bg-indigo-600 text-white'
        }`}>
          <p className="text-sm">{message.text}</p>
          {message.time && (
            <p className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-indigo-200'}`}>
              {message.time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatSupport = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Initial bot greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            text: 'Hi there! 👋 Welcome to Learning Pathways support. How can I help you today?',
            isBot: true,
            time: formatTime()
          }
        ]);
      }, 500);
    }
  }, [isOpen, messages.length]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      isBot: false,
      time: formatTime()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Show bot typing indicator
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      
      let botResponse;
      
      // Determine bot response based on user message content
      if (newMessage.toLowerCase().includes('assessment') || newMessage.toLowerCase().includes('test')) {
        botResponse = "Our assessments are designed to evaluate your current knowledge and recommend personalized learning paths. If you're having trouble with a specific assessment, please provide more details about the issue you're experiencing.";
      } else if (newMessage.toLowerCase().includes('course') || newMessage.toLowerCase().includes('class')) {
        botResponse = "We offer a variety of courses across different subjects. Each course includes video lectures, practice exercises, and assessments. If you're looking for a specific course or having issues with course content, please let me know.";
      } else if (newMessage.toLowerCase().includes('payment') || newMessage.toLowerCase().includes('billing')) {
        botResponse = "For billing inquiries, you can view your payment history in your account settings. If you're experiencing issues with payments or have questions about pricing, I can connect you with our billing department.";
      } else if (newMessage.toLowerCase().includes('thank')) {
        botResponse = "You're welcome! I'm happy to help. Is there anything else you need assistance with?";
      } else {
        botResponse = "Thanks for your message. To better assist you, could you provide more details about your question or issue? I'm here to help with assessments, courses, technical problems, or any other questions about Learning Pathways.";
      }
      
      const botMessageObj = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        time: formatTime()
      };
      
      setMessages(prev => [...prev, botMessageObj]);
    }, 1500);
  };
  
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors"
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-96 h-96 bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-indigo-600 text-white p-4">
              <h3 className="font-medium">Learning Pathways Support</h3>
              <p className="text-xs text-indigo-200">We typically reply within minutes</p>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 h-64 overflow-y-auto">
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isBot={message.isBot} 
                />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="flex flex-row items-start max-w-3/4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-indigo-100 text-indigo-600 mr-2">
                      <FaRobot />
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-r-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatSupport;