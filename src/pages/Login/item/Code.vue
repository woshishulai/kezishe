<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { codeRules } from './rules';
import { message } from 'ant-design-vue';
import {
    UserOutlined,
    LockOutlined,
    CheckCircleOutlined,
    CloseOutlined
} from '@ant-design/icons-vue';
import { useUserInfo } from '@/store/store';
import { handleFinishFailed } from '@/utils/form/rules.js';
const user = useUserInfo();
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const countdown = ref(0);
onMounted(() => {});
const formState = reactive({
    phone: '',
    phoneCode: '',
    code: '',
    remember: true
});
const visible = ref(false);
const info = (status, msg) => message[status](msg);
const getPhone = () => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    const phoneNumber = formState.phone;
    const isPhoneValid = phoneRegex.test(phoneNumber);
    if (!isPhoneValid) {
        info('error', '请输入正确的手机号');
    }
    return isPhoneValid;
};
const getCode = () => {
    const isPhoneValid = getPhone();
    if (isPhoneValid) {
        countdown.value = 60;
        info('success', '验证码发送成功请输入验证码');
        const interval = setInterval(() => {
            countdown.value > 0 ? countdown.value-- : clearInterval(interval);
        }, 1000);
    }
};
const handleFinish = (values) => {
    formState.remember == true ? user.addPhoneList(formState.phone) : '';
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
                                <span>手机号码</span>
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
                        <a-button type="primary" @click="getCode" :disabled="countdown > 0">
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
                    <template #suffix>
                        <!-- 后端返回的验证码 -->
                        <span class="get-password">
                            {{ 5432 }}
                        </span>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
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
}
</style>
