import { getAuthUser } from './../firebase-utils/auth';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkLocalUser,
  checkLocalUserSignedIn,
} from '../redux-store/userState';
import { signInLocalUser, signOutLocalUser } from '../redux-store/userState';
import { authSignInUser, authSignOutUser } from './../firebase-utils/auth';

const DevNav = () => {
  const dispatch = useDispatch();
  const checkUser = useSelector(checkLocalUser);
  const isLocalUserSignedIn = useSelector(checkLocalUserSignedIn);
  const handleSignIn = () => {
    dispatch(signInLocalUser());
    authSignInUser();
  };
  const handleSignOut = () => {
    dispatch(signOutLocalUser());
    authSignOutUser();
  };
  console.log(isLocalUserSignedIn);
  return (
    <div>
      <button
        className='bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded m-1 p-1 border border-orange-700 rounded'
        onClick={() => console.log(getAuthUser())}>
        fb-auth
      </button>
      <button
        className='bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded m-1 p-1 border border-orange-700 rounded'
        onClick={() => console.log(getAuthUser().currentUser)}>
        fb-currentUser
      </button>
      <button
        className='bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded m-1 p-1 border border-teal-700 rounded'
        onClick={() => console.log(checkUser)}>
        local user
      </button>

      <button
        className='bg-green-500 hover:bg-green-700 text-white py-1 px-2 m-1 p-1 border border-green-700 rounded'
        onClick={handleSignIn}>
        log in
      </button>
      <button
        className='bg-red-500 hover:bg-red-700 text-white py-1 px-2 m-1 p-1 border border-red-700 rounded'
        onClick={handleSignOut}>
        log out
      </button>
    </div>
  );
};

export default DevNav;

//rWjb0zrPlKO23wp1moQ1Wcz588s1
