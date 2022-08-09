import DevNav from '../devNav';
import { useState, useEffect } from 'react';
import NewMatches from './newMatches';
import ActiveChats from './activeChats';

const Chatrooms = ({ userChats }) => {
  const [inactive, setInactive] = useState([]);
  const [active, setActive] = useState([]);

  const filterBasedOnActivity = (arr) => {
    const matched = [];
    const chatting = [];
    arr.forEach((chat, index) => {
      if (chat.messages.length <= 1) {
        matched.push([chat, index]);
      } else {
        chatting.push([chat, index]);
      }
    });
    setInactive(matched);
    setActive(chatting);
  };

  useEffect(() => {
    filterBasedOnActivity(userChats);
  }, []);

  const handleLog = () => {
    console.log(active);
    console.log(inactive);
  };

  return (
    <div>
      <DevNav />
      <button onClick={handleLog}>log both</button>
      <NewMatches inactive={inactive} />
      <ActiveChats active={active} />
    </div>
  );
};

export default Chatrooms;

// return (
//   <div>
//     <DevNav />
//     {userChats.map((chat, index) => (
//       <Room chat={chat} key={`msg` + index} />
//     ))}
//   </div>
// );
