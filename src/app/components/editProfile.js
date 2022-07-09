import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser, updateDynamic } from '../redux-store/userState';
import { updateUser } from '../firebase-utils/firestoreUser';
import { saveUserImage } from '../firebase-utils/firebasePhotos';
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase-utils/firebasePhotos';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  const dispatch = useDispatch();

  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(() => {
    const getImages = async () => {
      await listAll(ref(storage, user.uid)).then((res) => {
        res.items.forEach(async (item) => {
          await getDownloadURL(ref(storage, item)).then((downloadURL) => {
            setUserPhotos((prevState) => [...prevState, downloadURL]);
          });
        });
      });
    };
    getImages();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>EditProfile</div>
      <FormComp label={'first'} state={user} dispatch={dispatch} />
      <FormComp label={'last'} state={user} dispatch={dispatch} />
      <FormComp label={'bio'} state={user} dispatch={dispatch} />
      <UploadImage user={user} dispatch={dispatch} />
      <UserPhotoComponent user={user} userPhotos={userPhotos} />
      <button onClick={() => console.log(userPhotos)}>check userPhotos</button>
    </div>
  );
};

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

const UploadImage = ({ user }) => {
  const handleChange = async (e) => {
    await saveUserImage(e.target.files[0], user);
  };
  return (
    <input
      onChange={handleChange}
      className='m-1 p-1'
      type={'file'}
      accept='image/pngm image/jpeg'></input>
  );
};

const UserPhotoComponent = ({ userPhotos }) => {
  useEffect(() => {}, [userPhotos]);
  return (
    <>
      {userPhotos.length
        ? userPhotos.map((photo, index) => {
            return (
              <img
                src={photo}
                alt={`${photo}-${index}`}
                key={`${photo}-${index}`}></img>
            );
          })
        : null}
    </>
  );
};

export default EditProfile;
