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

    return axios
        .get(`https://nc-news-b.herokuapp.com/api/articles/?sortby=${params[0]}&order=${params[1]}`)
        .then((response) => {

            return response.data;
        });
}

export function fetchUser(username) {

    if (!username) username = "not_user";

    return axios
        .get(`https://nc-news-b.herokuapp.com/api/users/${username}`)
        .then((response) => {
            return response.data;
        });
}

export function fetchComments(id) {

    return axios
        .get(`https://nc-news-b.herokuapp.com/api/articles/${id}/comments`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
}