// eslint-disable-next-line
import { app, db } from './firebase-utils/firebase';
import App from './app';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const AppRoutes = () => {
  const initFirebaseAuth = () =>
    onAuthStateChanged(getAuth(), handleLoggedInState);

  const handleLoggedInState = () => {
    getAuth().currentUser === null
      ? console.log('signed out')
      : console.log('signed in');
  };

  useEffect(() => {
    initFirebaseAuth();
  });

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
