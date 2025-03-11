import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* These routes will be added as we implement more pages */}
            <Route path="/courses" element={<div className="p-8 text-center">Courses Page - Coming Soon</div>} />
            <Route path="/assessment" element={<div className="p-8 text-center">Assessment Page - Coming Soon</div>} />
            <Route path="/support" element={<div className="p-8 text-center">Support Page - Coming Soon</div>} />
            <Route path="/profile" element={<div className="p-8 text-center">Profile Page - Coming Soon</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
