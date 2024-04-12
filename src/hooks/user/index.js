import { info } from '../antd/message';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
export const isAddActive = (arr, value) => {
    if (!Array.isArray(arr)) {
        return false;
    }

    const result = arr.find((item) => item.Profile === value);
    return result && result.IsAuth == 1;
    //备注 arr是数组，value是关键字
};

//手机校验
export const rulesPhone = (value) => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    const isPhoneValid = phoneRegex.test(value);
    if (!isPhoneValid) {
        info('error', '请输入正确的手机号');
    }
    return isPhoneValid;
};

//数据加密

export const encryptionPassword = (passwordObject, codes, id) => {
    let params = {};
    const encrypt = new JSEncrypt(); //创建实例
    const pubKey = codes; //密钥
    encrypt.setPublicKey(pubKey); //添加密钥
    for (let i in passwordObject) {
        params[i] = encrypt.encrypt(passwordObject[i]);
    }
    params.Id = id;
    return params;
};
