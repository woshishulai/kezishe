<script setup>
import Logo from '@/components/common/Logo.vue';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { message } from 'ant-design-vue';
// import { rules } from './rules';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const repasswords = (rule, value) => {
    return new Promise((resolve, reject) => {
        if (value === '') {
            reject('密码不能为空');
        } else if (value !== formState.password) {
            reject('两次输入密码不一致!');
        } else {
            resolve();
        }
    });
};
const remembers = (rule, value) => {
    return new Promise((resolve, reject) => {
        console.log(value);
        if (value === false) {
            reject('请同意用户注册协议');
        } else {
            resolve();
        }
    });
};
const rules = {
    phone: [
        {
            required: true,
            message: '请输入手机号',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账号密码暂不支持中文或空格',
            trigger: 'change'
        },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号格式',
            trigger: 'change'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入您的密码',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账号密码暂不支持中文或空格',
            trigger: 'change'
        },
        {
            min: 6,
            max: 13,
            message: '密码长度6-13位',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账号密码暂不支持中文或空格',
            trigger: 'change'
        }
    ],
    repassword: [{ required: true, validator: repasswords, trigger: ['change', 'blur'] }],
    code: [
        {
            required: true,
            message: '请输入验证码',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '暂不支持中文或空格',
            trigger: 'change'
        },
        {
            min: 4,
            max: 6,
            message: '请输入长度为4-6位数的验证码',
            trigger: 'change'
        },
        {
            pattern: /^[0-9]+$/,
            message: '只能输入数字',
            trigger: 'change'
        }
    ],
    newCode: [
        {
            required: true,
            message: '请输入验证码',
            trigger: 'change'
        },
        {
            min: 4,
            max: 4,
            message: '请输入长度为4位数的验证码',
            trigger: 'change'
        },
        {
            pattern: /^[0-9]+$/,
            message: '只能输入数字',
            trigger: 'change'
        },
        {
            pattern: /^[a-zA-Z0-9]+$/,
            message: '账号密码暂不支持中文或空格',
            trigger: 'change'
        }
    ],
    remember: [{ required: true, validator: remembers, trigger: ['change', 'blur'] }]
};
const countdown = ref(0);
const formState = reactive({
    phone: '',
    password: '',
    repassword: '',
    code: '',
    newCode: '',
    remember: true
});
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
        // getPhoneCodeApi(formState.phone) //获取验证码的API
        info('success', '验证码发送成功请输入验证码');
        const interval = setInterval(() => {
            countdown.value > 0 ? countdown.value-- : clearInterval(interval);
        }, 1000);
    }
};
const onFinish = (values) => {
    info('success', '注册成功请登录');
    router.push('/');
};
const onFinishFailed = (errors) => {
    errors.errorFields.forEach((field) => info('error', field.errors[0]));
};
</script>

<template>
    <div class="wrap">
        <Logo></Logo>
        <div class="register-wrap">
            <h3>用户注册</h3>
            <div class="form-wrap">
                <a-form
                    :rules="rules"
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 10 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                >
                    <a-form-item label="手机号" name="phone">
                        <a-input v-model:value.trim="formState.phone" />
                    </a-form-item>

                    <a-form-item label="密码" name="password">
                        <a-input-password v-model:value.trim="formState.password" />
                    </a-form-item>
                    <a-form-item label="确认密码" name="repassword">
                        <a-input-password v-model:value.trim="formState.repassword" />
                    </a-form-item>

                    <a-form-item label="短信校验码" name="code">
                        <a-input style="padding-right: 0px" v-model:value.trim="formState.code">
                            <template #addonAfter>
                                <div class="btn">
                                    <a-button @click="getCode" :disabled="countdown > 0">
                                        <span v-if="countdown === 0">获取验证码</span>
                                        <span v-else>{{ countdown }}</span></a-button
                                    >
                                </div>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="验证码" name="newCode">
                        <a-input v-model:value.trim="formState.newCode">
                            <template #suffix>
                                <!-- 后端返回的验证码 -->
                                <span class="get-password">
                                    {{ 5432 }}
                                </span>
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                        <a-checkbox v-model:checked="formState.remember"
                            >我已阅读并同意 《用户注册协议》</a-checkbox
                        >
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 8, span: 10 }">
                        <a-button type="primary" html-type="submit">注册</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <p>我已经注册，现在就 <span @click="router.push('/login')">登录</span> </p>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    background: url('@/assets/img/register/register.png');
    background-size: 100% 100%;
    .flex-col;
    height: 100vh;
    gap: 10px;
    padding: 30px 0;

    .header-logo {
        width: 820px;
    }

    .register-wrap {
        width: 820px;
        background-color: #fff;
        padding: 40px 0;

        h3 {
            text-align: center;
            font-weight: 700;
            font-size: 28px;
            margin-bottom: 30px;
        }

        .btn {
            button {
                background-color: #afb9c6;
                color: #fff;
            }
        }

        p {
            text-align: center;
            font-size: 700;

            span {
                color: #2677e5;
                cursor: pointer;
            }
        }
    }
    :deep(.ant-input) {
        background-color: #f4f4f4;
    }
    :deep(.ant-input-affix-wrapper) {
        background-color: #f4f4f4;
    }
}
</style>
