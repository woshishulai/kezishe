<script setup>
import { ref, computed, reactive, onMounted, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { message } from 'ant-design-vue';
const props = defineProps({});
const nextClick = inject('nextClick');
onMounted(() => {});

const repasswords = (rule, value) => {
    return new Promise((resolve, reject) => {
        if (value === '') {
            reject('请再次输入密码');
        } else if (value !== formState.password) {
            reject('两次输入密码不一致!');
        } else {
            resolve();
        }
    });
};
const resetRules = {
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度应在6-16个字符之间', trigger: 'blur' },
        { pattern: /^[^\u4e00-\u9fa5]+$/, message: '密码不能包含中文字符', trigger: 'blur' }
    ],
    repassword: [{ required: true, validator: repasswords, trigger: ['change', 'blur'] }]
};

const formState = reactive({
    password: '215215',
    repassword: '215215'
});
const info = (status, msg) => message[status](msg);
const handleUsernameInput = () => {
    formState.repassword = formState.repassword.replace(/\s/g, '');
    formState.password = formState.password.replace(/\s/g, '');
};

const handleFinish = (values) => {
    nextClick(2);
    info('success', '验证成功');
};

const handleFinishFailed = (errors) => {
    errors.errorFields.forEach((field) => info('error', field.errors[0]));
};
</script>
<template>
    <div class="new-password">
        <a-form
            :rules="resetRules"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item name="password">
                <a-input-password
                    @input="handleUsernameInput"
                    autocomplete="off"
                    v-model:value="formState.password"
                    placeholder="请输入新密码"
                >
                </a-input-password>
            </a-form-item>
            <a-form-item name="repassword">
                <a-input-password
                    @input="handleUsernameInput"
                    autocomplete="off"
                    v-model:value="formState.repassword"
                    placeholder="请再次确认新密码"
                >
                </a-input-password>
            </a-form-item>
            <a-form-item>
                <div class="btn">
                    <a-button type="primary" html-type="submit">提交 </a-button>
                </div>
            </a-form-item>
        </a-form>
    </div>
</template>

<style scoped lang="less"></style>
