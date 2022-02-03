import './app.css'
import Admin from './admin/Admin';
import TopBar from './components/topBar/TopBar'
import Layout from './Sign_in/layout';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
          <Layout/>
          
      </AuthContextProvider>
      
     
    </div>
  );
}

export default App;
