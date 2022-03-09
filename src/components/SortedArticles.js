import React from 'react';
import { useState, useEffect } from 'react';
import { fetchSortedArticlesByParams } from '../utils/api';
import { Link } from 'react-router-dom';
import dateTransformer from '../utils/dateTransformer';
import Loader from './Loader';
import ErrorComp from './ErrorComp';


const SortedArticles = () => {

    const [sortParameters, setSortParameters] = useState("created_at");
    const [orderParameters, setOrderParameters] = useState("DESC");
    const [submitParamters, setSubmitParameters] = useState();
    const [articles, setArticles] = useState([]);

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const urlString = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fIN36i6PHWoGOdaalRtIXnbTbPdkYe2FtzvgV-cYvZDEZDn8M1qL56S3hcrmSdFaNw&usqp=CAU";

    useEffect(() => {

        if (submitParamters) {

            setLoading(true);
            fetchSortedArticlesByParams(submitParamters).then(({ articles }) => {

                setArticles(articles);
                setLoading(false);

            }).catch((err) => {

                setError({ err });
                setLoading(false);
            })
        }
        else {

            setLoading(false);
        };
    }, [submitParamters])



    const handleChangeSort = (event) => {

        setSortParameters(event.target.value);
    }

    const handleChangeOrder = (event) => {

        setOrderParameters(event.target.value);
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setSubmitParameters([sortParameters, orderParameters]);
    }

    const handleClear = () => {

        setSubmitParameters(null);
    }

    if (isLoading) return (<Loader> </Loader>);

    if (error) { return <ErrorComp message={error} />; }

    return (
        <div>
            <form onSubmit={handleSubmit} onReset={handleClear}>
                <label>Choose articles by:</label>
                <select value={sortParameters} onChange={handleChangeSort}>
                    <option value="created_at">Date</option>
                    <option value="article_id">ID</option>
                    <option value="votes">Votes</option>
                    <option value="comment_count">Number of Commets</option>
                </select>
                <label>Choose order by:</label>
                <select value={orderParameters} onChange={handleChangeOrder}>
                    <option value="ASC"> Ascending</option>
                    <option value="DESC"> Descending</option>
                </select>
                <button type="submit"> Submit</button>
                <button type="reset"> Clear</button>
            </form>

            {submitParamters &&
                <div>
                    <ul className='list'>
                        {articles.map((article) => {
                            let display;
                            if (submitParamters[0] === "created_at") {
                                display = dateTransformer(article.created_at);
                            } else { display = article[submitParamters[0]]; }

                            return (
                                <li key={article.article_id} className='title' >
                                    <p> {article.title}</p>
                                    <p> {submitParamters[0]} : {display}</p>
                                    <Link to={`/articles/${article.article_id}`} className='link'>
                                        <img src={urlString} className='go-img' alt="Read Article"></img>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SortedArticles;