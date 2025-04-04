import React, { useState } from 'react';
import { FaSearch, FaHeadset, FaBook, FaChalkboardTeacher, FaCommentDots, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FAQAccordion from '../components/support/FAQAccordion';
import SupportForm from '../components/support/SupportForm';
import ChatSupport from '../components/support/ChatSupport';

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Support categories
  const categories = [
    { id: 'all', label: 'All Categories', icon: <FaQuestionCircle /> },
    { id: 'account', label: 'Account & Login', icon: <FaUser /> },
    { id: 'courses', label: 'Courses & Content', icon: <FaBook /> },
    { id: 'assessments', label: 'Assessments', icon: <FaChalkboardTeacher /> },
    { id: 'technical', label: 'Technical Issues', icon: <FaLaptop /> },
    { id: 'billing', label: 'Billing & Payment', icon: <FaCreditCard /> }
  ];
  
  // Sample FAQ data by category
  const faqData = {
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'To reset your password, click the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password. Make sure to check your spam folder if you don\'t see the email in your inbox.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'You can update your profile information by going to your Dashboard, clicking on your profile icon in the top right corner, and selecting "Profile Settings". From there, you can edit your personal information, academic details, and preferences.'
      },
      {
        question: 'Can I have multiple accounts?',
        answer: 'We recommend having only one account per user to ensure the best personalized learning experience. Your learning progress, assessments, and recommendations are tied to your account. If you have multiple accounts, your data will be fragmented across them.'
      }
    ],
    courses: [
      {
        question: 'How do I enroll in a course?',
        answer: 'To enroll in a course, browse the course catalog, select the course you want to take, and click the "Enroll" or "Buy Now" button. If it\'s a free course, you\'ll get immediate access. For paid courses, you\'ll need to complete the payment process first.'
      },
      {
        question: 'Can I download course materials for offline use?',
        answer: 'Yes, many of our courses offer downloadable resources such as PDFs, worksheets, and practice problems. Look for the download icon next to course materials. However, video content is typically only available for streaming while online.'
      },
      {
        question: 'What happens if I don\'t complete a course on time?',
        answer: 'Our courses are self-paced, so there are no strict deadlines. You can access the course materials for as long as your account is active. We encourage setting your own schedule to stay on track with your learning goals.'
      }
    ],
    assessments: [
      {
        question: 'How does the assessment system work?',
        answer: 'Our assessment system uses adaptive testing technology that adjusts the difficulty of questions based on your performance. The pre-assessment evaluates your current understanding and identifies areas for improvement, while the post-assessment measures your progress after completing recommended courses.'
      },
      {
        question: 'Can I retake assessments?',
        answer: 'Yes, you can retake assessments as many times as you like. We recommend waiting at least a week between retakes to give yourself time to study and improve. Each retake will generate a new set of questions to provide a fresh evaluation.'
      },
      {
        question: 'How are learning pathways personalized?',
        answer: 'Learning pathways are personalized based on your assessment results, learning preferences, academic goals, and previous learning history. Our AI system analyzes this data to recommend courses, resources, and practice materials tailored specifically to your needs.'
      }
    ],
    technical: [
      {
        question: 'What browsers are supported?',
        answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using Chrome or Firefox. Make sure your browser is updated to the latest version to avoid any compatibility issues.'
      },
      {
        question: 'Videos won\'t play or are buffering constantly',
        answer: 'If you\'re experiencing video playback issues, try: 1) Refreshing the page, 2) Checking your internet connection, 3) Lowering the video quality setting, 4) Clearing your browser cache, or 5) Trying a different browser. If problems persist, please contact our support team.'
      },
      {
        question: 'How do I enable notifications?',
        answer: 'To enable notifications, go to your Profile Settings and navigate to the Notifications tab. You can choose to receive notifications via email, SMS, or both. Make sure to also allow browser notifications if you want to receive alerts while using the platform.'
      }
    ],
    billing: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and bank transfers for certain plans. Payment options may vary by country. All payments are securely processed and your financial information is never stored on our servers.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'To cancel your subscription, go to Profile Settings > Billing & Subscriptions > Current Plan, and click "Cancel Subscription". You\'ll have access to your premium features until the end of your current billing period. We don\'t offer refunds for partial months.'
      },
      {
        question: 'Are there any student discounts available?',
        answer: 'Yes, we offer special discounts for students with a valid .edu email address or international equivalent. We also have discounts for schools and educational institutions purchasing multiple licenses. Contact our sales team for more information on institutional pricing.'
      }
    ]
  };
  
  // All FAQs in one array
  const allFaqs = Object.values(faqData).flat();
  
  // Filter FAQs based on active category and search term
  const getFilteredFaqs = () => {
    let filtered = activeCategory === 'all' ? allFaqs : faqData[activeCategory] || [];
    
    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const handleSupportFormSubmit = (formData) => {
    console.log('Support form submitted', formData);
    // In a real app, you would send this to your backend
    // For now, we'll just log it
  };
  
  const filteredFaqs = getFilteredFaqs();
  
  // Missing icon components
  const FaUser = () => (
    <svg viewBox="0 0 448 512" className="h-5 w-5" fill="currentColor">
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
    </svg>
  );
  
  const FaLaptop = () => (
    <svg viewBox="0 0 640 512" className="h-5 w-5" fill="currentColor">
      <path d="M624 416H381.54c-.74 19.81-14.71 32-32.74 32H288c-18.69 0-33.02-17.47-32.77-32H16c-8.8 0-16 7.2-16 16v16c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v-16c0-8.8-7.2-16-16-16zM576 48c0-26.4-21.6-48-48-48H112C85.6 0 64 21.6 64 48v336h512V48zm-64 272H128V64h384v256z" />
    </svg>
  );
  
  const FaCreditCard = () => (
    <svg viewBox="0 0 576 512" className="h-5 w-5" fill="currentColor">
      <path d="M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z" />
    </svg>
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How Can We Help You?
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find answers to common questions or contact our support team for personalized assistance.
          </motion.p>
          
          <motion.div 
            className="mt-6 max-w-xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full bg-white pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Support Categories */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`p-4 text-center rounded-lg transition-all ${
                activeCategory === category.id
                  ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="mx-auto w-10 h-10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs Section - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                <p className="text-gray-600 mb-6">
                  Browse our most common questions and answers
                </p>
                
                {filteredFaqs.length > 0 ? (
                  <FAQAccordion faqs={filteredFaqs} />
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaSearch className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No results found</h3>
                    <p className="mt-2 text-gray-500 max-w-md mx-auto">
                      We couldn't find any FAQ that matches your search. Try using different keywords or browse all categories.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                      }}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                    >
                      View all FAQs
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white rounded-full text-indigo-600 mr-4">
                      <FaHeadset className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Live Chat Support</h3>
                  </div>
                  <p className="mb-4">
                    Need immediate assistance? Our support team is available to help you via live chat.
                  </p>
                  <button className="w-full bg-white text-indigo-700 hover:bg-indigo-50 py-2 px-4 rounded-lg font-medium transition-colors">
                    Start Chat
                  </button>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white rounded-full text-purple-600 mr-4">
                      <FaCommentDots className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Video Tutorials</h3>
                  </div>
                  <p className="mb-4">
                    Watch our tutorial videos to learn how to use platform features effectively.
                  </p>
                  <button className="w-full bg-white text-purple-700 hover:bg-purple-50 py-2 px-4 rounded-lg font-medium transition-colors">
                    Watch Tutorials
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Contact Form - 1/3 width on large screens */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <SupportForm onSubmit={handleSupportFormSubmit} />
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Chat Support Widget */}
      <ChatSupport />
    </div>
  );
};

export default SupportPage;