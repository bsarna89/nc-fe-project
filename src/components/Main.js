import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import LogUser from './LogUser';
import SingleArticle from './SingleArticle';
import SortedArticles from './SortedArticles';
import Topics from './Topics';

const Main = () => {
    return (
        <div className='main'>
            <p>This is main </p>
            <Routes>
                <Route path="/" element={<Home></Home>} ></Route>
                <Route path="/topics" element={<Topics></Topics>} ></Route>
                <Route path="/articles/:article_id" element={<SingleArticle></SingleArticle>}></Route>
                <Route path="/sortedArticles/:params" element={<SortedArticles></SortedArticles>}></Route>
                <Route path="/logUser" element={<LogUser></LogUser>} ></Route>

            </Routes>
        </div>
    );
};

export default Main;