import axios from 'axios';
import { message } from 'ant-design-vue';
import { useLoading, useUserInfo } from '@/store/store';
const instance = axios.create({
    // axios 的一些配置，baseURL  timeout
    //开发
    baseURL: '/api',
    //生产
    // baseURL: 'http://apikzs.sc798.com',
    timeout: 5000
});
const Loading = useLoading();
instance.interceptors.request.use(
    (config) => {
        const user = useUserInfo();
        Loading.changeSpinning(true);
        let token = user.userInfo?.ApiToken;
        if (token && config.headers) {
            config.headers = config.headers || {};
            // config.headers["Authorization"] = 'ApiToken' + token;
            config.headers.ApiToken = token;
        }
        console.log('请求带数据', config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    (res) => {
        Loading.changeSpinning(false);
        //个人信息返回缺少tag
        res.data.Tag == 1 ? console.log('返回的数据', res) : message['error'](res.data.Message);
        return res.data;
    },
    (resError) => {
        Loading.changeSpinning(false);
        console.log('返回的错误', resError);
        if (resError && resError.response) {
            switch (resError.response.status) {
                case 400:
                    resError.message = '请求错误(400)';
                    break;
                case 401:
                    resError.message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    resError.message = '拒绝访问(403)';
                    break;
                case 404:
                    resError.message = '请求出错(404)';
                    break;
                case 408:
                    resError.message = '请求超时(408)';
                    break;
                case 500:
                    resError.message = '服务器错误(500)';
                    break;
                case 501:
                    resError.message = '服务未实现(501)';
                    break;
                case 503:
                    resError.message = '服务不可用(503)';
                    break;
                case 505:
                    resError.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    resError.message = `连接出错(${resError.response.status})!`;
            }
        }
        message['error'](resError.message);
        return Promise.reject(resError);
    }
);

export default instance;
