import instance from '../index';
//专场首页
export const getZhuanChangHomeApi = (params) =>
    instance.get(`/Web/Auction/Special?Types=${params.Types}`);

//藏品列表
// export const goodsListAPi = (params) =>
//     instance.post(
//         `Web/Auction/Query?Cate1=${params.Cate1 || ''}&Cate2=${params.Cate2}&Lid=${
//             params.Lid
//         }&AuctionStatuses=${params.AuctionStatuses || ''}&AuctionBrands=${
//             params.AuctionBrands || ''
//         }&CategoryIds=${params.CategoryIds || ''}&Grades=${params.Grades || ''}&Sort=${
//             params.Sort || 0
//         }&DateStart=${params.DateStart || ''}&DateEnd=${params.DateEnd || ''}&TimeRange=${
//             params.TimeRange || ''
//         }&PriceRange=${params.PriceRange || ''}&PageSize=${params.PageSize || ''}&PageIndex=${
//             params.PageSize || 1
//         }`
//     );
export const goodsListAPi = (params) =>
    instance.post(
        `Web/Auction/Query?Cate1=2&Cate2=0&Lid=655038971692191744&AuctionStatuses=1&AuctionBrands=1&CategoryIds=655035684737781760&Grades=&Sort=0&DateStart=&DateEnd=&TimeRange=0&PriceRange=0,N&PageSize=2&PageIndex=1`
    );

//获取商品详情
export const getGoodsDetails = (params) =>
    instance.get(`Web/Auction/GoodInfo?Id=695276069955047424`);

//获取收货地址
export const getAddress = (params) => instance.get(`Web/Area/ExpressPrice`);
