// import logo from './logo.svg';
import Home from './components/Home';
import{List,NewLista} from './components/ListasCompras';
import Navbar from './components/Navbar';
import Footer from './components/footer';
//<List/>
//<NewLista/>
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home/>
      <Footer/> 
    </div>
  );
}

export default App;
