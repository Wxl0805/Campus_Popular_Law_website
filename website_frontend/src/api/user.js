import axios from "../utils/request";

// 查询用户信息
export const queryInfo = (data) => {
    return axios({
        url: "/api/front_user/query/" + data,
        method: "get",
    });
};

// 修改用户信息
export const setInfo = (data) => {
    return axios({
        url: "/api/front_user/modify",
        method: "post",
        data
    });
};