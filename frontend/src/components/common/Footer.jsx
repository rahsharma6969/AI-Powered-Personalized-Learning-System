import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Learning Pathways</h2>
            <p className="text-gray-300 text-sm">
              Personalized learning experiences based on pre and post aptitude tests 
              to help students excel in their academic journey.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white">Courses</Link>
              </li>
              <li>
                <Link to="/assessment" className="text-gray-300 hover:text-white">Assessment</Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-white">Support</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Community</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@learningpathways.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Education St, Learning City</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Learning Pathways. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;