import '../estilos/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EquipoDetail from './EquipoDetail';
import Clasificacion from './Clasificacion';
import Rankings from './Rankings';
import NavBar from './NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='container-background'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipo/:nombre" element={<EquipoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <Clasificacion />
      <Rankings />
    </div>
  );
}

export default App;
