import instance from '../index';
//汇款银行
export const bankList = async (data) => instance.get(`Member/RecordRemittance/Base`, data);

//汇款信息告知单
export const createRecordRemittance = async (data) =>
    instance.post(`/Member/RecordRemittance/Create`, data);

//汇款信息列表
export const recordRemittanceList = async (data) =>
    instance.get(`/Member/RecordRemittance/GetList`, data);

//余额详情
export const detailsYuE = async (data) =>
    instance.get(`/Member/RecordBidquota/BalanceToQuotaInfo`, data);

//余额转额度
export const BalanceToQuotaInfo = async (params) =>
    instance.post(`/Member/RecordBidquota/BalanceToQuotaFrom?AdjustQuota=${params}`);
//余额转额度转
export const yuEZhuanEDu = async (data) =>
    instance.get(`/Member/RecordBidquota/BalanceToQuotaInfo`, data);

//余额转额度
export const eDuZhuanYUE = async (params) =>
    instance.get(`/Member/RecordBidquota/QuotaToBalanceInfo`);

//转余额
export const QuotaToBalanceFrom = async (params) =>
    instance.post(`/Member/RecordBidquota/QuotaToBalanceFrom?ReduceQuota=${params}`);

//优惠券
export const youHuiQuan = async (data) => instance.get(`/Member/Coupon/GetList`, data);
