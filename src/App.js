import './App.css';
import Search_Navbar from './components/Search_Navbar';
import Card from './components/Card.js';

function App() {
  return (
    <div className="App">
      <h1 style={{marginTop:"1rem", marginBottom:"1.5rem",color:"white"}}>Weather Application</h1>      
      <Search_Navbar></Search_Navbar>
      {/* <Card ></Card> */}
      
    </div>
  );
}

export default App;
