import { useState, useEffect } from 'react';
import DevNav from '../devNav';
import { getUsers } from '../../firebase-utils/firebase-getRanUsers';
import { useSelector } from 'react-redux';
import { checkLocalUid } from '../../redux-store/userState';
import { shuffle } from '../../utils/shuffleArr';
import { useSwipeable } from 'react-swipeable';
import { updateLikedUsers } from '../../firebase-utils/firestoreUser';

const SwipeArea = () => {
  const [profiles, setProfiles] = useState([]);
  const [indx, setIndx] = useState(0);
  const userUid = useSelector(checkLocalUid);

  const incrementIndx = () => setIndx(indx + 1);
  const decrementIndx = () => setIndx(indx - 1);

  const config = {
    delta: 10,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
    rotationAngle: 0,
    swipeDuration: Infinity,
    touchEventOptions: { passive: true },
  };

  const handleSwipeRight = useSwipeable({
    onSwipedRight: async () => {
      await updateLikedUsers(userUid, profiles[indx].uid);
      if (indx >= profiles.length - 1) return;
      incrementIndx();
    },
    ...config,
    onSwipedLeft: () => {
      if (indx >= profiles.length - 1) return;
      incrementIndx();
    },
    ...config,
  });

  useEffect(() => {
    const queryUsers = async () => {
      const profileArr = await getUsers();
      const removeSelf = profileArr.filter((p) => p.uid !== userUid);
      const shuffled = shuffle(removeSelf);
      setProfiles([...shuffled]);
    };
    queryUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <DevNav />
      <div className='swipe-area-content p1 m-1'>
        {profiles.length ? (
          <div className='swipe-card' {...handleSwipeRight}>
            <div>{profiles[indx].first}</div>
            <div>{profiles[indx].uid}</div>
            {profiles[indx].mainPhoto ? (
              <img
                className='swipe-card-image'
                src={process.env.PUBLIC_URL + profiles[indx].mainPhoto}
                alt={profiles[indx].first + 'image'}></img>
            ) : null}
          </div>
        ) : null}
        <button
          className='border m-1 p-1'
          onClick={decrementIndx}
          disabled={indx <= 0}>
          prev
        </button>
        <button
          className='border m-1 p-1'
          onClick={incrementIndx}
          disabled={indx >= profiles.length - 1}>
          next
        </button>
        <button
          className='border m-1 p-1'
          onClick={() => console.log(profiles)}>
          log profiles arr
        </button>
      </div>
    </div>
  );
};
export default SwipeArea;
