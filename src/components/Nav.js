import React, { useEffect } from 'react';
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { userContext } from '../context/Context';

const Nav = () => {

    const { loggedInUser } = useContext(userContext);
    const [userDispaly, setUserDisplay] = useState("Log In");

    useEffect(() => {
        if (loggedInUser.username) {
            setUserDisplay(loggedInUser.username);
        }
        else {
            setUserDisplay("Log In");
        }
    }, [userDispaly, loggedInUser]);

    return (
        <div >

            <nav className='nav'>
                <Link to="/">Home</Link>
                <Link to="/topics/">Topics</Link>
                <Link to="/articles/sort/:sortedby">Sort articles</Link>
                <Link to="/logUser"> Account: {userDispaly} </Link>
            </nav>

        </div>
    );
};

export default Nav;