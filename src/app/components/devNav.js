import { logGetAuth } from './../firebase-utils/auth';
import { useSelector } from 'react-redux';
import { checkLocalUser } from '../redux-store/userState';
import ToggleLoggedInLoggedOut from './toggleLoggedInLoggedOut';
import { Link } from 'react-router-dom';
import { getUser } from '../firebase-utils/firestoreUser';
import { checkLocalUid } from '../redux-store/userState';

const DevNav = () => {
  const checkUser = useSelector(checkLocalUser);

  const userUid = useSelector(checkLocalUid);

  const handleCheckFbUser = async () => {
    const user = await getUser(userUid);
    console.log(user);
  };

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
        localUser
      </button>
      <button
        className='bg-amber-500 hover:bg-amber-700 text-white py-1 px-2 rounded m-1 p-1 border border-amber-700 rounded'
        onClick={() => handleCheckFbUser()}>
        fbUser
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
