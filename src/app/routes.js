// eslint-disable-next-line
import { app, auth, db } from './firebase-utils/firebase';
import App from './app';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
        <Route element={<PrivateWrapper />}>
          <Route path='/edit/:uid' element={<EditProfile />} />
        </Route>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  );
};

const PrivateWrapper = () => {
  const auth = isUserSignedIn();
  return auth ? <Outlet /> : <Navigate to='/landing' />;
};

export default AppRoutes;
