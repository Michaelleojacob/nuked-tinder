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
  isUserSignedIn,
} from './firebase-utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import store from './redux-store/redux-store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const App = () => {
  const checkUser = useSelector(currentUserStatus);
  const dispatch = useDispatch();

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

  const initFirebaseAuth = () => onAuthStateChanged(getAuth(), test);

  const test = (thing) => {
    console.log(thing);
    const checkStatus = isUserSignedIn();
    dispatch(updateBasedOnAuth(checkStatus));
    return console.log(isUserSignedIn());
  };

  const superCheck = () => {
    console.log(`checkUser: ${checkUser}, isUserSignedIn: ${isUserSignedIn()}`);
  };

  useEffect(() => {
    initFirebaseAuth();
    const status = isUserSignedIn();
    console.log(status);
  }, []);

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
      {/* <Outlet context={{ checkUserData }} /> */}
    </div>
  );
};

export default App;
