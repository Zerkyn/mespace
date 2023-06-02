import React, { useState } from "react";
import './App.css';
import Header from './Components/Header';
import Login from './Components/Login/Login';

function App() {
  const [user, setUser] = useState({})

  return (
    <div className="App">
      {/* <Header /> */}
      <Login setUser={setUser} user={user}/>
    </div>
  );
}

export default App;
