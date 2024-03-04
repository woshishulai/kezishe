import instance from './index';

export const submitLoginApi = async (data) => instance.post('/Member/Logon/LoginPwd', data);

//用户资料完成度
export const getUserDetailsApi = async () => instance.get('/Member/User/ProfileInfo');

//个人信息
export const getUserInfoApi = async () => instance.get('/Member/User/PersonInfo');

//获取oss签名
export const getOssALiBaBaApi = async (data) =>
    instance.post(`/File/GetSignature?fileModule=${data.fileModule}&fileName=${data.fileName}`);

//修改个人信息
export const changeUserInfo = async (data) => instance.put('/Member/User/UpdateBase', data);

//修改个人联系方式
export const changeUserCallInfo = async (data) => instance.put('/Member/User/UpdateContact', data);

//个人地址
export const getUserAddressApi = async () => instance.get('/Member/Address/GetList');

//删除个人地址
export const removeUserAddressApi = async (params) =>
    instance.delete(`/Member/Address/Delete?Id=${params}`);

//修改个人地址
export const changeUserAddressInfo = async (data) => instance.put('/Member/Address/Update', data);

//默认个人地址
export const defaultUserAddressInfo = async (data) =>
    instance.post(`Member/Address/SetDefault?id=${data}`);

//添加个人收货地址
export const addUserAddressInfo = async (data) => instance.post(`/Member/Address/Create`, data);

// 银行卡列表
export const getUserBankInfo = async (params) => instance.get(`/Member/UserCard/GetList`);

//删除银行卡
export const removeUserBankApi = async (params) =>
    instance.delete(`/Member/UserCard/Delete?Id=${params}`);

//修改银行卡
export const changeUserBankInfo = async (data) => instance.put('/Member/UserCard/Update', data);

//默认银行卡
export const defaultUserBankInfo = async (data) =>
    instance.post(`Member/UserCard/SetDefault?id=${data}`);

//添加银行卡
export const addUserBankInfo = async (data) => instance.post(`Member/UserCard/Create`, data);

//获取密码
export const getPassWord = async () => instance.get('/Member/User/DefaultPwdStatus');

//修改登录密码
export const changeLoginPassWord = async (data) =>
    instance.post(`Member/User/ChangePassword`, data);

//修改支付密码
export const changePayPassWord = async (data) => instance.post(`/Member/User/ChangePayword`, data);

//昵称列表
export const getUserNikeNameApi = async () => instance.get('/Member/UserNick/GetList');

//删除昵称
export const removeNickNameApi = async (query) =>
    instance.delete(`/Member/UserNick/Delete?Id=${query}`);

//修改昵称
export const changeUserNickName = async (data) => instance.put('/Member/UserNick/Update', data);

//添加昵称
export const addUserNickName = async (data) => instance.post(`/Member/UserNick/Create`, data);

//设置默认
export const defaultUserNickName = async (data) =>
    instance.post(`Member/UserNick/SetDefault?Id=${data}`);

// 我的委托
export const getUserCommissionContractListApi = async (query) =>
    instance.get(
        `/Member/Contract/List?Status=${query.status}&TimeRange=${query.timeRange}&Number=${query.number}&PageSize=${query.pageSize}&PageIndex=${query.pageIndex}`
    );

// 我的藏品
export const getUserCollectionListApi = async (params) =>
    instance.get(
        `/Member/Goods/List??Cid=${params.cid}&StartDateRange=${params.start}&EndDateRange=${params.end}&Brand=${params.brand}&Kw=${params.kw}&Status=${params.status}&PageSize=${params.pageSize}&PageIndex=${params.pageIndex}`
    );

// 我的合同
export const getUserContractListApi = async (params) =>
    instance.get(
        `/Member/Goods/List??Status=${params.Status}&TimeRange=${params.TimeRange}&Number=${params.enNumberd}&PageSize=${params.pageSize}&PageIndex=${params.pageIndex}`
    );
