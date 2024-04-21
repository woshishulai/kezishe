import instance from '../index';

//收购信息
export const getMenuList = async (params) =>
    instance.get(`/Web/NewsHelp/Category?Pid=698887626106605568`);
