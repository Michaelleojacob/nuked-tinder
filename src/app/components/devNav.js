import { getAuthUser } from './../firebase-utils/auth';
import { useSelector } from 'react-redux';
import { checkLocalUser } from '../redux-store/userState';
import ToggleLoggedInLoggedOut from './toggleLoggedInLoggedOut';

const DevNav = () => {
  const checkUser = useSelector(checkLocalUser);

  return (
    <div>
      <button
        className='bg-orange-500 hover:bg-orange-700 text-white py-1 px-2 rounded m-1 p-1 border border-orange-700 rounded'
        onClick={() => console.log(getAuthUser())}>
        fb-auth
      </button>
      <button
        className='bg-amber-500 hover:bg-amber-700 text-white py-1 px-2 rounded m-1 p-1 border border-amber-700 rounded'
        onClick={() => console.log(getAuthUser().currentUser)}>
        fb-currentUser
      </button>
      <button
        className='bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded m-1 p-1 border border-teal-700 rounded'
        onClick={() => console.log(checkUser)}>
        local user
      </button>
      <ToggleLoggedInLoggedOut />
    </div>
  );
};

export default DevNav;
