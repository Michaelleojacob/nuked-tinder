import { signInUser, signOutUser } from './redux-store/userState';
import { authSignInUser, authSignOutUser } from './firebase-utils/auth';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import DevNav from './components/devNav';

const App = () => {
  const dispatch = useDispatch();
  // const nav = useNavigate();

  const handleSignIn = () => {
    dispatch(signInUser());
    authSignInUser();
  };
  const handleSignOut = () => {
    dispatch(signOutUser());
    authSignOutUser();
  };

  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>App</div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-1 p-1 border border-blue-700 rounded'
        onClick={handleSignIn}>
        log in
      </button>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-1 p-1 border border-blue-700 rounded'
        onClick={handleSignOut}>
        log out
      </button>
    </div>
  );
};

export default App;
