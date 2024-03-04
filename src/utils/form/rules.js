import { message } from 'ant-design-vue';
const handleFinishFailed = (err) => {
    err.errorFields.forEach((field) => message['error'](field.errors[0]));
};
export { handleFinishFailed };
