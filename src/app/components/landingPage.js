import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from './../redux-store/userState';
import { authSignOutUser } from './../firebase-utils/auth';

const LandingPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOutUser);
    authSignOutUser();
    nav('/', { replace: true });
  };

  return (
    <div>
      <div>from landingPage</div>
      <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded'
        onClick={() => nav('/', { replace: true })}>
        back to App
      </button>
      <div>
        <button className='bg-red-500 p-2 m-2' onClick={handleLogOut}>
          log out
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
