import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArticlesSort from './ArticlesSort';
import Home from './Home';
import LogUser from './LogUser';
import Topics from './Topics';

const Main = () => {
    return (
        <div className='main'>
            <p>This is main </p>
            <Routes>
                <Route path="/" element={<Home></Home>} ></Route>
                <Route path="/topics" element={<Topics></Topics>} ></Route>
                <Route path="/sortArticles/:sortedby" element={<ArticlesSort></ArticlesSort>}></Route>
                <Route path="/logUser" element={<LogUser></LogUser>} ></Route>
            </Routes>
        </div>
    );
};

export default Main;