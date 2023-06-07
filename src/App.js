import React, { useState } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Social from "./Components/Social/Social";
import Login from './Components/Login/Login';


function App() {
  const [user, setUser] = useState({})

  return (
    <div className="App">
      <Routes>
        <Route index element={<Login setUser={setUser} user={user}/>} />
        <Route path='/social' element={user ? <Social setUser={setUser} user={user}/> : <Navigate to='/'/>} />
      </Routes>
    </div>
  );
}

export default App;
