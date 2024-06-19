<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { handleFinishFailed } from '@/utils/form/rules.js';
import { UserOutlined, LockOutlined, CheckCircleOutlined, CloseOutlined } from '@/utils/icon/icon';
import { submitLoginApi } from '@/request/api';
import { accountRules } from './rules';
import { useUserInfo, usePassword } from '@/store/store';
import { getCodeParams } from '@/request/api';
import { encryptionPassword } from '@/hooks/user';
const user = useUserInfo();
const newCodeParams = usePassword();
const router = useRouter();
const formState = reactive({
    username: '',
    password: '',
    code: '',
    remember: true
});
onMounted(() => {
    const codeTime = newCodeParams.codePasswords.ExpireTime;
    const currentTime = Date.now();
    if (!codeTime || currentTime > codeTime) {
        getCodeParamsApi();
    }
});
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
function getUuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 10) | 0;
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString();
    });
}
getUuid();
const uuid = ref(getUuid());
const imageUrl = ref(`http://apikzs.sc798.com/Member/Logon/GetCaptchaImage?uuid=${uuid.value}`);
const changeCodeImg = () => {
    uuid.value = getUuid();
    imageUrl.value = `http://apikzs.sc798.com/Member/Logon/GetCaptchaImage?uuid=${uuid.value}`;
};
const visible = ref(false);
const handleFinish = async () => {
    let params = {
        Password: formState.password
    };
    let query = encryptionPassword(params, newCodeParams.codePasswords.PublicKey);
    query.Uuid = uuid.value;
    query.CaptchaCode = formState.code;
    query.UserName = formState.username;
    let res = await submitLoginApi(query);
    if (res.Tag == 1) {
        user.addUserNameList(formState.username);
        user.changeUserInfo(res.Data);
        router.push('/');
    }
};
</script>

<template>
    <a-form
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        :rules="accountRules"
    >
        <a-form-item has-feedback name="username">
            <a-popover v-model:open="visible" title="账号" placement="left" trigger="click">
                <template #content>
                    <div class="show-name-list">
                        <div
                            class="name-item"
                            v-for="(item, index) in user.userNameList"
                            :key="index"
                        >
                            <p @click="formState.username = item">{{ item }}</p>
                            <CloseOutlined @click="user.removeUserNameList(item)" />
                        </div>
                    </div>
                </template>
                <a-input
                    v-model:value.trim="formState.username"
                    placeholder="用户名"
                    id="login-account"
                >
                    <template #prefix>
                        <UserOutlined style="color: rgba(154, 0, 0, 1)" />
                    </template>
                </a-input>
            </a-popover>
        </a-form-item>
        <a-form-item has-feedback name="password">
            <a-input-password
                autocomplete="off"
                id="login-password"
                v-model:value.trim="formState.password"
                placeholder="密码"
            >
                <template #prefix>
                    <LockOutlined style="color: rgba(154, 0, 0, 1)" />
                </template>
                <template #addonAfter>
                    <!-- <a-button type="primary" @click="router.push('/reset-password')">忘记密码?</a-button> -->
                    <a-button class="bg-btn" @click="router.push('/reset-password')"
                        >忘记密码?</a-button
                    >
                </template>
            </a-input-password>
        </a-form-item>
        <a-form-item has-feedback name="code">
            <a-input v-model:value.trim="formState.code" placeholder="验证码" id="login-code">
                <template #prefix>
                    <CheckCircleOutlined style="color: rgba(154, 0, 0, 1)" />
                </template>
                <template #addonAfter>
                    <div class="code-img" @click="changeCodeImg">
                        <img :src="imageUrl" alt="" />
                    </div>
                </template>
            </a-input>
        </a-form-item>
        <a-form-item class="checkeds">
            <a-checkbox id="login-check" v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>
        <a-form-item>
            <div class="btn">
                <a-button type="primary" html-type="submit">登录</a-button>
            </div>
        </a-form-item>
    </a-form>
</template>

<style scoped lang="less">
.show-name-list {
    .flex-col;
    align-items: flex-start;
    font-size: 16px;

    .name-item {
        .flex-row;
        justify-content: space-between;
        cursor: pointer;
        width: 200px;
        padding: 10px 0;

        span {
            font-size: 14px;
        }

        &:hover {
            color: #9a0000;
        }
    }

    img {
        width: 100%;
        height: 100%;
    }
}

:deep(.bg-btn) {
    border: none;
    background-color: #f4f4f4;
    height: auto;
}
.code-img {
    width: 94.5px;
    height: 49px;
    cursor: pointer;
    background-color: #f3f3f3;
    padding: 2px 2px 2px 0;
    .flex-row;

    img {
        height: 100%;
        width: 100%;
    }
}
</style>
