import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser } from '../redux-store/userState';
import { useState, useEffect } from 'react';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '../firebase-utils/firebasePhotos';
import UserPhotoCards from './editProfile/userPhotoCards';
import UploadImage from './editProfile/uploadImage';
import FormComp from './editProfile/formComp';

const EditProfile = () => {
  // redux getter and setter
  const user = useSelector(checkLocalUser);
  const dispatch = useDispatch();

  /**
   * state to trigger a render of the fetch useEffect getImages();
   * includes the re render trigger, a function to trigger the reRender
   * and the arr that gets updated on successful fetch of the images.
   */
  const [reRender, setReRender] = useState(false);
  const triggerUseEffect = () => setReRender(!reRender);
  const [userPhotos, setUserPhotos] = useState([]);

  /**
   * firebase magic
   * gets user bucket (of images)
   * turns the bucket into images (getdownloadURL)
   * update local state to the array of images
   */
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
    </div>
  );
};

export default EditProfile;
