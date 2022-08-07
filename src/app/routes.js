// eslint-disable-next-line
import { app, auth, db } from './firebase-utils/firebase';
import App from './app';
import SwipeArea from './components/swipeArea/swipeAreaMain';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
import LandingPage from './components/landingPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  updateBasedOnAuth,
  updateStateOnLogIn,
  updateUid,
} from './redux-store/userState';
import { isUserSignedIn, getUid } from './firebase-utils/auth';
import { useDispatch } from 'react-redux';
import EditProfile from './components/editProfile';
import { getUser } from './firebase-utils/firestoreUser';
import Chatrooms from './components/chatrooms/chatrooms';
import { testPhotos } from './firebase-utils/firebasePhotos';
import { getChatRooms } from './firebase-utils/firebase-chatrooms';
import { getUsers } from './firebase-utils/firebase-getRanUsers';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { updateChatArray } from './redux-store/userChats';
// import { useMockHumans } from './utils/useMockHumans';

const AppRoutes = () => {
  // useMockHumans();
  const [authState, setAuthState] = useState(isUserSignedIn());
  const dispatch = useDispatch();
  const [testChats, setTestChats] = useState([]);
  const [testlol, setTestLol] = useState('hello world');
  const [count, setCount] = useState(0);

  const handleLoggedInState = () => {
    dispatch(updateBasedOnAuth(isUserSignedIn()));
    dispatch(updateUid(getUid()));
    setAuthState(isUserSignedIn());
  };

  // updates localState when user logs in
  const fetchUserDataOnLogIn = async (uid) => {
    const allInfo = await Promise.all([
      getUser(uid),
      testPhotos(uid),
      getChatRooms(uid),
      getUsers(),
    ]);
    // console.log(allInfo);
    const [data, photos, chats, swipeUsers] = allInfo;
    dispatch(updateStateOnLogIn(data));

    const queryChats = query(
      collection(db, 'rooms'),
      where('chatUsers', 'array-contains', uid)
    );
    return onSnapshot(queryChats, (querySnapShot) => {
      querySnapShot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          getChatRooms(uid)
            .then((res) => setTestChats(res))
            .catch((err) => console.error(err));
        }
        if (change.type === 'modified') {
          getChatRooms(uid)
            .then((res) => setTestChats(res))
            .catch((err) => console.error(err));
        }
      });
      return getChatRooms(uid);
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        fetchUserDataOnLogIn(user.uid);
      }
      handleLoggedInState();
    });
    return () => unSubscribe();
    // eslint-disable-next-line
  }, []);

  //

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route element={<PrivateWrapper authState={authState} />}>
          <Route path='/edit/:uid' element={<EditProfile />} />
          <Route path='/swipe' element={<SwipeArea />} />
          <Route path='/rooms' element={<Chatrooms testChats={testChats} />} />
        </Route>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  );
};

const PrivateWrapper = ({ authState }) => {
  return authState ? <Outlet /> : <Navigate to='/landing' />;
};

export default AppRoutes;
