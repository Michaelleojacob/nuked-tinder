// import { Outlet } from 'react-router-dom';
import {
  currentUserStatus,
  signInUser,
  signOutUser,
} from './redux-store/userState';
import {
  authSignInUser,
  authSignOutUser,
  isUserSignedIn,
} from './firebase-utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import store from './redux-store/redux-store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const App = () => {
  const checkUser = useSelector(currentUserStatus);
  const [userState, setUserState] = useState(checkUser);
  const dispatch = useDispatch();

  const handleCheckUserData = () => {
    console.log(checkUser);
  };

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

  const handleCheckLocalState = () => console.log(userState);

  const handleCheckFirebaseAuth = () => console.log(isUserSignedIn());

  const initFirebaseAuth = () => onAuthStateChanged(getAuth(), test);

  const test = (thing) => {
    return console.log(isUserSignedIn());
  };

  useEffect(() => {
    setUserState(isUserSignedIn());
    initFirebaseAuth();
  }, []);

  return (
    <div>
      <div>hi from app</div>
      <div>
        <button onClick={handleCheckLocalState}>check local user state</button>
      </div>
      <div>
        <button onClick={handleCheckFirebaseAuth}>check firebase auth</button>
      </div>
      {!userState ? (
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
        <button onClick={handleCheckUserData}>check user</button>
      </div>
      <div>
        <button onClick={handleCheckStore}>check store</button>
      </div>
      {/* <Outlet context={{ checkUserData }} /> */}
    </div>
  );
};

export default App;
