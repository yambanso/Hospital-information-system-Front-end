import './app.css'
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Homepage from './homapage/Homepage';

function App() {
  const user = useContext(AuthContext);
  return (
    <div className="App">
      <Homepage/>
    </div>
  );
}

export default App;
