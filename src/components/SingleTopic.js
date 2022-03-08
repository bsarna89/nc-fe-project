import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesByTopic } from '../utils/api';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import { Link } from 'react-router-dom';

const SingleTopic = () => {

    const { params } = useParams();

    const [articles, setArticlesByTopic] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const urlString = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fIN36i6PHWoGOdaalRtIXnbTbPdkYe2FtzvgV-cYvZDEZDn8M1qL56S3hcrmSdFaNw&usqp=CAU";


    useEffect(() => {
        fetchArticlesByTopic(params).then(({ articles }) => {

            setArticlesByTopic(articles);
            setLoading(false);
        }).catch((err) => {

            setError({ err });
            setLoading(false);
        })

    }, [params]);



    if (isLoading) return (<Loader> </Loader>);

    if (error) { return <ErrorComp message={error} />; }

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
        </div>
    );
};

export default SingleTopic;