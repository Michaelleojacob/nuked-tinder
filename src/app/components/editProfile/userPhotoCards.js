import { useState, useEffect } from 'react';
import { deleteImgFromUserDocAndBucket } from '../../firebase-utils/firestoreUser';

const UserPhotoCards = ({ user, userPhotos }) => {
  const [photosArr, setPhotosArr] = useState([]);

  const remomveFromPhotosArr = (index) =>
    setPhotosArr(photosArr.filter((item, itemIndex) => itemIndex !== index));

  const handleDelete = async (index, locationURL) => {
    const res = await deleteImgFromUserDocAndBucket(user.uid, locationURL);
    if (res) remomveFromPhotosArr(index);
  };

  useEffect(() => {
    console.log(userPhotos);
    setPhotosArr([...userPhotos]);
  }, [userPhotos]);

  return (
    <div className='editprofile-card-area'>
      {photosArr.length ? (
        photosArr.map((photo, index) => {
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
      ) : (
        <div>No images</div>
      )}
    </div>
  );
};

export default UserPhotoCards;
