import './App.css';
import React, { useState } from "react";
import { userContext } from "./context/Context";
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Nav from './components/Nav';



function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [userVoted, setUserVoted] = useState([{ username: "grumpy19", voted: "up" }]);



  return (

    <userContext.Provider value={{ loggedInUser, setLoggedInUser, userVoted, setUserVoted }}>
      <BrowserRouter>
        <div>

          <Header> </Header>
          <Nav></Nav>
          <Main> </Main>
          <Footer></Footer>

        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
