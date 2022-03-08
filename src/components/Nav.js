import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div >

            <nav className='nav'>
                <Link to="/">Home</Link>
                <Link to="/topics/">Topics</Link>
                <Link to="/sortedArticles/params">Sort articles</Link>
                <Link to="/logUser"> LogStatus</Link>
            </nav>

        </div>
    );
};

export default Nav;