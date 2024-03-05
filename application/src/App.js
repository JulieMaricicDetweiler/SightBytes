import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./pages/home"
import Test from "./pages/test"
import Login from "./pages/login"
import Signup from "./pages/signup"
import User from "./pages/user"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/user" element={<User/>} />

      </Routes>
    </Router>
  );
}

export default App;
