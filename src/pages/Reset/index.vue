<script setup>
import Logo from '@/components/common/Logo.vue';
import FooterLink from '@/components/common/FooterLink.vue';
import { ref, computed, reactive, onMounted, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import GetCode from './item/GetCode.vue';
import NewPasswrod from './item/NewPasswrod.vue';
import Success from './item/Success.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const setups = ref(0);
const nextClick = (index) => {
    index == undefined || index == null ? setups.value++ : (setups.value = index);
};
provide('nextClick', nextClick);
</script>

<template>
    <div class="wrap">
        <Logo></Logo>
        <div class="cen-wrap">
            <div class="con-main-wrap">
                <div class="setup-wrap">
                    <div class="setup-item" v-for="(item, index) in 3" :key="index">
                        <span class="red-border"></span>
                        <span class="num" :class="setups == index ? 'active' : ''">{{ item }}</span>
                        <span class="red-border"></span>
                    </div>
                </div>
                <div class="con-wrap">
                    <GetCode v-if="setups == 0"></GetCode>
                    <NewPasswrod v-if="setups == 1"></NewPasswrod>
                    <Success v-if="setups == 2"></Success>
                </div>
            </div>
        </div>
        <FooterLink></FooterLink>
    </div>
</template>

<style scoped lang="less">
.wrap {
    .flex-col;
    height: 100vh;

    .cen-wrap {
        height: 600px;
        width: 100%;
        background: url('@/assets/img/login/reset-bg.png');
        background-size: 100% 100%;

        .con-main-wrap {
            width: 1100px;
            height: 510px;
            padding: 50px 0;
            .flex-col;
            justify-content: space-around;

            .setup-wrap {
                .flex-row;
                width: 100%;

                .setup-item {
                    flex: 1;
                    .flex-row;
                    gap: 4px;
                    cursor: pointer;

                    .red-border {
                        flex: 1;
                        height: 6px;
                        background-color: #9a0000;
                    }

                    .num {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #e4e4e4;
                        color: #fff;
                        font-size: 18px;
                        font-weight: 700;
                        .flex-row;

                        &.active {
                            background-color: #9a0000;
                        }
                    }
                }
            }

            .con-wrap {
                background-color: #fff;
                width: 100%;
                .flex-row;
                height: 320px;
                padding-top: 24px;

                :deep(.ant-form) {
                    width: 360px;
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
