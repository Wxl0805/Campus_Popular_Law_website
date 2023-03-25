import axios from "../utils/request";

// 登录
export const login = (data) => {
    return axios({
        url: "/api/front_login_register/login",
        method: "post",
        data,
    });
};