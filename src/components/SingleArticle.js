import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import { fetchArticleById } from '../utils/api';
import { Link } from 'react-router-dom';

const SingleArticle = () => {

    const { loggedInUser } = useContext(userContext);
    const { setLoggedInUser } = useContext(userContext);

    const { article_id } = useParams();

    const [article, setArticleById] = useState([]);
    const [userLogged, setUserLogged] = useState(loggedInUser.username);

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

    }, [article_id, userLogged]);





    if (isLoading) return (<Loader> </Loader>);


    if (error) { return <ErrorComp message={error} />; }

    return (
        <ul className='article'>
            <li> Author: {article.author} || Topic: {article.topic}</li>
            <li> Title : {article.title} </li>
            <li>
                {article.body}
            </li>
            <li><p></p></li>
            {userLogged &&
                <li>
                    <div>
                        <Link to={`/article/comments/${article.article_id}`}> <button> See comments</button> </Link>
                        <div>
                            <p> Votes : {article.votes} </p>
                            <button> Vote up  </button>
                            <button> Vote down</button>
                        </div>
                        <p></p>
                    </div>
                </li>
            }
        </ul>

    );
};

export default SingleArticle;