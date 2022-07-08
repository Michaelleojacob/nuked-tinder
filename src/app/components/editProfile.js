import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkLocalUser,
  updateDynamic,
  addPhoto,
  checkUserPhotos,
} from '../redux-store/userState';
import { updateUser } from '../firebase-utils/firestoreUser';
import { saveUserImage } from '../firebase-utils/firebasePhotos';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  const dispatch = useDispatch();
  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>EditProfile</div>
      <FormComp label={'first'} state={user} dispatch={dispatch} />
      <FormComp label={'last'} state={user} dispatch={dispatch} />
      <FormComp label={'bio'} state={user} dispatch={dispatch} />
      <UploadImage user={user} dispatch={dispatch} />
      <UserPhotos user={user} />
    </div>
  );
};

// inputs: name, jobtitle, location, age, interests (?)
// textarea: bio
// photos: main, photos

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

const UploadImage = ({ user, dispatch }) => {
  const handleChange = async (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    dispatch(addPhoto(img));
    return await saveUserImage(img, user);
  };
  return (
    <input
      onChange={handleChange}
      className='m-1 p-1'
      type={'file'}
      accept='image/pngm image/jpeg'></input>
  );
};

const UserPhotos = () => {
  const photos = useSelector(checkUserPhotos);
  return (
    <>
      {photos.map((photo, index) => (
        <img src={photo} alt={`userPhoto-${index}`}></img>
      ))}
    </>
  );
};

export default EditProfile;
