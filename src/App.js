import logo from './logo.svg';
import './App.css';
import RoutingComponent from './routes';
import { AuthProvider } from './customHooks/user_auth';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <RoutingComponent />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
