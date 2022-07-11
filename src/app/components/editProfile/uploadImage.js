import { addPhotoToBucketAndDocs } from '../../firebase-utils/firestoreUser';

const UploadImage = ({ user, triggerUseEffect }) => {
  const handleChange = async (e) => {
    const res = await addPhotoToBucketAndDocs(user.uid, e.target.files[0]);
    if (res) triggerUseEffect();
  };
  return (
    <input
      onChange={handleChange}
      className='m-1 p-1'
      type={'file'}
      accept='image/pngm image/jpeg'></input>
  );
};

export default UploadImage;
