import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import { fetchArticleById } from '../utils/api';
import { Link } from 'react-router-dom';

const SingleArticle = () => {

    const { loggedInUser } = useContext(userContext);
    const { userVoted } = useContext(userContext);
    console.log(userVoted, "users voted");

    const { article_id } = useParams();

    const [article, setArticleById] = useState([]);
    const [userLogged, setUserLogged] = useState(loggedInUser.username);

    const [votes, setVotes] = useState();
    const [votesUpValid, setVotesUpValid] = useState(false);
    const [votesDownValid, setVotesDownValid] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticleById(article_id).then(({ article }) => {

            setArticleById(article);
            setVotes(article.votes);
            setLoading(false);
        }).catch((err) => {

            setError({ err });
            setLoading(false);
        })

    }, [article_id, userLogged]);

    const handleVoteUp = (event) => {

        setVotes(() => {
            const newVotes = votes + 1;
            return newVotes;
        })

    }
    const handleVoteDown = (event) => {
        setVotes(() => {
            const newVotes = votes - 1;
            return newVotes;
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
                            <button onClick={handleVoteUp}> Vote up  </button>
                            <button onClick={handleVoteDown}> Vote down</button>
                        </div>
                        <p></p>
                    </div>
                </li>
            }
        </ul>

    );
};

export default SingleArticle;