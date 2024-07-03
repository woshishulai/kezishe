import instance from '../index';
import instances from '../indexs';
//专场首页
export const getZhuanChangHomeApi = (params) =>
    instances.get(`/Web/Auction/Special?Types=${params.Types}`);

//藏品列表
export const goodsListAPi = (params) =>
    instances.post(
        `Web/Auction/Query?Stype=${params.Stype}&KeyWd=${params.KeyWd}&Cate1=${params.Cate1}&Cate2=${params.Cate2}&Lid=${params.Lid}&AuctionStatuses=${params.AuctionStatuses}&AuctionBrands=${params.AuctionBrands}&CategoryIds=${params.CategoryIds}&Grades=${params.Grades}&Sort=${params.Sort}&DateStart=${params.DateStart}&DateEnd=${params.DateEnd}&TimeRange=${params.TimeRange}&PriceRange=${params.PriceRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );
//获取商品详情
export const getGoodsDetails = (params) => instances.get(`Web/Auction/GoodInfo?Id=${params}`);

//获取收货地址
export const getAddress = (params) => instances.get(`Web/Area/ExpressPrice`);

//藏品出价格
export const addPriceApi = (data) => instances.post(`Web/Auction/BidSave`, data);

//取消藏品出价
export const removePriceApi = (data) =>
    instances.post(`Web/Auction/CancelProxy?Gid=${data.Gid}&ProxyId=${data.ProxyId}`);

//添加收藏
export const savaGoodsApi = (data) => instances.post(`Web/Collect/Save`, data);

//竞买藏品 经脉中 个人中心
export const getJingMaiApi = (params) =>
    instances.get(
        `Member/UserAuction/BidList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//已得标 个人中心
export const getYiDeBiaoApi = (params) =>
    instances.get(
        `Member/UserAuction/WonList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//未得标 个人中心
export const getWeiDeBiaoApi = (params) =>
    instances.get(
        `Member/UserAuction/NoWinList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );
//未支付 个人中心
export const getWeiZhiFuApi = (params) =>
    instances.get(
        `Member/UserAuction/UnPayList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );
//不支付 个人中心
export const getBuZhiFuApi = (params) =>
    instances.get(
        `Member/UserAuction/NoPayList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//未支付提交订单
export const sumbitOrder = (data) => instances.post(`Member/Pay/OrderSave`, data);

//竞买状态分类
export const getJingMaiCateAPi = (data) =>
    instances.post(`Member/UserAuction/GoodsOrderTypeConfig`, data);
