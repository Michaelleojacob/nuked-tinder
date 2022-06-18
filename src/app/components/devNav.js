import {
  getCurrentAuthUser,
  reAuthenticate,
  deleteUser,
} from './../firebase-utils/auth';
import { useSelector } from 'react-redux';
import { checkLocalUser } from '../redux-store/userState';
import ToggleLoggedInLoggedOut from './toggleLoggedInLoggedOut';
import { authInfo } from './../firebase-utils/auth';

const DevNav = () => {
  const checkUser = useSelector(checkLocalUser);

  return (
    <div>
      <button
        className='bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded m-1 p-1 border border-orange-700 rounded'
        onClick={getCurrentAuthUser}>
        authUser
      </button>
      <button
        className='bg-amber-500 hover:bg-amber-700 text-white py-1 px-2 rounded m-1 p-1 border border-amber-700 rounded'
        onClick={() => console.log(authInfo)}>
        extraInfo
      </button>
      <button
        className='bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded m-1 p-1 border border-teal-700 rounded'
        onClick={() => console.log(checkUser)}>
        local user
      </button>
      <button
        className='bg-rose-500 hover:bg-rose-700 text-white py-1 px-2 rounded m-1 p-1 border border-rose-700 rounded'
        onClick={reAuthenticate}>
        reAuth
      </button>
      <button
        className='bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded m-1 p-1 border border-red-700 rounded'
        onClick={deleteUser}>
        deleteUser
      </button>
      <ToggleLoggedInLoggedOut />
    </div>
  );
};

export default DevNav;
