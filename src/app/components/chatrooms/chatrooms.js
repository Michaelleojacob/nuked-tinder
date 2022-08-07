import { useState } from 'react';
import DevNav from '../devNav';
import { sendMessage } from '../../firebase-utils/firebase-chatrooms';
import { checkLocalUid } from '../../redux-store/userState';
import { useSelector } from 'react-redux';

const Chatrooms = ({ testChats }) => {
  return (
    <div>
      <DevNav />
      {testChats.map((chat, index) => (
        <Room chat={chat} key={`msg` + index} />
      ))}
    </div>
  );
};

export default Chatrooms;

const Room = ({ chat }) => {
  const [msg, setMsg] = useState('');
  const uid = useSelector(checkLocalUid);

  const handleChange = (e) => setMsg(e.target.value);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMsg('');
    await sendMessage(uid, chat.name, msg);
  };

  return (
    <div>
      <div className='border-b-4'>
        {chat.name}
        <div>
          {chat.messages.map((msgObj, index) => (
            <div key={msgObj.msg + index}>{msgObj.msg}</div>
          ))}
        </div>
      </div>
      <form className='flex' onSubmit={handleSendMessage}>
        <div className='flex flex-col'>
          <label>
            reply:
            <input
              className='border flex'
              value={msg}
              onChange={handleChange}></input>
          </label>
          <button type='submit'>send</button>
        </div>
      </form>
    </div>
  );
};
