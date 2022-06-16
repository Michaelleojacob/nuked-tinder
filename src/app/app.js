import AppRoutes from './routes';
import { auth, db } from './firebase-utils/firebase';

const App = () => {
  // user logged in / auth state. Or in redux?
  // user logged in state change (Oberserver)

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
