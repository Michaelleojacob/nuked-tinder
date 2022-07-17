import { useState, useEffect } from 'react';
import DevNav from '../devNav';
import { getUsers } from '../../firebase-utils/firebase-getRanUsers';
import { useSelector } from 'react-redux';
import { checkLocalUid } from '../../redux-store/userState';
import { shuffle } from '../../utils/shuffleArr';
import { useSwipeable } from 'react-swipeable';

/**
 * todo:
 * fetch group of people from database
 * display people as cards
 * enable swipe functionality
 */

/**
 * get say, 5 people. Store in array (?)
 * probably on log-in
 *
 * every time we swipe, remove that person from array
 *
 * once array is less than 5/3
 */
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
    onSwipedRight: (eventData) => {
      if (indx >= profiles.length - 1) return;
      console.log('user swiped right', eventData);
      incrementIndx();
    },
    ...config,
    onSwipedLeft: (eventData) => {
      if (indx >= profiles.length - 1) return;
      console.log('user swiped left', eventData);
      incrementIndx();
    },
    ...config,
  });

  useEffect(() => {
    const queryUsers = async () => {
      const profileArr = await getUsers();
      const removeSelf = profileArr.filter((p) => p.uid !== userUid);
      console.log(removeSelf);
      const shuffled = shuffle(removeSelf);
      shuffled.forEach((person) => console.log(person.first));
      console.log(shuffled.length);
      setProfiles([...shuffled]);
    };
    queryUsers();
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
