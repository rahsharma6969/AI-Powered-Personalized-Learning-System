import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin";  // Import AdminContext
import useAuth from "../../hooks/useAuth";  // User authentication context

const Navbar = () => {
  const { user, logout } = useAuth();  // User authentication context
  const { admin, isAdmin } = useAdmin();  // Admin context to check if the user is an admin
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  console.log(admin, user);  // Debug: check admin and user states
  
  // Function to get user initials for the profile avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
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
              {['/', '/courses', '/assessment', '/support'].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive(path) ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
              
              {/* Conditionally render admin links */}
              {isAdmin && (
                <>
                  <Link to="/add-assessment" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Add Assessment
                  </Link>
                  <Link to="/add-course" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Add Course
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Show login and signup only if no user or admin is logged in */}
            {user || isAdmin ? (
              <div className="ml-4 flex items-center space-x-4">
                {/* Dashboard link - visible when user is logged in */}
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium ${isActive('/dashboard') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  Dashboard
                </Link>
                
                {/* Profile dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} 
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      {getUserInitials()}
                    </div>
                    <span className="text-gray-700">{user?.name || 'User'}</span>
                  </button>
                  
                  {/* Dropdown menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-4">
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Log In
                </Link>
                <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;