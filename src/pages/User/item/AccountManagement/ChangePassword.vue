<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { handleFinishFailed } from '@/utils/form/rules';
import { getPassWord, changeLoginPassWord, changePayPassWord } from '@/request/api';
import { message } from 'ant-design-vue';
import { useUserInfo } from '@/store/store';
const user = useUserInfo();
let status = reactive({});
const formState = reactive({
    oldLoginPassword: '',
    newLoginPassword: '1234567',
    confirmLoginPassword: '',
    payPassword: '',
    newPayPassword: '12345678',
    confirmPayPassword: ''
});
onMounted(async () => {
    try {
        let res = await getPassWord();
        Object.assign(status, res.Data);
        console.log(status);
    } catch (error) {
        console.log(error);
    }
});

const repasswords = (rule, value) => {
    return new Promise((resolve, reject) => {
        if (value === '') {
            reject('请再次输入密码');
        } else if (value !== formState.newLoginPassword) {
            reject('两次输入密码不一致!');
        } else {
            resolve();
        }
    });
};
const payPasswords = (rule, value) => {
    return new Promise((resolve, reject) => {
        if (value === '') {
            reject('请再次输入密码');
        } else if (value !== formState.newPayPassword) {
            reject('两次输入密码不一致!');
        } else {
            resolve();
        }
    });
};
const resetRules = {
    oldLoginPassword: [
        { required: true, message: '请输入原始密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度应在6-16个字符之间', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符或空格', trigger: 'blur' }
    ],
    newLoginPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度应在6-16个字符之间', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符或空格', trigger: 'blur' }
    ],
    confirmLoginPassword: [{ required: true, validator: repasswords, trigger: ['change', 'blur'] }]
};
const payPasswordRules = {
    payPassword: [
        { required: true, message: '请输入原始密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度应在6-16个字符之间', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符或空格', trigger: 'blur' }
    ],
    newPayPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度应在6-16个字符之间', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符或空格', trigger: 'blur' }
    ],
    confirmPayPassword: [{ required: true, validator: payPasswords, trigger: ['change', 'blur'] }]
};
const onFinish = async () => {
    if (formState.newLoginPassword == formState.oldLoginPassword) {
        message['error']('新旧密码不能相同');
        return;
    } else {
        try {
            let params = {
                Id: user.userInfo.UserId,
                Password: formState.oldLoginPassword,
                NewPassword: formState.newLoginPassword
            };
            let res = await changeLoginPassWord(params);
            if ((res.Total = 1)) {
                Object.keys(formState).forEach((key) => {
                    formState[key] = '';
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};
const onPayFinish = async () => {
    if (formState.newPayPassword == formState.payPassword) {
        message['error']('新旧密码不能相同');
        return;
    } else {
        try {
            let params = {
                Id: user.userInfo.UserId,
                Password: formState.payPassword,
                NewPassword: formState.newPayPassword
            };
            let res = await changePayPassWord(params);
            if (res.Total) {
                Object.keys(formState).forEach((key) => {
                    formState[key] = '';
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
};
</script>

<template>
    <div class="change-password">
        <div class="card-box">
            <div class="title">修改密码</div>
            <div class="form-wrap">
                <div class="change-login-password">
                    <a-form
                        labelAlign="left"
                        :model="formState"
                        name="basicsssssss"
                        :rules="resetRules"
                        :label-col="{ span: 7 }"
                        :wrapper-col="{ span: 15 }"
                        autocomplete="off"
                        @finish="onFinish"
                        @finishFailed="handleFinishFailed"
                    >
                        <h5>登录密码</h5>
                        <a-form-item
                            label="原始密码"
                            name="oldLoginPassword"
                            v-if="status.UserLogPwdStatus"
                        >
                            <a-input-password v-model:value="formState.oldLoginPassword" />
                        </a-form-item>

                        <a-form-item label="新登陆密码" name="newLoginPassword">
                            <a-input-password v-model:value="formState.newLoginPassword" />
                        </a-form-item>
                        <a-form-item label="再次确认登录密码" name="confirmLoginPassword">
                            <a-input-password v-model:value="formState.confirmLoginPassword" />
                        </a-form-item>
                        <a-form-item :wrapper-col="{ offset: 7, span: 15 }">
                            <a-button type="primary" html-type="submit">确认</a-button>
                        </a-form-item>
                    </a-form>
                </div>
                <div class="change-shipping-password">
                    <a-form
                        labelAlign="left"
                        :model="formState"
                        :rules="payPasswordRules"
                        name="bddddddasic"
                        :label-col="{ span: 7 }"
                        :wrapper-col="{ span: 15 }"
                        autocomplete="off"
                        @finish="onPayFinish"
                        @finishFailed="handleFinishFailed"
                    >
                        <h5>支付密码</h5>
                        <a-form-item
                            label="原支付密码"
                            name="payPassword"
                            v-if="status.UserPayPwdStatus"
                        >
                            <a-input-password v-model:value="formState.payPassword" />
                        </a-form-item>

                        <a-form-item label="新支付密码" name="newPayPassword">
                            <a-input-password v-model:value="formState.newPayPassword" />
                        </a-form-item>
                        <a-form-item label="再次确认支付密码" name="confirmPayPassword">
                            <a-input-password v-model:value="formState.confirmPayPassword" />
                        </a-form-item>
                        <a-form-item :wrapper-col="{ offset: 7, span: 15 }">
                            <a-button type="primary" html-type="submit">确认</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.change-password {
    .form-wrap {
        .flex-row;
        align-items: flex-start;
        padding: 40px 30px 20px 0px;

        h5 {
            font-size: 18px;
            margin-bottom: 23px;
        }

        .change-login-password {
            flex: 1;
            padding: 0 0 0 40px;
            border-right: 1px solid #dbdbdb;
        }

        .change-shipping-password {
            padding: 0 0 0 40px;
            flex: 1;
        }
    }
}
</style>
