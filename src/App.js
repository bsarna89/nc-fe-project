import './App.css';
import React, { useState } from "react";
import { userContext } from "./context/Context";
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Nav from './components/Nav';



function App() {

  const [loggedInUser, setLoggedInUser] = useState(
    {
      username: "MichaelOffice",
      name: "Michael Scott",
      avatar_url: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/10/Michael-Scott-the-Office.jpg"
    }
  );



  return (

    <userContext.Provider value={{ loggedInUser, setLoggedInUser }}>
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
