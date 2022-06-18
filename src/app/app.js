import DevNav from './components/devNav';
import { Link } from 'react-router-dom';
import { authSignInUser } from './firebase-utils/auth';

const App = () => {
  const handleLogin = () => {
    authSignInUser();
  };
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>Home</div>
      <button
        className='bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded m-1 p-1 border border-green-700 rounded'
        onClick={handleLogin}>
        Log in
      </button>
      <Link
        className='bg-emerald-500 hover:bg-emerald-700 text-white py-1 px-2 rounded m-1 p-1 border border-emerald-700 rounded'
        to='/landing'>
        Landing page
      </Link>
    </div>
  );
};

export default App;
