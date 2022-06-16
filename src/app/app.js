// import { Outlet } from 'react-router-dom';
import { currentUserStatus, signInUser } from './redux-store/userState';
import { useSelector, useDispatch } from 'react-redux';
import store from './redux-store/redux-store';

const App = () => {
  const checkUser = useSelector(currentUserStatus);
  const dispatch = useDispatch();

  const handleCheckUserData = () => {
    console.log(checkUser);
  };

  const handleCheckStore = () => {
    console.log(store.getState());
  };

  return (
    <div>
      <div>hi from app</div>
      <div>
        <button onClick={() => dispatch(signInUser())}>log in</button>
      </div>
      <div>
        <button onClick={handleCheckUserData}>check user</button>
      </div>
      <div>
        <button onClick={handleCheckStore}>check store</button>
      </div>
      {/* <Outlet context={{ checkUserData }} /> */}
    </div>
  );
};

export default App;
