import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './app';
import TestingComp from './components/testingComp';
import { app, db } from './firebase-utils/firebase';

const AppRoutes = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        {/* <Route path='/' element={<LoginPage />} /> */}
        {/* <Route path='/landing' element={<LandingPage />} /> */}
        <Route path='/*' element={<TestingComp />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
