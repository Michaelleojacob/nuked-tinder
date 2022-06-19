import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser, updateDynamic } from '../redux-store/userState';
import { updateUser } from '../firebase-utils/firestoreUser';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>EditProfile</div>
      <FormComp label={'first'} state={user} />
      <FormComp label={'last'} state={user} />
      <FormComp label={'bio'} state={user} />
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
  const updateDb = async () => {
    await updateUser(label, state);
  };
  return (
    <form className='m-1 p-1' onSubmit={(e) => e.preventDefault()}>
      <label>{label}</label>
      <input
        onBlur={() => updateDb(label, state)}
        onChange={(e) => handleDynamic(e)}
        value={state[label]}
        className='border-2 border-slate-900'></input>
    </form>
  );
};

export default EditProfile;
