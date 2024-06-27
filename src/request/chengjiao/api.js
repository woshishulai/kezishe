import instance from '../index';

//初始化数据
export const fetchDataApi = (params) =>
    instance.post(
        `Web/Auction/Query?Stype=3&KeyWd=${params.KeyWd}&Cate1=2&Cate2=0&Lid=${params.Lid}&AuctionStatuses=${params.AuctionStatuses}&AuctionBrands=${params.AuctionBrands}&CategoryIds=${params.CategoryIds}&Grades=${params.Grades}&Sort=${params.Sort}&DateStart=${params.DateStart}&DateEnd=${params.DateEnd}&TimeRange=${params.TimeRange}&PriceRange=${params.PriceRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

// 专场列表
export const fetChZhuanChangAPi = (params) =>
    instance.post(
        `Web/Transation/Special?Years=${params.Years}&Month=${params.Month}&CategoryIds=${params.CategoryIds}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );
