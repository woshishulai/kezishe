import instance from '../index';

//收购信息
export const getMenuList = async (params) =>
    instance.get(`/Web/NewsHelp/Category?Pid=${params.Pid}`);
//收购菜单页面
export const getLeftMenuList = async (params) =>
    instance.get(
        `/Web/NewsHelp/ColumnList?Id=${params.Id}&PageSize=${params.PageSize}&PageIndex=${params.PageIndex}`
    );

//收购文章详情
export const getInfoDetails = async (params) =>
    instance.get(`/Web/NewsHelp/ArticleData?Aid=${params}`);
