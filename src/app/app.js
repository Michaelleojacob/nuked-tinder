import DevNav from './components/devNav';
import { Link } from 'react-router-dom';
import { getUid } from './firebase-utils/auth';

const App = () => {
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>Home</div>
      <Link
        className='bg-emerald-500 hover:bg-emerald-700 text-white py-1 px-2 rounded m-1 p-1 border border-emerald-700 rounded'
        to={`/edit/${getUid()}`}>
        edit profile
      </Link>
      <Link
        className='bg-emerald-500 hover:bg-emerald-700 text-white py-1 px-2 rounded m-1 p-1 border border-emerald-700 rounded'
        to='/landing'>
        Landing page
      </Link>
    </div>
  );
};

export default App;
