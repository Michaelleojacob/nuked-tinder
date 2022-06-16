import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  } catch (e) {
    console.error(e);
  }
};

const LoginPage = () => {
  const nav = useNavigate();

  const handleNav = () => {
    nav('landing', { replace: true });
  };

  return (
    <div>
      <button onClick={signIn}>login</button>
      <div>
        <button onClick={handleNav}>navigate</button>
      </div>
    </div>
  );
};

export default LoginPage;
