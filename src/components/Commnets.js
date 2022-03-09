import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComments } from '../utils/api';
import ErrorComp from './ErrorComp';
import Loader from './Loader';
import { Link } from 'react-router-dom';
const Commnets = () => {

    const { article_id } = useParams();
    console.log(article_id, "commemts card")

    const [comments, setComments] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments(article_id).then(({ comments }) => {
            setLoading(false);
            setComments(comments);
        }).catch((err) => {
            setLoading(false);
            setError(err);
        })
    }, [comments, article_id])

    if (isLoading) return (<Loader> </Loader>);

    if (error) { return <ErrorComp message={error} />; }

    return (
        <div>

            <ul className='list'>
                <Link to={`/articles/${article_id}`}> <button> Go back to article</button></Link>
                {comments.map((comment) => {
                    return (

                        <li key={comment.comment_id} className='article' >
                            <p> {comment.author}</p>
                            <p> {comment.body}</p>
                        </li>

                    );
                })}

                <button> Add comment</button>
            </ul>
        </div>
    );
};

export default Commnets;