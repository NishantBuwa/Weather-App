import './App.css';
import SearchNavbar from './components/Search_Navbar';

function App() {
  return (
    <div className="App">
      <h1 style={{marginTop:"1rem", marginBottom:"1.5rem",color:"white"}}>Weather Application</h1>      
      <SearchNavbar></SearchNavbar>
      
    </div>
  );
}

export default App;
