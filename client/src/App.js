import { Allroutes } from './AllRoutes';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Allroutes />
      <Footer />
    </div>
  );
}

export default App;