import axios from "../utils/request";

// 查询用户信息
export const submitMessage = (data) => {
    return axios({
        url: "/api/message/submitMessage",
        method: "post",
        data
    });
};