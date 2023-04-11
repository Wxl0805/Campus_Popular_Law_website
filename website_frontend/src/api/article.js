import axios from "../utils/request";

// 分页获取文章
export const getArticle = (data) => {
    return axios({
        url: "/api/article/page",
        method: "post",
        data
    });
};

// 按id获取文章
export const getArticleById = (data) => {
    return axios({
        url: "/api/article/query/" + data,
        method: "get",
    });
};