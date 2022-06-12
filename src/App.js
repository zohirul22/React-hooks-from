import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Home from './Home/Home';
import Navbar from './Home/Navbar';
import About from './Home/About';
import Review from './Home/Review';
import Contact from './Home/Contact';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
   <Routes>
     <Route path='/' element={<Home></Home>}></Route>
     <Route path='home' element={<Home></Home>}></Route>
     <Route path='about' element={<About></About>}></Route>
     <Route path='review' element={<Review></Review>}></Route>
     <Route path='contract' element={<Contact></Contact>}></Route>
     <Route path='login' element={<Login></Login>}></Route>
     <Route path='signUp' element={<SignUp></SignUp>}></Route>
   </Routes>
    </div>
  );
}

export default App;
