import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from './../redux-store/userState';
import { authSignOutUser } from './../firebase-utils/auth';
import DevNav from './devNav';

const LandingPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(signOutUser);
    await authSignOutUser();
    return nav('/', { replace: true });
  };

  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>from landingPage</div>
      <button
        className='bg-green-500 p-1 m-1 rounded px-1.5 py-1.5'
        onClick={() => nav('/', { replace: true })}>
        back to App
      </button>
      <div>
        <button
          className='bg-red-500 p-1 m-1 rounded px-1.5 py-1.5'
          onClick={handleLogOut}>
          log out
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
