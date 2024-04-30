import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./pages/home"
import Test from "./pages/test"
import Login from "./pages/login"
import Signup from "./pages/signup"
import User from "./pages/user"
import About from "./pages/about"
import Contact from "./pages/contact"

// OUR NAVBAR
import Navbar from './components/navbar'
import TestEndpoint from './pages/apiTesting';


function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/testEndpoint" element={<TestEndpoint/>} />
      </Routes>
    </Router>
  );
}

export default App;
