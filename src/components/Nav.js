import React from 'react';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { userContext } from '../context/Context';

const Nav = () => {

    const user = useContext(userContext);
    console.log(user);

    return (
        <div >

            <nav className='nav'>
                <Link to="/">Home</Link>
                <Link to="/topics/">Topics</Link>
                <Link to="/articles/sort/:sortedby">Sort articles</Link>
                <Link to="/logUser"> LogStatus</Link>
            </nav>

        </div>
    );
};

export default Nav;