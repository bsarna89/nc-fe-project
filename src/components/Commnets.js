import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { addComments, fetchComments, deleteComment } from '../utils/api';
import ErrorComp from './ErrorComp';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { userContext } from '../context/Context';



const Commnets = () => {

    const { article_id } = useParams();
    const { loggedInUser } = useContext(userContext);

    const [comments, setComments] = useState([]);
    const [defaultComment, setDefaultComment] = useState("");

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
    }, [article_id, defaultComment]);

    const handleAddComment = (event) => {

        event.preventDefault();
        setComments(() => {
            const commentsNew = [...comments];
            commentsNew.push({ body: event.target[0].value, author: loggedInUser.username });
            return commentsNew;
        })

        addComments({ username: loggedInUser.username, body: event.target[0].value, }, article_id).then((response) => {

            setDefaultComment("");
        }).catch((err) => {
            setError({ err });
        })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        const id = event.target.value;
        console.log(id, "params");


        setComments(() => {
            const commentsNew = comments.filter((comment) => { return comment.comment_id !== parseInt(id); })
            return commentsNew;
        })

        deleteComment(id).then(() => { }).catch((err) => {
            setError({ err });
        })

    }

    const handleChange = (event) => {
        setDefaultComment(event.target.value);
    }



    if (isLoading) return (<Loader> </Loader>);
    if (error) { return <ErrorComp message={error} />; }
    if (!loggedInUser.username) {
        return (
            <div>
                <p> You need to be logged to see comments</p>
            </div>
        );
    }

    return (
        <div>

            <ul className='list'>
                <Link to={`/articles/${article_id}`}> <button> Go back to article</button></Link>
                {comments.map((comment, index) => {
                    return (

                        <li key={index} className='article' >
                            <p> {comment.author}</p>
                            <p> {comment.body}</p>
                            {loggedInUser.username === comment.author &&
                                <button value={comment.comment_id} onClick={handleDelete}> Delete comment</button>
                            }
                        </li>

                    );
                })}

                <li>
                    <form onSubmit={handleAddComment}>
                        <legend> Add your comment here </legend>
                        <textarea onChange={handleChange} value={defaultComment || ""} id="text" name="text_form" rows="4" cols="30"></textarea>
                        <button type="submit"> Add Comment </button>
                    </form>
                </li>
            </ul>
        </div>
    );
};

export default Commnets;