// eslint-disable-next-line
import { app, auth, db } from './firebase-utils/firebase';
import App from './app';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { updateBasedOnAuth, updateUid } from './redux-store/userState';
import { isUserSignedIn, getUid } from './firebase-utils/auth';
import { useDispatch } from 'react-redux';
import EditProfile from './components/editProfile';

const AppRoutes = () => {
  const [authState, setAuthState] = useState(isUserSignedIn());
  const dispatch = useDispatch();

  const handleLoggedInState = () => {
    dispatch(updateBasedOnAuth(isUserSignedIn()));
    dispatch(updateUid(getUid()));
    setAuthState(isUserSignedIn());
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), () => {
      handleLoggedInState();
    });
    return () => unSubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route element={<PrivateWrapper authState={authState} />}>
          <Route path='/edit/:uid' element={<EditProfile />} />
        </Route>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  );
};

const PrivateWrapper = ({ authState }) => {
  return authState ? <Outlet /> : <Navigate to='/landing' />;
};

export default AppRoutes;

/**
 * todo
 *
 * get user data from backend on log in
 * set state from user data on log in
 * decide if I need to update the user info on each page that loads
 * IE -> edit profile loads, do I do another data fetch
 */
