<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { handleFinishFailed } from '@/utils/form/rules';
import { getPassWord, changeLoginPassWord, changePayPassWord } from '@/request/api';
import { message } from 'ant-design-vue';
import { info } from '@/hooks/antd/message';
import { useUserInfo, usePassword } from '@/store/store';
import { getCodeParams } from '@/request/api';
import { encryptionPassword } from '@/hooks/user';
const user = useUserInfo();
const newCodeParams = usePassword();
let status = reactive({});
const formState = reactive({
    oldLoginPassword: '1234567',
    newLoginPassword: '12345678',
    confirmLoginPassword: '12345678',
    payPassword: '123456723',
    newPayPassword: '1234567823',
    confirmPayPassword: '1234567823'
});
onMounted(() => {
    const codeTime = newCodeParams.codePasswords.ExpireTime;
    const currentTime = Date.now();
    if (!currentTime || currentTime > codeTime) {
        Promise.all([getPasswordStatus(), getCodeParamsApi()]);
    } else {
        getPasswordStatus();
    }
});
const getPasswordStatus = async () => {
    try {
        let res = await getPassWord();
        if (res.Tag == 1) {
            Object.assign(status, res.Data);
        }
    } catch (error) {
        info('error', error);
    }
};
const getCodeParamsApi = async () => {
    try {
        let res = await getCodeParams();
        if (res.Tag == 1) {
            console.log(res);
            newCodeParams.changeCodePasswords(res.Data);
        }
    } catch (error) {
        info('error', error);
    }
};
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
const changePassword = async (formState, passwordKey, newPasswordKey) => {
    if (formState[newPasswordKey] == formState[passwordKey]) {
        info('error', '新旧密码不能相同');
        return;
    } else {
        try {
            let params = {
                Password: formState[passwordKey],
                NewPassword: formState[newPasswordKey]
            };
            const query = encryptionPassword(
                params,
                newCodeParams.codePasswords.PublicKey,
                user.userInfo.UserId
            );
            let res = await changeLoginPassWord(query);
            if (res.Tag == 1) {
                Object.keys(formState).forEach((key) => {
                    formState[key] = '';
                });
            }
        } catch (error) {
            info('error', error);
        }
    }
};

const onFinish = async () => {
    changePassword(formState, 'oldLoginPassword', 'newLoginPassword');
};

const onPayFinish = async () => {
    changePassword(formState, 'payPassword', 'newPayPassword');
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
