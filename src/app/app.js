import DevNav from './components/devNav';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>App</div>
      <Link
        className='bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded m-1 p-1 border border-blue-700 rounded'
        to='/landing'>
        Landing page
      </Link>
    </div>
  );
};

export default App;
