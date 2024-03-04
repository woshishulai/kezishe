const getPhone = (formState) => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    const phoneNumber = formState.phone;
    const isPhoneValid = phoneRegex.test(phoneNumber);
    if (!isPhoneValid) {
        info('error', '请输入正确的手机号');
    }
    return isPhoneValid;
};
const getCode = (formState, countdown) => {
    const isPhoneValid = getPhone(formState);
    if (isPhoneValid) {
        countdown = 60;
        // getPhoneCodeApi(formState.phone) //获取验证码的API
        // info("success", '验证码发送成功请输入验证码')
        const interval = setInterval(() => {
            countdown.value > 0 ? countdown.value-- : clearInterval(interval);
        }, 1000);
    }
};
export { getPhone, getCode };
