import { useLocation } from 'react-router-dom';
import DevNav from '../devNav';
import { useEffect, useState } from 'react';
import { sendMessage } from '../../firebase-utils/firebase-chatrooms';
import { checkLocalUid } from '../../redux-store/userState';
import { useSelector } from 'react-redux';

const IndividualChatRoom = ({ userChats }) => {
  const uid = useSelector(checkLocalUid);
  const [msgData, setMsgData] = useState('');
  const location = useLocation();
  const { person, chat, index, image } = location.state;

  const handleChange = (e) => {
    return setMsgData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(uid, chat.name, msgData);
    setMsgData('');
  };

  return (
    <div>
      <DevNav />
      <img
        className='mainPhoto-preview'
        src={image}
        alt={`${person.first}-${image}`}></img>
      {person.first}
      <hr></hr>
      {person.uid}
      <hr></hr>
      {userChats[0].messages.map((message, index) => (
        <div key={`${message.msg}-${index}`}>{message.msg}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          write
          <input
            className='border'
            value={msgData}
            onChange={handleChange}></input>
        </label>
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default IndividualChatRoom;

// =============== useLocation version ============================
// location.state not updating on a new message being added.

// import { useLocation } from 'react-router-dom';
// import DevNav from '../devNav';
// import { useState } from 'react';
// import { sendMessage } from '../../firebase-utils/firebase-chatrooms';
// import { checkLocalUid } from '../../redux-store/userState';
// import { useSelector } from 'react-redux';

// const IndividualChatRoom = ({ userChats }) => {
//   const [msgData, setMsgData] = useState('');
//   const location = useLocation();
//   const { person, chat } = location.state;
//   const uid = useSelector(checkLocalUid);

//   const handleChange = (e) => setMsgData(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await sendMessage(uid, chat.name, msgData);
//   };

//   return (
//     <div>
//       <DevNav />
//       {person.first}
//       <hr></hr>
//       {person.uid}
//       <hr></hr>
//       {chat.messages.map((message, index) => (
//         <div key={`${message.msg}-${index}`}>{message.msg}</div>
//       ))}

//       <form onSubmit={handleSubmit}>
//         <label>
//           write
//           <input
//             className='border'
//             value={msgData}
//             onChange={handleChange}></input>
//         </label>
//         <button type='submit'>send</button>
//       </form>
//     </div>
//   );
// };

// export default IndividualChatRoom;
