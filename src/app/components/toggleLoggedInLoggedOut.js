import { useSelector } from 'react-redux';
import { checkLocalUserSignedIn } from '../redux-store/userState';
import { authSignInUser, authSignOutUser } from '../firebase-utils/auth';

const ToggleLoggedInLoggedOut = () => {
  const isLocalUserSignedIn = useSelector(checkLocalUserSignedIn);
  return (
    <>
      {!isLocalUserSignedIn ? (
        <button
          className='bg-green-500 hover:bg-green-700 text-white py-1 px-2 m-1 p-1 border border-green-700 rounded'
          onClick={() => authSignInUser()}>
          log in
        </button>
      ) : (
        <button
          className='bg-red-500 hover:bg-red-700 text-white py-1 px-2 m-1 p-1 border border-red-700 rounded'
          onClick={() => authSignOutUser()}>
          log out
        </button>
      )}
    </>
  );
};

export default ToggleLoggedInLoggedOut;
