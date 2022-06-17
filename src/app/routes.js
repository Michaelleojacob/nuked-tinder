import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './app';
import TestingComp from './components/testingComp';
// eslint-disable-next-line
import { app, db } from './firebase-utils/firebase';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const AppRoutes = () => {
  const initFirebaseAuth = () =>
    onAuthStateChanged(getAuth(), handleLoggedInState);

  const handleLoggedInState = () => {
    console.log('hi from routes.js');
  };

  useEffect(() => {
    initFirebaseAuth();
  });

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        {/* <Route path='/' element={<LoginPage />} /> */}
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/*' element={<TestingComp />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
