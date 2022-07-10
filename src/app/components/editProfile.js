import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser, updateDynamic } from '../redux-store/userState';
import {
  deletePhotoFromUser,
  updateUser,
} from '../firebase-utils/firestoreUser';
import {
  deletePhotoFromBucket,
  saveUserImage,
} from '../firebase-utils/firebasePhotos';
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase-utils/firebasePhotos';

const EditProfile = () => {
  const user = useSelector(checkLocalUser);
  const dispatch = useDispatch();

  const [reRender, setReRender] = useState(false);
  const triggerUseEffect = () => setReRender(!reRender);
  const [userPhotos, setUserPhotos] = useState([]);
  useEffect(() => {
    const getImages = async () => {
      try {
        await listAll(ref(storage, user.uid)).then((res) => {
          res.items.forEach(async (item) => {
            await getDownloadURL(ref(storage, item)).then((downloadURL) => {
              setUserPhotos((prevState) => [
                ...prevState,
                { downloadURL, imgLocation: item._location.path_ },
              ]);
            });
          });
        });
      } catch (e) {
        console.error(e);
      }
    };
    getImages();
    return () => setUserPhotos([]);
    // eslint-disable-next-line
  }, [reRender]);

  return (
    <div>
      <DevNav />
      <div className='m-1 p-1'>EditProfile</div>
      <FormComp label={'first'} state={user} dispatch={dispatch} />
      <FormComp label={'last'} state={user} dispatch={dispatch} />
      <FormComp label={'bio'} state={user} dispatch={dispatch} />
      <UploadImage
        user={user}
        dispatch={dispatch}
        triggerUseEffect={triggerUseEffect}
      />
      <UserPhotoCards
        user={user}
        userPhotos={userPhotos}
        triggerUseEffect={triggerUseEffect}
      />
      {/* <button onClick={() => console.log(userPhotos)}>check userPhotos</button> */}
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

const UploadImage = ({ user, triggerUseEffect }) => {
  const handleChange = async (e) => {
    await saveUserImage(e.target.files[0], user);
    triggerUseEffect();
  };
  return (
    <input
      onChange={handleChange}
      className='m-1 p-1'
      type={'file'}
      accept='image/pngm image/jpeg'></input>
  );
};

const UserPhotoCards = ({ user, userPhotos, triggerUseEffect }) => {
  const [photosArr, setPhotosArr] = useState([]);

  const remomveFromPhotosArr = (index) =>
    setPhotosArr(photosArr.filter((item, itemIndex) => itemIndex !== index));

  const handleDelete = async (index, locationURL) => {
    remomveFromPhotosArr(index);
    await deletePhotoFromUser(user.uid, locationURL);
    await deletePhotoFromBucket(locationURL);
  };

  useEffect(() => {
    setPhotosArr([...userPhotos]);
  }, [userPhotos]);

  return (
    <div className='editprofile-card-area'>
      {userPhotos.length
        ? photosArr.map((photo, index) => {
            return (
              <div
                className='editprofile-img-cards'
                key={`${photo.imgLocation}-${index}`}>
                <img
                  className='editprofile-photo'
                  src={photo.downloadURL}
                  alt={`${photo}-${index}`}></img>
                <button
                  onClick={() => handleDelete(index, photo.imgLocation)}
                  className='bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded m-1 p-1 border border-red-700 rounded'>
                  delete
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default EditProfile;
