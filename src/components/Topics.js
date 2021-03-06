import React from 'react';
import { useState, useEffect } from 'react';
import { fetchTopics } from '../utils/api';
import Loader from './Loader';
import ErrorComp from './ErrorComp';
import { Link } from 'react-router-dom';



const Topics = () => {


    const [topics, setTopics] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopics().then(({ topics }) => {

            setTopics(topics);
            setLoading(false);
        }).catch((err) => {

            setError({ err });
            setLoading(false);
        })

    }, []);

    if (isLoading) return (<Loader> </Loader>);

    if (error) { return <ErrorComp message={error} />; }

    return (
        <div>
            <ul className='list'>
                {topics.map((topic) => {
                    return (
                        <li key={topic.slug} className='title'>
                            <p> Topic is : {topic.slug}</p>
                            <p> {topic.description}</p>
                            <Link to={`/articles/topic/${topic.slug}`} className='link'>
                                get articles by topic
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Topics; <p> Topics </p>