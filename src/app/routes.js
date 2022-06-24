// eslint-disable-next-line
import { app, db } from './firebase-utils/firebase';
import App from './app';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { updateBasedOnAuth, updateUid } from './redux-store/userState';
import { isUserSignedIn, getUid } from './firebase-utils/auth';
import { useDispatch } from 'react-redux';
import EditProfile from './components/editProfile';

const AppRoutes = () => {
  const dispatch = useDispatch();

  const handleLoggedInState = () => {
    dispatch(updateBasedOnAuth(isUserSignedIn()));
    dispatch(updateUid(getUid()));
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), () => {
      isUserSignedIn() ? handleLoggedInState() : handleLoggedInState();
    });
    return () => unSubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/edit/:uid' element={<EditProfile />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
