import instance from '../index';
import instances from '../indexs';

//汇款银行
export const bankList = async (data) => instances.get(`Member/RecordRemittance/Base`, data);

//汇款信息告知单
export const createRecordRemittance = async (data) =>
    instances.post(`/Member/RecordRemittance/Create`, data);

//汇款信息列表
export const recordRemittanceList = async (data) =>
    instances.get(
        `Member/RecordRemittance/GetList?PageIndex=${data.PageIndex}&PageSize=${data.PageSize}`
    );

//余额详情
export const detailsYuE = async (data) =>
    instances.get(`/Member/RecordBidquota/BalanceToQuotaInfo`, data);

//余额转额度
export const BalanceToQuotaInfo = async (params) =>
    instances.post(`/Member/RecordBidquota/BalanceToQuotaFrom?AdjustQuota=${params}`);
//余额转额度转
export const yuEZhuanEDu = async (data) =>
    instances.get(`/Member/RecordBidquota/BalanceToQuotaInfo`, data);

//余额转额度
export const eDuZhuanYUE = async (params) =>
    instances.get(`/Member/RecordBidquota/QuotaToBalanceInfo`);

//转余额
export const QuotaToBalanceFrom = async (params) =>
    instances.post(`/Member/RecordBidquota/QuotaToBalanceFrom?ReduceQuota=${params}`);

//余额日记帐参数
export const getYuERiJiParams = async (params) =>
    instances.get(`/Member/RecordBidquota/BalanceLogConfig`);

//转余额
export const yuerijizhang = async (params) =>
    instances.post(
        `/Member/RecordBidquota/BalanceLogList?TimeRange=${params.TimeRange}&Kid=${params.Kid}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );
//余额日记帐参数
export const eDuInfoParams = async (params) =>
    instances.get(`/Member/RecordBidquota/BidquotaLogConfig`);

//转余额
export const edumingxi = async (params) =>
    instances.post(
        `/Member/RecordBidquota/BidquotaLogList?TimeRange=${params.TimeRange}&Kid=${params.Kid}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

//优惠券
export const youHuiQuan = async (data) => instances.get(`/Member/Coupon/GetList`, data);

//我的藏品类别 比如已成交 待遇展等等
export const getGoodsCateApi = async (data) => instances.get(`Member/Auction/TypeList?Cbn=` + data);

//我的藏品类别 比如已成交 待遇展等等
export const getSelectCateApi = async (data) => instances.get(`Member/Auction/BidderTypeList`);

//根据类别获取藏品信息
export const getGoodsListApi = async (params) =>
    instances.get(
        `Member/Auction/GoodsList?Cbn=${params.Cbn}&Cid=${params.Cid}&StartDateRange=${params.StartDateRange}&EndDateRange=${params.EndDateRange}&Brand=${params.Brand}&Kw=${params.Kw}&Status=${params.Status}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

//我的委托合同
export const getHeTongApi = async (params) =>
    instances.get(
        `Member/Contract/List?Status=${params.Status}&TimeRange=${params.TimeRange}&Number=${params.Number}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

//我的委托合同详情
export const getHeTongDetailsApi = async (params) =>
    instances.get(`Member/Contract/Detail?Number=${params}`);

//查看结算概况
export const getJieSuanGaiKuo = async (params) =>
    instances.post(`Member/SettleMent/CbnSettList?Cbn=${params}`);

//获取配送支付方式
export const getZhiFu = async (params) =>
    instances.get(`Member/Pay/GetPayBaseData?OrderType=${params}`);

//获取快递价格
export const getKuaiDi = async (data) => instances.post(`Member/Pay/EMSPostFeeStandard`, data);

//获取我的关注
export const getCartList = async (params) =>
    instances.get(`Member/Collect/GetList?Cid=${params.Cid}&Kw=${params.Kw}&Status=${params.Status}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}
`);

//获取未发货
export const getNotShippedList = async (params) =>
    instances.get(`Member/UserDeliver/UnDeliverList?Bot=${params.Bot}&AuctionType=${params.AuctionType}&DateRange=${params.DateRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}
`);
//获取已发货
export const yifahuoapi = async (params) =>
    instances.get(`Member/UserDeliver/DeliverList?Bot=${params.Bot}&AuctionType=${params.AuctionType}&DateRange=${params.DateRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}
`);
//获取发货详情
export const yifahuoDetailsapi = async (params) =>
    instances.get(`Member/UserDeliver/DeliverInfo?DeliverNo=${params.DeliverNo}
`);
//获取支付信息
export const getZhifuInfo = async (params) => instances.post(`Member/Pay/DefaultParam`);

//获取支付信息
export const ZhiFuApi = async (data) => instances.post(`Member/Pay/BalancePay`, data);

//收货
export const shouhuoapi = async (data) =>
    instances.post(`/Member/UserDeliver/ConfirmReceipt`, data);

//按照合同查看明细
export const getJieSuanDetailsApi = async (params) =>
    instances.post(`Member/SettleMent/CbnList?TimeRange=${params.TimeRange}&Kw=${params.Kw}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}
`);
//按照确认单查看明细
export const getQueRenDetailsApi = async (params) =>
    instances.post(`Member/SettleMent/SbnList?DateRange=${params.TimeRange}&Kw=${params.Kw}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}
`);

//按照确认单查看明细
export const getOrderAllInfo = async (params) =>
    instances.post(`Member/SettleMent/SettleCensus
`);

//按照确认单查看明细
export const getJieSuanXiangQing = async (params) =>
    instances.post(`Member/SettleMent/SbnInfo?Sbn=${params}
`);

// 积分参数
export const jifenParams = async (params) =>
    instances.post(`Member/Point/PointConfig
`);

// 获取积分参数
export const getjiFenInfo = async (params) =>
    instances.post(`Member/Point/PointList?TimeRange=${params.TimeRange}&PointFunType=${params.PointFunType}&PointMold=${params.PointMold}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}
`);
