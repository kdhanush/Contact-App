import React, { useEffect } from "react";
import Createprofile from "./Components/Createprofile";
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





function App() {

  useEffect(() => {
    document.title = "Contact App"
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<UserList />} />
          <Route path='/adduser/:id' element={<Createprofile />} />
          <Route path='/adduser' element={<Createprofile />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
