import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser, updateDynamic } from '../redux-store/userState';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  return (
    <div>
      <DevNav />
      <div>EditProfile</div>
      <FormComp label={'first'} state={user.first} />
      <FormComp label={'last'} state={user.last} />
      <FormComp label={'bio'} state={user.bio} />
    </div>
  );
};

// make a settimeout that runs after the user stops typing,
// after 1-2 seconds, run async function to update firebase

const FormComp = ({ label, state }) => {
  const dispatch = useDispatch();
  const handleDynamic = (e) => {
    dispatch(updateDynamic({ label, value: e.target.value }));
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>{label}</label>
      <input
        onChange={(e) => handleDynamic(e)}
        value={state}
        className='border-2 border-slate-900'></input>
    </form>
  );
};

export default EditProfile;
