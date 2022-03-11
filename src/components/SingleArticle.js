import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import { fetchArticleById, updateVotes } from '../utils/api';
import { Link } from 'react-router-dom';

const SingleArticle = () => {

    const { loggedInUser } = useContext(userContext);

    const { article_id } = useParams();

    const [article, setArticleById] = useState([]);
    const [userLogged] = useState(loggedInUser.username);

    const [votesIncrement, setVotesIncrement] = useState(0);
    const [votes, setVotes] = useState();

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {
            setVotes(article.votes);
            setArticleById(article);
            setLoading(false);
        }).catch((err) => {

            setError({ err });
            setLoading(false);
        })

    }, [article_id, userLogged]);

    const handleIncrement = (inc) => {
        setVotesIncrement((votesIncrement) => { return votesIncrement + inc; })
        setVotes(() => { const newVotes = votes + inc; return newVotes; })


        updateVotes(article_id, inc).catch(() => {
            setVotesIncrement((votesIncrement) => { return votesIncrement - inc; })
            setVotes((votes) => { return votes - inc; })
        })
    }


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
                            <p> Votes : {votes} </p>
                            <button disabled={votesIncrement > 0} onClick={() => { handleIncrement(1) }}> Vote up  </button>
                            <button disabled={votesIncrement < 0 || votes === 0} onClick={() => { handleIncrement(-1) }}> Vote down</button>
                        </div>
                        <p></p>
                    </div>
                </li>
            }
        </ul>

    );
};

export default SingleArticle;