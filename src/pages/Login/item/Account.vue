<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { handleFinishFailed } from '@/utils/form/rules.js';
import { UserOutlined, LockOutlined, CheckCircleOutlined, CloseOutlined } from '@/utils/icon/icon';
import { submitLoginApi } from '@/request/api';
import { accountRules } from './rules';
import { useUserInfo } from '@/store/store';
const user = useUserInfo();
const router = useRouter();
const formState = reactive({
    username: 'xiaoyu',
    password: '123456',
    code: '',
    remember: true
});
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
        UserName: formState.username,
        Password: formState.password,
        CaptchaCode: formState.code,
        Uuid: uuid.value
    };
    let res = await submitLoginApi(params);
    if (res.Tag == 1) {
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
                            <span>账号</span>
                            <p @click="formState.username = item">{{ item }}</p>
                            <CloseOutlined @click="user.removeNameList(item)" />
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
                    <a-button type="primary" @click="router.push('/reset-password')"
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
        <a-form-item>
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

.code-img {
    width: 94.5px;
    height: 52px;
    cursor: pointer;
    background-color: #f3f3f3;
    .flex-row;

    img {
        width: 100%;
        height: 52px;
    }
}
</style>
