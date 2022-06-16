import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './app';
import LoginPage from './components/LoginPage';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AppRoutes = () => {
  const initFirebaseAuth = () => {
    onAuthStateChanged(getAuth(), authStateObserver);
  };

  const authStateObserver = (user) => {
    if (user) {
    }
  };

  return (
    <HashRouter>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
