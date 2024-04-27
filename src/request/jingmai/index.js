import instance from '../index';
//专场首页
export const getZhuanChangHomeApi = (params) =>
    instance.get(`/Web/Auction/Special?Types=${params.Types}`);

//藏品列表
export const goodsListAPi = (params) =>
    instance.post(
        `Web/Auction/Query?Stype=${params.Stype}&KeyWd=${params.KeyWd}&Cate1=${params.Cate1}&Cate2=${params.Cate2}&Lid=${params.Lid}&AuctionStatuses=${params.AuctionStatuses}&AuctionBrands=${params.AuctionBrands}&CategoryIds=${params.CategoryIds}&Grades=${params.Grades}&Sort=${params.Sort}&DateStart=${params.DateStart}&DateEnd=${params.DateEnd}&TimeRange=${params.TimeRange}&PriceRange=${params.PriceRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );
//获取商品详情
export const getGoodsDetails = (params) => instance.get(`Web/Auction/GoodInfo?Id=${params}`);

//获取收货地址
export const getAddress = (params) => instance.get(`Web/Area/ExpressPrice`);

//藏品出价格
export const addPriceApi = (data) => instance.post(`Web/Auction/BidSave`, data);

//取消藏品出价
export const removePriceApi = (data) =>
    instance.post(`Web/Auction/CancelProxy?Gid=${data.Gid}&ProxyId=${data.ProxyId}`);

//添加收藏
export const savaGoodsApi = (data) => instance.post(`Web/Collect/Save`, data);

//竞买藏品 经脉中 个人中心
export const getJingMaiApi = (params) =>
    instance.get(
        `Member/UserAuction/BidList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//已得标 个人中心
export const getYiDeBiaoApi = (params) =>
    instance.get(
        `Member/UserAuction/WonList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );

//未得标 个人中心
export const getWeiDeBiaoApi = (params) =>
    instance.get(
        `Member/UserAuction/NoWinList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );
//未支付 个人中心
export const getWeiZhiFuApi = (params) =>
    instance.get(
        `Member/UserAuction/UnPayList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );
//不支付 个人中心
export const getBuZhiFuApi = (params) =>
    instance.get(
        `Member/UserAuction/NoPayList?Title=${params.Title}&Status=${params.Status}&Times=${params.Times}&PageIndex=${params.PageIndex}&PageSize=${params.PageSize}`
    );
