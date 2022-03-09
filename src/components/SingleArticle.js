
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import { fetchArticleById } from '../utils/api';

const SingleArticle = () => {

    const { article_id } = useParams();

    const [article, setArticleById] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {

            setArticleById(article);
            setLoading(false);
        }).catch((err) => {

            setError({ err });
            setLoading(false);
        })

    }, [article_id]);



    if (isLoading) return (<Loader> </Loader>);


    if (error) { return <ErrorComp message={error} />; }

    return (
        <ul className='article'>
            <li> Author: {article.author} || Topic: {article.topic}</li>
            <li> Title : {article.title} </li>
            <li>
                {article.body}
            </li>
        </ul>
    );
};

export default SingleArticle;