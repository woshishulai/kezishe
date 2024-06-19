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
                <div class="left-text">
                    <h2>中邮网艺术收藏品网上交易平台全新上线了</h2>
                    <p class="sahng">你身边藏品保护专家</p>
                    <p>新人见面礼注册即送288元大礼包</p>
                    <div class="xian"></div>
                    <div class="titles"> 业务范围： </div>
                    <p class="label"
                        >中国现代金银币、流通纪念币、近代机制币、银锭、古钱、外国金银币、章；历代纸币；清明区邮票、新中国邮票、各时期封片简、港澳邮票、</p
                    >
                </div>
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
        height: 528px;
        background: url('@/assets/img/login/login-bg.png');
        background-size: 100% 100%;

        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            height: 100%;
            width: 1300px;
            .left-text {
                width: 600px;
                letter-spacing: 1px;
                color: rgb(250, 231, 175);
                h2 {
                    font-size: 30px;
                }
                p {
                    font-size: 18px;
                    &.sahng {
                        margin-top: 22px;
                        margin-bottom: 14px;
                    }
                }
                .xian {
                    width: 100%;
                    height: 1px;
                    background-color: rgb(250, 231, 175);
                    margin-top: 26px;
                    margin-bottom: 20px;
                }
                .titles {
                    font-size: 16px;
                    color: rgb(250, 231, 175);
                }
                .label {
                    font-size: 14px;
                    margin-top: 15px;
                    line-height: 24px;
                }
            }

            .login-from {
                padding: 20px 0;
                width: 420px;
                height: 458px;
                background: #fff;

                .title {
                    .flex-row;
                    padding: 0 10px;
                    border-bottom: 4px solid #9a0000;

                    h5 {
                        flex: 1;
                        .flex-row;
                        font-weight: 600;
                        padding: 17px 0;
                        border-radius: 7px 7px 0 0;
                        cursor: pointer;

                        &.active {
                            background: #9a0000;
                            color: #fff;
                        }
                    }
                }

                .cen-form {
                    padding: 26px 26px 0 26px;

                    .register {
                        text-align: center;
                        font-weight: 700;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    :deep(.ant-form) {
        .ant-input {
            background-color: #f4f4f4;
        }
        .ant-input-affix-wrapper {
            background-color: #f4f4f4;
            border: none;
        }
        .anticon svg {
            color: #6b6b6b;
            margin-right: 10px;
            width: 15px;
        }
        .ant-form-item {
            margin-bottom: 15px;
        }
        .checkeds {
            height: 35px;
            &:hover {
                .ant-checkbox-inner {
                    background-color: rgb(239, 239, 239);
                }
            }
            .ant-checkbox-inner {
                width: 18px;
                height: 17px;
                border-width: 1px;
                border-color: rgb(107, 107, 107);
                border-style: solid;
                border-radius: 2px;
                background-color: rgb(239, 239, 239);
                &::after {
                    top: 47%;
                    margin-left: 3%;
                    width: 5px;
                    height: 10px;
                    border-color: rgb(107, 107, 107);
                }
            }
            .ant-form-item-control-input {
                min-height: auto;
            }
        }
    }
}
</style>
