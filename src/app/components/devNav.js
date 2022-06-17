import { getAuthUser } from './../firebase-utils/auth';
import { useSelector } from 'react-redux';
import { currentUserStatus } from '../redux-store/userState';

const DevNav = () => {
  const checkLocalUser = useSelector(currentUserStatus);
  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 p-1'
        onClick={() => console.log(getAuthUser())}>
        fb-auth
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 p-1'
        onClick={() => console.log(getAuthUser().currentUser)}>
        fb-currentUser
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 p-1'
        onClick={() => console.log(checkLocalUser)}>
        local user
      </button>
      {/* <button onClick={}></button> */}
    </div>
  );
};

export default DevNav;

//rWjb0zrPlKO23wp1moQ1Wcz588s1
