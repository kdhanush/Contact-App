import React from "react";
import Createprofile from "./Components/Createprofile";
import Header from "./Components/Header";
import UserList from "./Components/UserList";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';





function App() {

  return (
   <Router>
    <div className="App">
      {/* <Header /> */}
      <Routes>
     <Route exact path='/' element={<UserList />}/>
			<Route path='/adduser/:id' element={<Createprofile />} />
      <Route path='/adduser' element={<Createprofile />} />
      </Routes>
    </div>
    </Router>
  );
}
export default App;
