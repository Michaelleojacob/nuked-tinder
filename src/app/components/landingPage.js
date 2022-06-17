import { useNavigate } from 'react-router-dom';
import DevNav from './devNav';

const LandingPage = () => {
  const nav = useNavigate();

  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>from landingPage</div>
      <button
        className='bg-green-500 p-1 m-1 rounded px-1.5 py-1.5'
        onClick={() => nav('/', { replace: true })}>
        back to App
      </button>
      <div></div>
    </div>
  );
};

export default LandingPage;
