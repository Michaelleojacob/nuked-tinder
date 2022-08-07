import DevNav from '../devNav';

const Chatrooms = ({ testChats }) => {
  return (
    <div>
      <DevNav />
      {testChats.map((chat) => (
        <Room chat={chat} />
      ))}
      <div>hi from chatrooms</div>
    </div>
  );
};

export default Chatrooms;

const Room = ({ chat }) => {
  return (
    <div>
      {chat.name}
      <div>{chat.messages.map((msg) => msg)}</div>
    </div>
  );
};
