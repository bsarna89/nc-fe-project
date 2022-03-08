import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../utils/api';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Home = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const urlString = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fIN36i6PHWoGOdaalRtIXnbTbPdkYe2FtzvgV-cYvZDEZDn8M1qL56S3hcrmSdFaNw&usqp=CAU";

    useEffect(() => {
        fetchArticles().then(({ articles }) => {

            setArticles(articles);
            setLoading(false);
        })

    }, []);

    if (isLoading) return (<Loader> </Loader>);

    return (
        <div>
            <ul className='list'>
                {articles.map((article) => {
                    return (
                        <li key={article.article_id} className='title' >
                            <p> {article.title}</p>
                            <p> Topic :{article.topic}</p>
                            <Link to={`/articles/${article.article_id}`} className='link'>
                                <img src={urlString} className='go-img' alt="Read Article"></img>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <p> Home: list of articles </p>
        </div>
    );
};

export default Home;