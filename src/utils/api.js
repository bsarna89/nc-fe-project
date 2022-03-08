import axios from "axios";

export function fetchArticles() {

    return axios
        .get("https://nc-news-b.herokuapp.com/api/articles")
        .then((response) => {

            return response.data;
        });
}