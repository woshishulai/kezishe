import instance from '../index';
//汇款信息告知单
export const createRecordRemittance = async (data) =>
    instance.post(`/Member/RecordRemittance/Create`, data);

//汇款信息列表
export const recordRemittanceList = async (data) =>
    instance.get(`/Member/RecordRemittance/GetList`, data);
