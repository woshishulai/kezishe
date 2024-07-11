import instance from './index';
import instances from './indexs';

//tabbar
export const getTabbatList = async () => instances.get('/Web/Auction/Columns');

//登录
export const submitLoginApi = async (data) => instances.post('/Web/Logon/LoginPwd', data);

//手机验证码登录
export const phoneCodeLogin = async (data) => instances.post('/Web/Logon/LoginByMobile', data);

//获取短信验证码
export const getCodeLogin = async (data) =>
    instances.post(`Web/Logon/GetMobileCode?Mobile=${data.Mobile}&SType=${data.SType}`);

//账号注册
export const registerLogin = async (data) => instances.post('/Web/Logon/SignUp', data);

//用户资料完成度
export const getUserDetailsApi = async () => instances.get('/Member/User/ProfileInfo');

//个人信息
export const getUserInfoApi = async () => instances.get('/Member/User/PersonInfo');

//个人等级
export const getUserLevel = async (data) => instances.post(`/Member/UserLevel/Info`);

//获取oss签名
export const getOssALiBaBaApi = async (data) =>
    instances.post(`/File/GetSignature?fileModule=${data.fileModule}&fileName=${data.fileName}`);

//修改个人信息
export const changeUserInfo = async (data) => instances.put('/Member/User/UpdateBase', data);

//修改个人联系方式
export const changeUserCallInfo = async (data) => instances.put('/Member/User/UpdateContact', data);

//个人地址
export const getUserAddressApi = async () => instances.get('/Member/Address/GetList');

//删除个人地址
export const removeUserAddressApi = async (params) =>
    instances.delete(`/Member/Address/Delete?Id=${params}`);

//修改个人地址
export const changeUserAddressInfo = async (data) => instances.put('/Member/Address/Update', data);

//默认个人地址
export const defaultUserAddressInfo = async (data) =>
    instances.post(`Member/Address/SetDefault?id=${data}`);

//添加个人收货地址
export const addUserAddressInfo = async (data) => instances.post(`/Member/Address/Create`, data);

// 银行卡列表
export const getUserBankInfo = async (params) => instances.get(`/Member/UserCard/GetList`);

//删除银行卡
export const removeUserBankApi = async (params) =>
    instances.delete(`/Member/UserCard/Delete?Id=${params}`);

//修改银行卡
export const changeUserBankInfo = async (data) => instances.put('/Member/UserCard/Update', data);

//默认银行卡
export const defaultUserBankInfo = async (data) =>
    instances.post(`Member/UserCard/SetDefault?id=${data}`);

//添加银行卡
export const addUserBankInfo = async (data) => instances.post(`Member/UserCard/Create`, data);

//获取密码
export const getPassWord = async () => instances.get('/Member/User/DefaultPwdStatus');

//修改登录密码
export const changeLoginPassWord = async (data) =>
    instances.post(`Member/User/ChangePassword`, data);

//修改支付密码
export const changePayPassWord = async (data) => instances.post(`/Member/User/ChangePayword`, data);

//昵称列表
export const getUserNikeNameApi = async () => instances.get('/Member/UserNick/GetList');

//删除昵称
export const removeNickNameApi = async (query) =>
    instances.delete(`/Member/UserNick/Delete?Id=${query}`);

//修改昵称
export const changeUserNickName = async (data) => instances.put('/Member/UserNick/Update', data);

//添加昵称
export const addUserNickName = async (data) => instances.post(`/Member/UserNick/Create`, data);

//设置默认
export const defaultUserNickName = async (data) =>
    instances.post(`Member/UserNick/SetDefault?Id=${data}`);

// 我的委托
export const getUserCommissionContractListApi = async (query) =>
    instances.get(
        `/Member/Contract/List?Status=${query.status}&TimeRange=${query.timeRange}&Number=${query.number}&PageSize=${query.pageSize}&PageIndex=${query.pageIndex}`
    );

// 我的藏品
// export const getUserCollectionListApi = async (params) =>
//     instances.get(
//         `/Member/Goods/List??Cid=${params.cid}&StartDateRange=${params.start}&EndDateRange=${params.end}&Brand=${params.brand}&Kw=${params.kw}&Status=${params.status}&PageSize=${params.pageSize}&PageIndex=${params.pageIndex}`
//     );

// // 我的合同
// export const getUserContractListApi = async (params) =>
//     instances.get(
//         `/Member/Goods/List??Status=${params.Status}&TimeRange=${params.TimeRange}&Number=${params.enNumberd}&PageSize=${params.pageSize}&PageIndex=${params.pageIndex}`
//     );

// 国家省市
export const getCountList = async (params) => instances.get(`/Member/Address/AreaList`);

//加密
export const getCodeParams = async (params) => instances.get(`/Web/Common/GetPublicKey`);

//获取邮件
export const getMailApi = async (params) =>
    instances.get(
        `Member/Mail/GetMailReceiveList?PageIndex=${params.page}&PageSize=${params.pageSize}`
    );
//查看邮件详情
export const getMailDetailsApi = async (params) =>
    instances.get(`Member/Mail/GetMailInfo?Id=${params.id}&FormType=${params.FormType}`);

//写信
export const addMailTo = async (data) => instances.post(`Member/Mail/Save`, data);

//获取草稿箱
export const getCaoGaoApi = async (params) =>
    instances.get(
        `Member/Mail/GetMailDrafList?PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//获取发件箱
export const getFaSongApi = async (params) =>
    instances.get(
        `Member/Mail/GetMailSentList?PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//获取发件箱
export const removeMail = async (data) => instances.post(`Member/Mail/Delete`, data);

//获取确认合同详情
export const getConfirmDetails = async (params) =>
    instances.get(`Member/Mail/ContractConfirm?ConfirmId=${params.id}`);
//确认合同
export const confirmOrder = async (params) =>
    instances.post(`Member/Mail/SaveContractConfirm?ConfirmId=${params.id}`);

//帮助中心
export const getHelp = async (params) => instances.get(`Web/NewsHelp/HelperCategory`);

// 搜索
export const searchValue = async (params) =>
    instance.post(
        `Web/Search/List?Stype=${params.Stype}&KeyWd=${params.KeyWd}&AuctionStatuses=${params.AuctionStatuses}&CategoryIds=${params.CategoryIds}&Grades=${params.Grades}&Sorts=${params.Sort}&DateStart=${params.DateStart}&DateEnd=${params.DateEnd}&TimeRange=${params.TimeRange}&PriceRange=${params.PriceRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );
