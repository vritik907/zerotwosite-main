import {BrowserRouter ,Routes,Route , useLocation} from "react-router-dom"
import { useEffect } from "react";
// ---------importing componenets -------
import Header from './components/Header';
import Footer from './components/Footer';
// ------imprting pages ------
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import BlogsPage from './pages/BlogsPage';
import ContactUsPage from './pages/ContactUsPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DownloadPage from './pages/DownloadPage'
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import {NotificationContainer} from 'react-notifications';
import ReactGA from "react-ga4";
// -------import styles ------
import "./styles/Global.css"
// external libs css 
import 'react-notifications/lib/notifications.css';


ReactGA.initialize("G-LHW3MYM0FD");

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

function App() {
  return (
    <BrowserRouter> 
    <NotificationContainer/>
    <ScrollToTop>
    <Header />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/:id/download/:fileid/:filename" element={<DownloadPage/>} />
          <Route path="/:id/download/:fileid" element={<DownloadPage/>} />

    </Routes>
    <Footer />
    </ScrollToTop>
  </BrowserRouter>
  );
}

export default App;
