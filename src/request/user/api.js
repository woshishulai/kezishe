import instance from '../index';
//汇款银行
export const bankList = async (data) => instance.get(`Member/RecordRemittance/Base`, data);

//汇款信息告知单
export const createRecordRemittance = async (data) =>
    instance.post(`/Member/RecordRemittance/Create`, data);

//汇款信息列表
export const recordRemittanceList = async (data) =>
    instance.get(
        `Member/RecordRemittance/GetList?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}`
    );

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

//我的藏品类别 比如已成交 待遇展等等
export const getGoodsCateApi = async (data) => instance.get(`Member/Auction/TypeList`);

//我的藏品类别 比如已成交 待遇展等等
export const getSelectCateApi = async (data) => instance.get(`Member/Auction/BidderTypeList`);

//根据类别获取藏品信息
export const getGoodsListApi = async (params) =>
    instance.get(
        `Member/Auction/GoodsList?Cid=${params.Cid}&StartDateRange=${params.StartDateRange}&EndDateRange=${params.EndDateRange}&Brand=${params.Brand}&Kw=${params.Kw}&Status=${params.Status}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

//获取配送支付方式
export const getZhiFu = async (params) =>
    instance.get(`Member/Pay/GetPayBaseData?OrderType=${params}`);

//获取快递价格
export const getKuaiDi = async (data) => instance.post(`Member/Pay/EMSPostFeeStandard`, data);

//获取我的关注
export const getCartList = async (params) =>
    instance.get(`Member/Collect/GetList?Cid=${params.Cid}&Kw=${params.Kw}&Status=${params.Status}&PageSize=${params.PageSize}&PageIndex=${params.PageSize}
`);

//获取未发货
export const getNotShippedList = async (params) =>
    instance.get(`Member/UserDeliver/UnDeliverList?Bot=${params.Bot}&AuctionType=${params.AuctionType}&DateRange=${params.DateRange}
`);
