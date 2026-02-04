import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Loader from './components/common/Loader';

// Eager load only the home page for immediate display
import Home from './pages/Home';

// Lazy load all other pages for better performance
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Team = lazy(() => import('./pages/Team'));
const Careers = lazy(() => import('./pages/Careers'));

// Lazy load admin pages (loaded only when needed)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const TeamList = lazy(() => import('./pages/admin/TeamList'));
const TeamForm = lazy(() => import('./pages/admin/TeamForm'));
const PortfolioList = lazy(() => import('./pages/admin/PortfolioList'));
const PortfolioForm = lazy(() => import('./pages/admin/PortfolioForm'));
const ContactList = lazy(() => import('./pages/admin/ContactList'));
const Statistics = lazy(() => import('./pages/admin/Statistics'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const TestimonialList = lazy(() => import('./pages/admin/TestimonialList'));
const ClientList = lazy(() => import('./pages/admin/ClientList'));
const ClientForm = lazy(() => import('./pages/admin/ClientForm'));
const JobList = lazy(() => import('./pages/admin/JobList'));
const JobForm = lazy(() => import('./pages/admin/JobForm'));
const ApplicationList = lazy(() => import('./pages/admin/ApplicationList'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));

// Lazy load client pages
const TestimonialForm = lazy(() => import('./pages/client/TestimonialForm'));
const TestimonialSuccess = lazy(() => import('./pages/client/TestimonialSuccess'));
const JobApplication = lazy(() => import('./pages/JobApplication'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
    <Loader />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen flex flex-col">
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes with Header/Footer */}
            <Route path="/" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Home />
                </main>
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Services />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <main className="flex-grow">
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route path="/portfolio" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Portfolio />
                </main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="/team" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Team />
                </main>
                <Footer />
              </>
            } />
            <Route path="/careers" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Careers />
                </main>
                <Footer />
              </>
            } />
            <Route path="/careers/apply/:jobId" element={
              <>
                <Header />
                <main className="flex-grow">
                  <JobApplication />
                </main>
                <Footer />
              </>
            } />

            {/* Client routes with Header/Footer */}
            <Route path="/client/testimonial" element={
              <>
                <Header />
                <main className="flex-grow">
                  <TestimonialForm />
                </main>
                <Footer />
              </>
            } />
            <Route path="/client/testimonial-success" element={
              <>
                <Header />
                <main className="flex-grow">
                  <TestimonialSuccess />
                </main>
                <Footer />
              </>
            } />

            {/* Admin routes without Header/Footer */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="team" element={<TeamList />} />
              <Route path="team/new" element={<TeamForm />} />
              <Route path="team/edit/:id" element={<TeamForm />} />
              <Route path="portfolio" element={<PortfolioList />} />
              <Route path="portfolio/new" element={<PortfolioForm />} />
              <Route path="portfolio/edit/:id" element={<PortfolioForm />} />
              <Route path="contacts" element={<ContactList />} />
              <Route path="clients" element={<ClientList />} />
              <Route path="clients/new" element={<ClientForm />} />
              <Route path="clients/edit/:id" element={<ClientForm />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/new" element={<JobForm />} />
              <Route path="jobs/edit/:id" element={<JobForm />} />
              <Route path="applications" element={<ApplicationList />} />
              <Route path="testimonials" element={<TestimonialList />} />
              <Route path="stats" element={<Statistics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;