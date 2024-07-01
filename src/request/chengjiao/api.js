import instance from '../index';

// 专场列表
export const fetChZhuanChangAPi = (params) =>
    instance.post(
        `Web/Transation/Special?Years=${params.Years}&Month=${params.Month}&CategoryIds=${params.CategoryIds}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

//成交商品列表
export const goodsListAPi = (params) =>
    instance.post(
        `Web/Auction/Query?Stype=3&KeyWd=${params.KeyWd}&Cate1=${params.Cate1}&Cate2=${params.Cate2}&Lid=${params.Lid}&CategoryIds=${params.CategoryIds}&Grades=${params.Grades}&Sort=${params.Sort}&DateStart=${params.DateStart}&DateEnd=${params.DateEnd}&TimeRange=${params.TimeRange}&PriceRange=${params.PriceRange}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );
