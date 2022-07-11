import { updateDynamic } from '../../redux-store/userState';
import { updateUser } from '../../firebase-utils/firestoreUser';

const FormComp = ({ label, state, dispatch }) => {
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
        className='border-2 border-slate-900 m-1 p-1 rounded'></input>
    </form>
  );
};

export default FormComp;
