import AppRoutes from './routes';
import { auth, db } from './firebase-utils/firebase';

const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
