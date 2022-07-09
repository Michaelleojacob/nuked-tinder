import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkLocalUser,
  updateDynamic,
  addPhoto,
} from '../redux-store/userState';
import { updateUser } from '../firebase-utils/firestoreUser';
import { saveUserImage } from '../firebase-utils/firebasePhotos';
import { useState, useEffect } from 'react';
import { storage, getFolder } from '../firebase-utils/firebasePhotos';
import { getDownloadURL, ref } from 'firebase/storage';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  const dispatch = useDispatch();
  const [userPhotos, setUserPhotos] = useState();

  useEffect(() => {
    const getImage = async () => {
      const myURL = await getDownloadURL(
        ref(storage, 'LMwPP6AA6gOSeT34OIFmxOwt9LC3/android-chrome-192x192.png')
      );
      // console.log(myURL);
    };
    // getImage();
  }, []);

  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>EditProfile</div>
      <FormComp label={'first'} state={user} dispatch={dispatch} />
      <FormComp label={'last'} state={user} dispatch={dispatch} />
      <FormComp label={'bio'} state={user} dispatch={dispatch} />
      <UploadImage user={user} dispatch={dispatch} />
      <UserPhotos user={user} userPhotos={userPhotos} />
      <DummyPhotos user={user} userPhotos={userPhotos} />
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
    // if (user.photos.length > 3) return;
    console.log(e.target.files[0]);
    const img = URL.createObjectURL(e.target.files[0]);
    console.log(img);
    // dispatch(addPhoto(img));
    // await saveUserImage(img, user);
  };
  return (
    <input
      onChange={handleChange}
      className='m-1 p-1'
      type={'file'}
      accept='image/pngm image/jpeg'></input>
  );
};

const UserPhotos = ({ user, userPhotos }) => {
  const handleLogPhotos = () => {
    console.log(userPhotos);
  };
  return (
    <>
      <button onClick={handleLogPhotos}>userPhotos</button>
      {userPhotos
        ? userPhotos.map((photo, index) => {
            return (
              <div>
                <img src={photo} alt='userphoto' key={`user-${index}`}></img>
              </div>
            );
          })
        : null}
    </>
  );
};

const DummyPhotos = ({ user }) => {
  return (
    <>
      {user.photos.map((photo, index) => (
        <img
          src={photo}
          alt={`userPhoto-${index}`}
          key={`userPhoto-${index}`}></img>
      ))}
    </>
  );
};

export default EditProfile;
