import axios from "axios";

export function fetchArticles() {


    return axios
        .get(`https://nc-news-b.herokuapp.com/api/articles`)
        .then((response) => {

            return response.data;
        });
}

export function fetchTopics() {

    return axios
        .get("https://nc-news-b.herokuapp.com/api/topics")
        .then((response) => {

            return response.data;
        });
}

export function fetchArticlesByTopic(params) {

    return axios
        .get(`https://nc-news-b.herokuapp.com/api/articles/?topic=${params}`)
        .then((response) => {

            return response.data;
        });
}