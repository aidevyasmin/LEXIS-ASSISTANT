import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Consultation from './pages/Consultation';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register'; // <-- Naya Import
import Dashboard from './pages/Dashboard';
import CaseManagement from './pages/CaseManagement';
import LegalAssistant from './pages/LegalAssistant';
import Notepad from './pages/Notepad';
import LawLibrary from './pages/LawLibrary';
import DocumentGenerator from './pages/DocumentGenerator';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="consultation" element={<Consultation />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> {/* <-- Register Route Add Ho Gaya */}

          {/* Protected Routes (Inke liye Login hona zaroori hai) */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cases" element={<CaseManagement />} />
            <Route path="ai-assistant" element={<LegalAssistant />} />
            <Route path="notes" element={<Notepad />} />
            <Route path="library" element={<LawLibrary />} />
            <Route path="client-dashboard" element={<ClientDashboard />} />
            <Route path="document-generator" element={<DocumentGenerator />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
