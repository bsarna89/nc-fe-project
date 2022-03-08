import React from 'react';
import { useState, useEffect } from 'react';

const SortedArticles = () => {


    const [sortParameters, setSortParameters] = useState();



    return (
        <div>
            <form>
                <label>Choose articles by:</label>
                <select>
                    <option value="created_at">Date</option>
                    <option value="article_id">ID</option>
                    <option value="votes">Votes</option>
                    <option value="comment_count">Number of Commets</option>
                </select>

            </form>
        </div>
    );
};

export default SortedArticles;