import axios from "../utils/request";

// 分页获取视频
export const getVideo = (data) => {
    return axios({
        url: "/api/video/page",
        method: "post",
        data
    });
};

// 按id获取视频
export const getVideoById = (data) => {
    return axios({
        url: "/api/video/query/" + data,
        method: "get",
    });
};