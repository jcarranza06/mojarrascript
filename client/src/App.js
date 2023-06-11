// import logo from './logo.svg';
import Home from './components/Home';
import CrearLista from './components/CrearLista';
import Navbar from './components/Navbar';
import ListaProductos from './components/ListaProductos';
import Footer from './components/footer';

import PreProducto from './components/PreProducto';
import Perfil from './components/Perfil';
import Estadisticas from './components/Estadisticas';
import UploadProducts from './components/UploadProducts';
import VerProducto from './components/VerProducto';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/estadisticas' element={<Estadisticas/>}/>
        <Route path='/producto' element={<VerProducto/>}/>
        <Route path='/preProducto' element={<PreProducto/>}/>
        <Route path='/nuevaLista' element={<CrearLista/>}/>
        <Route path='/listas/:id/:nombreLista' element={<ListaProductos/>} />
        <Route path='/uploadProductos' element={<UploadProducts/>}/>
        <Route path='*' element={<PaginaNoEncontrada/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
