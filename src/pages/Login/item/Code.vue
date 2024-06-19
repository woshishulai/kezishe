<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { codeRules } from './rules';
import { info } from '@/hooks/antd/message';
import {
    UserOutlined,
    LockOutlined,
    CheckCircleOutlined,
    CloseOutlined
} from '@ant-design/icons-vue';
import { useUserInfo } from '@/store/store';
import { getCodeLogin, phoneCodeLogin } from '@/request/api';
import { handleFinishFailed } from '@/utils/form/rules';
const user = useUserInfo();
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const countdown = ref(0);

const formState = reactive({
    phone: '',
    phoneCode: '',
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
const getPhone = () => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    const phoneNumber = formState.phone;
    const isPhoneValid = phoneRegex.test(phoneNumber);
    if (!isPhoneValid) {
        info('error', '请输入正确的手机号');
    }
    return isPhoneValid;
};
const getCode = async () => {
    const isPhoneValid = getPhone();
    if (isPhoneValid) {
        countdown.value = 60;
        let query = {
            Mobile: formState.phone,
            SType: 1
        };
        let res = await getCodeLogin(query);
        if (res.Tag == 1) {
            info('success', '验证码发送成功请输入验证码');
        } else {
            info('error', res.Message);
        }
        const interval = setInterval(() => {
            countdown.value > 0 ? countdown.value-- : clearInterval(interval);
        }, 1000);
    }
};
const handleFinish = async (values) => {
    let query = {
        Mobile: formState.phone,
        SmsCode: formState.phoneCode,
        CaptchaCode: formState.code,
        Uuid: uuid.value
    };
    try {
        let res = await phoneCodeLogin(query);
        if (res.Tag == 1) {
            user.changeUserInfo(res.Data);
            router.push('/');
            info('success', res.Message);
        }
    } catch (error) {
        info('error', error);
    }
    formState.remember == true ? user.addPhoneList(formState.phone) : '';
    return;
    info('success', '登录成功');
    router.push('/');
};
</script>

<template>
    <div class="code">
        <a-form
            :rules="codeRules"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item name="phone">
                <a-popover v-model:open="visible" title="手机号" placement="left" trigger="click">
                    <template #content>
                        <div class="show-name-list">
                            <div
                                class="name-item"
                                v-for="(item, index) in user.userPhoneList"
                                :key="index"
                            >
                                <p @click="formState.phone = item">{{ item }}</p>
                                <CloseOutlined @click="user.removePhoneList(item)" />
                            </div>
                        </div>
                    </template>
                    <a-input v-model:value="formState.phone" placeholder="请输入手机号码">
                        <template #prefix>
                            <UserOutlined style="color: rgba(5, 5, 4, 1.25)" />
                        </template>
                    </a-input>
                </a-popover>
            </a-form-item>
            <a-form-item name="phoneCode">
                <a-input v-model:value.trim="formState.phoneCode" placeholder="验证码">
                    <template #prefix>
                        <LockOutlined style="color: rgba(0, 0, 0, 1.25)" />
                    </template>
                    <template #addonAfter>
                        <a-button
                            class="bg-btn"
                            type="primary"
                            @click="getCode"
                            :disabled="countdown > 0"
                        >
                            <span v-if="countdown === 0">获取验证码</span>
                            <span v-else>{{ countdown }}</span></a-button
                        >
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="code">
                <a-input v-model:value="formState.code" placeholder="验证码">
                    <template #prefix>
                        <CheckCircleOutlined style="color: rgba(0, 0, 0, 1.25)" />
                    </template>
                    <template #addonAfter>
                        <!-- 后端返回的验证码 -->
                        <div class="code-img" @click="changeCodeImg">
                            <img :src="imageUrl" alt="" />
                        </div>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item class="checkeds">
                <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
            </a-form-item>
            <a-form-item>
                <div class="btn">
                    <a-button type="primary" html-type="submit">登录</a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.code {
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
}
:deep(.bg-btn) {
    height: 50px;
}
:deep(.ant-btn-primary:disabled) {
    color: #fff;
}
.name-item {
    .flex-row;
    justify-content: space-between;
}
</style>
