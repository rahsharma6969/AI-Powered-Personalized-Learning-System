import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Would be from auth context in a real app
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // For demo purposes - toggle login state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      navigate('/dashboard');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                LP
              </div>
              <span className="ml-2 text-xl font-bold text-indigo-600">LearningPath</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/courses') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Courses
              </Link>
              <Link 
                to="/assessment" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/assessment') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Assessment
              </Link>
              <Link 
                to="/support" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/support') 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Support
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search courses..."
                  type="search"
                />
              </div>
              
              {isLoggedIn ? (
                <div className="ml-4 relative flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <FaUserCircle className="h-6 w-6 text-indigo-600" />
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={toggleLogin}
                    className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                  >
                    (Demo: Logout)
                  </button>
                </div>
              ) : (
                <div className="ml-4 flex items-center space-x-4">
                  <button
                    onClick={toggleLogin}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/') 
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } text-base font-medium`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/courses') 
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } text-base font-medium`}
            >
              Courses
            </Link>
            <Link
              to="/assessment"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/assessment') 
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } text-base font-medium`}
            >
              Assessment
            </Link>
            <Link
              to="/support"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                isActive('/support') 
                  ? 'border-indigo-500 text-indigo-700 bg-indigo-50' 
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              } text-base font-medium`}
            >
              Support
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {isLoggedIn ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaUserCircle className="h-10 w-10 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">Student Name</div>
                      <div className="text-sm font-medium text-gray-500">student@example.com</div>
                    </div>
                  </div>
                  <button
                    onClick={toggleLogin}
                    className="text-gray-500 text-sm"
                  >
                    (Demo: Logout)
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4 w-full">
                  <button
                    onClick={toggleLogin}
                    className="flex-1 text-center py-2 px-4 border border-transparent rounded-md text-indigo-600 bg-white hover:bg-gray-50"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="flex-1 text-center py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;