import { useState, useEffect } from 'react';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-utils/firebasePhotos';
import { getAuth } from 'firebase/auth';

export const FetchUserImages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      try {
        await listAll(ref(storage, getAuth().uid)).then((res) => {
          res.items.forEach(async (item) => {
            await getDownloadURL(ref(storage, item)).then((downloadURL) => {
              setData((prevState) => [
                ...prevState,
                { downloadURL, imgLocation: item._location.path_ },
              ]);
            }, setLoading(false));
          });
        });
      } catch (e) {
        console.error(e);
      }
    };
    getImages();
    return () => console.error('error in FetchUserImages hook');
  }, []);

  return { data, loading };
};
