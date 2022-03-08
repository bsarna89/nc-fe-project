
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { fetchArticleById } from '../utils/api';

const SingleArticle = () => {

    const { article_id } = useParams();

    const [article, setArticleById] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {
            console.log(article);
            setArticleById(article);
            setLoading(false);
        })

    }, [article_id]);



    if (isLoading) return (<Loader> </Loader>);

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