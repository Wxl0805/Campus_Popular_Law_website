import axios from "../utils/request";

// 提交留言
export const submitMessage = (data) => {
    return axios({
        url: "/api/message/submitMessage",
        method: "post",
        data
    });
};

// 分页获取留言
export const getMessage = (data) => {
    return axios({
        url: "/api/message/page",
        method: "post",
        data
    });
};

// 按id获取留言
export const getMessageByid = (data) => {
    return axios({
        url: "/api/message/query/" + data,
        method: "get",
    });
};