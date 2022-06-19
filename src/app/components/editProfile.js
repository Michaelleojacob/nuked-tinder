import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser, updateDynamic } from '../redux-store/userState';
import { updateUser } from '../firebase-utils/firestoreUser';
import { saveImageMessage } from '../firebase-utils/firebasePhotos';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>EditProfile</div>
      <FormComp label={'first'} state={user} />
      <FormComp label={'last'} state={user} />
      <FormComp label={'bio'} state={user} />
      <UploadImage />
    </div>
  );
};

// inputs: name, jobtitle, location, age, interests (?)
// textarea: bio
// photos: main, photos

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
        className='border-2 border-slate-900 m-1 p-1 rounded'></input>
    </form>
  );
};

const UploadImage = () => {
  const handleChange = (e) => {
    // console.log(e);
    // console.log(e.target.files[0]);
    const img = URL.createObjectURL(e.target.files[0]);
    // console.log(img);
    saveImageMessage(img);
  };
  return (
    <input
      onChange={handleChange}
      className='m-1 p-1'
      type={'file'}
      accept='image/pngm image/jpeg'></input>
  );
};

export default EditProfile;
