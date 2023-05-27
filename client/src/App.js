// import logo from './logo.svg';
import Home from './components/Home';
import { List, NewLista } from './components/ListasCompras';
import CrearLista from './components/CrearLista';
import Navbar from './components/Navbar';

import Footer from './components/footer';

import PreProducto from './components/PreProducto';
import Perfil from './components/Perfil';

import VerProducto from './components/VerProducto';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/producto' element={<VerProducto/>}/>
        <Route path='/preProducto' element={<PreProducto/>}/>
        <Route path='/nuevaLista' element={<CrearLista/>}/>
        <Route path='*' element={<PaginaNoEncontrada/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
