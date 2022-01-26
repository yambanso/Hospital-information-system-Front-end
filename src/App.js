import './app.css'
import Admin from './admin/Admin';
import TopBar from './components/topBar/TopBar'

function App() {
  return (
    <div className="App">
     <TopBar />   
      <Admin />
    </div>
  );
}

export default App;
