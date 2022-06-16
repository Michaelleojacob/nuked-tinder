import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './app';
import LoginPage from './components/LoginPage';
import LandingPage from './components/landingPage';

const AppRoutes = () => {
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
