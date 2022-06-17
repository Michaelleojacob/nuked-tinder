// eslint-disable-next-line
import { app, db } from './firebase-utils/firebase';
import App from './app';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { updateBasedOnAuth } from './redux-store/userState';
import { isUserSignedIn } from './firebase-utils/auth';
import { useDispatch } from 'react-redux';

const AppRoutes = () => {
  const dispatch = useDispatch();
  const initFirebaseAuth = () =>
    onAuthStateChanged(getAuth(), handleLoggedInState);

  const handleLoggedInState = () => {
    console.log('this ran');
    dispatch(updateBasedOnAuth(isUserSignedIn()));
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
