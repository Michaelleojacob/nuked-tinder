import DevNav from './devNav';
import { useSelector, useDispatch } from 'react-redux';
import { checkLocalUser } from '../redux-store/userState';
import { useState, useEffect } from 'react';
import UserPhotoCards from './editProfile/userPhotoCards';
import UploadImage from './editProfile/uploadImage';
import FormComp from './editProfile/formComp';
import { useFetchUserImages } from './editProfile/fetchUserImages';

const EditProfile = () => {
  // redux getter and setter
  const user = useSelector(checkLocalUser);
  const dispatch = useDispatch();

  const [reRender, setReRender] = useState(false);
  const triggerUseEffect = () => setReRender(!reRender);
  const [userPhotos, setUserPhotos] = useState([]);
  const { data, loading } = useFetchUserImages(user.uid, reRender);

  /**
   * firebase magic
   * gets user bucket (of images)
   * turns the bucket into images (getdownloadURL)
   * update local state to the array of images
   */
  useEffect(() => {
    setUserPhotos((prevState) => [...prevState, ...data]);
    return () => setUserPhotos([]);
    // eslint-disable-next-line
  }, [data, reRender]);

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
