import instance from '../index';

// 获取委托栏目导航
export const getWeiTuoNavApi = () => instance.get('/Web/Entrust/Category');

// 获取每个栏目的信息
export const getMenuListAPi = (query) =>
    instance.get('/Web/Entrust/ColumnContInfo?id=' + query.id + '&' + 'coltype=' + query.coltype);

// 上传线上委托

export const submitWeituoAPi = (data) => instance.post('/Web/Entrust/Apply', data);

export const getExpertAPi = (query) => instance.get('/Web/Entrust/ArticleData?Aid=' + query);
