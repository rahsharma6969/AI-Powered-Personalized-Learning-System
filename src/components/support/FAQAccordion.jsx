// src/components/support/FAQAccordion.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FAQAccordion = ({ faqs = [], className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const defaultFAQs = [
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
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked in your student dashboard. You can view detailed analytics including course completion rates, skill development, assessment scores, and time spent learning. Visual charts and progress indicators make it easy to see how far youve come.'
    },
    {
      question: 'Are the courses and assessments aligned with educational standards?',
      answer: 'Yes, all our courses and assessments are aligned with recognized educational standards, including Common Core for mathematics and Next Generation Science Standards (NGSS) for science subjects. This ensures that your learning is relevant and applicable to standardized tests and college requirements.'
    }
  ];
  
  // Use provided FAQs or fall back to defaults
  const faqsToDisplay = faqs.length > 0 ? faqs : defaultFAQs;
  
  return (
    <div className={`space-y-4 ${className}`}>
      {faqsToDisplay.map((faq, index) => (
        <div 
          key={index}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-medium text-gray-800">{faq.question}</span>
            <span className="ml-4 flex-shrink-0 text-indigo-600">
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4 text-gray-600">
                <div className="border-t border-gray-200 pt-4">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;