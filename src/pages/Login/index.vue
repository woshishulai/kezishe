<script setup>
import Logo from '@/components/common/Logo.vue';
import Account from './item/Account.vue';
import Code from './item/Code.vue';
import FooterLink from '@/components/common/FooterLink.vue';
import { ref, computed, reactive, onMounted, KeepAlive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { useLoading } from '@/store/module/loading';
// const Loading = useLoading()
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
let actives = ref(0);

const title = [
    {
        text: '账号密码'
    },
    {
        text: '手机验证码'
    }
];
const showLogin = (index) => {
    actives.value = index;
};
const showLoginApi = () => {
    Loading.changeSpinning(true);
};
</script>

<template>
    <div class="wrap">
        <Logo></Logo>
        <div class="cen-wrap">
            <div class="con-main-wrap">
                <span></span>
                <div class="login-from">
                    <div class="title">
                        <h5
                            @click="showLogin(index)"
                            v-for="(item, index) in title"
                            :key="index"
                            :class="actives == index ? 'active' : ''"
                        >
                            {{ item.text }}
                        </h5>
                    </div>
                    <div class="cen-form">
                        <KeepAlive>
                            <Account v-if="actives == 0"></Account>
                            <Code v-else></Code>
                        </KeepAlive>
                        <p class="register" @click="router.push('/register')">
                            还没有账号？立即注册 >
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <FooterLink pdTop="40px" pdBom="40px"></FooterLink>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.wrap {
    .flex-col;
    height: 100vh;

    .cen-wrap {
        width: 100%;
        padding: 42px 0;
        background: url('@/assets/img/login/login-bg.png');
        background-size: 100% 100%;

        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            width: 1300px;

            .login-from {
                padding: 20px 0;
                width: 420px;
                background: #fff;

                .title {
                    .flex-row;
                    padding: 0 10px;
                    border-bottom: 4px solid #9a0000;

                    h5 {
                        flex: 1;
                        .flex-row;
                        font-weight: 600;
                        padding: 18px 0;
                        border-radius: 7px 7px 0 0;
                        cursor: pointer;

                        &.active {
                            background: #9a0000;
                            color: #fff;
                        }
                    }
                }

                .cen-form {
                    padding: 30px 30px 0 30px;

                    .register {
                        text-align: center;
                        font-weight: 700;
                        cursor: pointer;
                    }
                }
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
