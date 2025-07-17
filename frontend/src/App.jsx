import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext.jsx";
import useAuth from "./hooks/useAuth.js";
import { useAdmin } from "./hooks/useAdmin.js";

// Common components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import DetailedReportPage from "./components/dashboard/DetailedReport.jsx";
import AssessmentReportsList from "./components/dashboard/AssessmentReportList.jsx";
import AssessmentList from "./components/dashboard/AssessmentList.jsx";
// import CourseDetailsPage from "./pages/CourseDetailPage";
import AdminPanelPage from "./pages/AdminPanel.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseContentPage = lazy(() => import("./pages/CourseContentPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PreAssessmentPage = lazy(() => import("./pages/PreAssessmentPage"));
const AssessmentPage = lazy(() => import("./pages/AssessmentPage"));

const SupportPage = lazy(() => import("./pages/SupportPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const StartAssessPage = lazy(() => import("./pages/StartAssessPage.jsx"));
const AssessmentResultsPage = lazy(() =>
  import("./pages/AssessmentResultsPage.jsx")
);
const AddCourse = lazy(() => import("./pages/AddCourse.jsx"));
const TestGenerator = lazy(() => import("./pages/TestGeneratorInterface.jsx"));

// Protected route component
export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading: userLoading } = useAuth();
  const { admin, loading: adminLoading } = useAdmin();

  // Show loading while checking authentication
  if (userLoading || adminLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // If requireAdmin is true, only allow admins
  if (requireAdmin && !admin) {
    return <Navigate to="/adminLogin" replace />;
  }

  // If not requiring admin specifically, allow either user or admin
  if (!user && !admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const MainLayout = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      {!hideFooter && <Footer />}
    </div>
  );
};

function App() {
  // App-wide initialization
  useEffect(() => {
    // Set document title
    document.title = "Learning Pathways - Personalized Education";

    // Handle online/offline status
    const handleOnlineStatus = () => {
      console.log(navigator.onLine ? "Back online" : "Offline");
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <Router>
      <AdminProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/courses"
                element={
                  <MainLayout>
                    <CoursesPage />
                  </MainLayout>
                }
              />
              <Route
                path="/course/:courseId"
                element={<CourseContentPage />}
              />

              <Route
                path="/assessment"
                element={
                  <MainLayout>
                    <AssessmentPage />
                  </MainLayout>
                }
              />
              <Route
                path="/assessment/:sub"
                element={
                  <MainLayout>
                    <StartAssessPage />
                  </MainLayout>
                }
              />
              <Route
                path="/assessment/:sub/results"
                element={
                  <MainLayout>
                    <AssessmentResultsPage />
                  </MainLayout>
                }
              />
              <Route
                path="/support"
                element={
                  <MainLayout>
                    <SupportPage />
                  </MainLayout>
                }
              />
              <Route
                path="/shop"
                element={
                  <MainLayout>
                    <ShopPage />
                  </MainLayout>
                }
              />
              
              <Route
                path="/adminLogin"
                element={
                  <MainLayout>
                    <AdminLogin />
                  </MainLayout>
                }
              />

              {/* Admin-only routes */}
              <Route
                path="/add-course"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    {/* <MainLayout> */}
                      <AddCourse />
                    {/* </MainLayout> */}
                  </ProtectedRoute>
                }
              />

              <Route
                path="/test-generator"
                element={
                  <ProtectedRoute >
                    <MainLayout>
                      <TestGenerator />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/adminPanel"
                element={
                  <ProtectedRoute>
                    {/* <MainLayout> */}
                      <AdminPanelPage />
                    {/* </MainLayout> */}
                  </ProtectedRoute>
                }
              />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MainLayout hideFooter>
                      <DashboardPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ProfilePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessment/pre"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <PreAssessmentPage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              

              <Route path="/assessments" element={<AssessmentList />} />

              <Route
                path="/assessment/reports/:reportId"
                element={<DetailedReportPage />}
              />

              <Route path="/reports" element={<AssessmentReportsList />} />

              {/* Catch all - 404 page */}
              <Route
                path="*"
                element={
                  <MainLayout>
                    <div className="container mx-auto px-4 py-16 text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        404 - Page Not Found
                      </h1>
                      <p className="text-lg text-gray-600 mb-8">
                        The page you are looking for might have been removed,
                        had its name changed, or is temporarily unavailable.
                      </p>
                      <button
                        onClick={() => window.history.back()}
                        className="mr-4 px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        Go Back
                      </button>
                      <a
                        href="/"
                        className="px-6 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                      >
                        Go Home
                      </a>
                    </div>
                  </MainLayout>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;