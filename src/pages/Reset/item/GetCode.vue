<script setup>
import { ref, computed, reactive, onMounted, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getCodeLogin, phoneCodeLogin } from '@/request/api';
import { getImageUrl } from '@/utils';
import { info } from '@/hooks/antd/message';
import { codeRules } from '@/pages/Login/item/rules';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const nextClick = inject('nextClick');
onMounted(() => {});
const formState = reactive({
    phone: '',
    phoneCode: ''
});
const countdown = ref(0);
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
const handleFinish = (values) => {
    nextClick(1);
    info('success', '验证成功');
};
const handleFinishFailed = (errors) => {
    errors.errorFields.forEach((field) => info('error', field.errors[0]));
};
</script>

<template>
    <a-form
        :rules="codeRules"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
    >
        <a-form-item name="phone">
            <a-input v-model:value="formState.phone" placeholder="请输入手机号码"> </a-input>
        </a-form-item>
        <a-form-item name="phoneCode">
            <a-input v-model:value="formState.phoneCode" placeholder="验证码">
                <template #addonAfter>
                    <div class="btn-code">
                        <button @click="getCode" :disabled="countdown > 0">
                            <span v-if="countdown === 0">获取验证码</span>
                            <span v-else>{{ countdown }}</span></button
                        >
                    </div>
                </template>
            </a-input>
        </a-form-item>
        <a-form-item>
            <div class="btn">
                <a-button type="primary" html-type="submit">下一步</a-button>
            </div>
        </a-form-item>
    </a-form>
</template>
<style scoped lang="less">
.btn-code {
    width: 120px;
    height: 48px;
    background-color: #fee5be;
    .flex-row;

    button {
        background: transparent;
        border: none;
        color: #da8d43;
        cursor: pointer;
    }
}
</style>
