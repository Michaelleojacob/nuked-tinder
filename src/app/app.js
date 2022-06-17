// import { Outlet } from 'react-router-dom';
import {
  currentUserStatus,
  signInUser,
  signOutUser,
  updateBasedOnAuth,
} from './redux-store/userState';
import {
  authSignInUser,
  authSignOutUser,
  getAuthUser,
  isUserSignedIn,
} from './firebase-utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import store from './redux-store/redux-store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const checkUser = useSelector(currentUserStatus);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleCheckStore = () => {
    console.log(store.getState());
  };

  const handleSignIn = () => {
    dispatch(signInUser());
    authSignInUser();
  };
  const handleSignOut = () => {
    dispatch(signOutUser());
    authSignOutUser();
  };

  const initFirebaseAuth = () => onAuthStateChanged(getAuth(), updateStatus);

  const updateStatus = (thing) => {
    const checkStatus = isUserSignedIn();
    return dispatch(updateBasedOnAuth(checkStatus));
  };

  const superCheck = () => {
    console.log(`checkUser: ${checkUser}, isUserSignedIn: ${isUserSignedIn()}`);
  };

  useEffect(() => {
    initFirebaseAuth();
    const status = isUserSignedIn();
    // if (status) {
    //   return nav('/landing', { replace: true });
    // }
  });

  return (
    <div>
      <div>hi from app</div>
      <div>
        <button onClick={superCheck}>superCheck</button>
      </div>

      {!checkUser ? (
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
            onClick={handleSignIn}>
            log in
          </button>
        </div>
      ) : (
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
            onClick={handleSignOut}>
            log out
          </button>
        </div>
      )}

      <div>
        <button onClick={handleCheckStore}>check store</button>
      </div>
      <div>
        <button onClick={() => console.log(getAuthUser())}>
          check getAuth
        </button>
      </div>
    </div>
  );
};

export default App;
