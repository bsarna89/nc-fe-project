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

export function fetchArticleById(id) {


    return axios
        .get(`https://nc-news-b.herokuapp.com/api/articles/${id}`)
        .then((response) => {

            return response.data;
        });
}

export function fetchSortedArticlesByParams(params) {

    //`https://nc-news-b.herokuapp.com/api/articles/?sortby=${params[0]}&order=${params[1]}`

    return axios
        .get(`https://nc-news-example-seminar-3-4.herokuapp.com/api/articles/?sort_by=${params[0]}&order=${params[1]}`)
        .then((response) => {

            return response.data;
        });
}