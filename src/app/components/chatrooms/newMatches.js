import { getUser } from '../../firebase-utils/firestoreUser';
import { useSelector } from 'react-redux';
import { checkLocalUid } from '../../redux-store/userState';
import { useState, useEffect } from 'react';
import { getFolder } from '../../firebase-utils/firebasePhotos';
import { getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const NewMatches = ({ inactive }) => {
  return (
    <div>
      {inactive.length >= 1 ? (
        <DisplayMatches inactive={inactive} />
      ) : (
        <NoNewMatches />
      )}
    </div>
  );
};

export default NewMatches;

const NoNewMatches = () => {
  return (
    <div>
      <div>discover new matches</div>
    </div>
  );
};

const DisplayMatches = ({ inactive }) => {
  return (
    <div className='new-matches-container'>
      {inactive.map((chat, index) => (
        <DisplayUser
          chat={chat}
          index={index}
          key={`displayMatches ${chat.name}`}
        />
      ))}
    </div>
  );
};

const DisplayUser = ({ chat, index }) => {
  console.log(chat);
  const uid = useSelector(checkLocalUid);
  const [person, setPerson] = useState({});
  const [image, setImage] = useState(null);
  const { chatUsers } = chat[0];
  const [otherUser] = chatUsers.filter((bothUids) => bothUids !== uid);
  let navigate = useNavigate();

  const handleClick = (e) => {
    // navigate to chatroom
    navigate(`/rooms/${chat.name}`, {
      state: {
        person,
        chat,
        index,
        image,
      },
    });
  };

  useEffect(() => {
    const getOtherUser = async () => {
      const data = await getUser(otherUser);
      setPerson(data);
      const test = await getFolder(otherUser);
      const [main] = test.filter((item) =>
        item._location.path_.includes(data.mainPhoto)
      );
      getDownloadURL(main)
        .then((res) => setImage(res))
        .catch((e) => console.error(e));
    };
    getOtherUser();
  }, []);

  return (
    <div className='new-match-card' onClick={handleClick}>
      <div>{person.first}</div>
      <img
        className='new-match'
        src={image}
        alt={`${person.first}  ${person.mainPhoto}`}></img>
    </div>
  );
};
