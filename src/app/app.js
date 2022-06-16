import AppRoutes from './routes';
import { auth, db } from './firebase-utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const App = () => {
  const initFirebaseAuth = () => {
    onAuthStateChanged(getAuth(), authStateObserver);
  };

  const authStateObserver = (user) => {
    if (user) {
    }
  };

  useEffect(() => {
    initFirebaseAuth();
  }, []);

  const handleIncrement = () => {};

  return (
    <div>
      <button onClick={handleIncrement}>increment</button>
      <AppRoutes />
    </div>
  );
};

export default App;
