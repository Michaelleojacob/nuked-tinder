import DevNav from './devNav';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>Landing</div>
      <Link
        className='bg-emerald-500 hover:bg-emerald-700 text-white py-1 px-2 rounded m-1 p-1 border border-emerald-700 rounded'
        to='/'>
        Home
      </Link>
    </div>
  );
};

export default LandingPage;
