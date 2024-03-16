import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./pages/home"
import Test from "./pages/test"
import Login from "./pages/login"
import Signup from "./pages/signup"
import User from "./pages/user"


function App() {
  console.log(process.env.REACT_APP_API_KEY);
  console.log(process.env.REACT_APP_AUTH_DOMAIN);
  console.log(process.env.REACT_APP_DATABASE_URL);
  console.log(process.env.REACT_APP_PROJECT_ID);
  console.log(process.env.REACT_APP_STORAGE_BUCKET);
  console.log(process.env.REACT_APP_MESSAGING_SENDER_ID);
  console.log(process.env.REACT_APP_APP_ID);
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
