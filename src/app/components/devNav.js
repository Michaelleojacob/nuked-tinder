import { logGetAuth } from './../firebase-utils/auth';
import { useSelector } from 'react-redux';
import { checkLocalUser } from '../redux-store/userState';
import ToggleLoggedInLoggedOut from './toggleLoggedInLoggedOut';
import { Link } from 'react-router-dom';

const DevNav = () => {
  const checkUser = useSelector(checkLocalUser);
  return (
    <div>
      <button
        className='bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded m-1 p-1 border border-orange-700 rounded'
        onClick={logGetAuth}>
        authUser
      </button>
      <button
        className='bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded m-1 p-1 border border-teal-700 rounded'
        onClick={() => console.log(checkUser)}>
        local user
      </button>
      <Link
        className='bg-emerald-500 hover:bg-emerald-700 text-white py-1 px-2 rounded m-1 p-1 border border-emerald-700 rounded'
        to={'/'}>
        home
      </Link>
      <ToggleLoggedInLoggedOut />
    </div>
  );
};

export default DevNav;
