import { useState, useEffect } from 'react';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase-utils/firebasePhotos';

export const useFetchUserImages = (uid, reRender) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      await listAll(ref(storage, uid)).then((res) => {
        res.items.forEach(async (item) => {
          await getDownloadURL(ref(storage, item)).then((downloadURL) => {
            setData((prevState) => [
              ...prevState,
              { downloadURL, imgLocation: item._location.path_ },
            ]);
            setLoading(false);
          });
        });
      });
    };
    getImages();
  }, [reRender]);

  return { data, loading };
};
