import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import LogUser from './LogUser';
import SingleArticle from './SingleArticle';
import SingleTopic from './SingleTopic';
import SortedArticles from './SortedArticles';
import Topics from './Topics';
import ErrorComp from './ErrorComp';
import Commnets from './Commnets';

const Main = () => {
    return (
        <div className='main'>

            <Routes>
                <Route path="/" element={<Home></Home>} ></Route>
                <Route path="/topics/" element={<Topics></Topics>} ></Route>
                <Route path="/articles/topic/:params" element={<SingleTopic></SingleTopic>} ></Route>
                <Route path="/articles/:article_id" element={<SingleArticle></SingleArticle>}></Route>
                <Route path="/articles/sort/:sortedby" element={<SortedArticles></SortedArticles>}></Route>
                <Route path="/article/comments/:article_id" element={<Commnets></Commnets>}></Route>
                <Route path="/logUser" element={<LogUser></LogUser>} ></Route>
                <Route path="*" element={<ErrorComp></ErrorComp>} />

            </Routes>
        </div>
    );
};

export default Main;