<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import ShouGou from './ShouGou.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const showDetails = (item) => {
    router.push('/shougou/details');
};
</script>

<template>
    <div class="wrap">
        <div class="con-main-wrap">
            <BreadCrumbs></BreadCrumbs>
            <div class="show-element">
                <div class="left-wrap">
                    <div class="cate-nav">
                        <div class="title">
                            <h5>收购</h5>
                            <p>ACQUISITION</p>
                        </div>
                        <div class="center">
                            <div class="nav-item active" @click="router.push('/shougou')">
                                收购资讯
                            </div>
                            <div class="nav-item"> 集邮资讯 </div>
                        </div>
                    </div>
                    <div class="information">
                        <div class="title">
                            <span></span>
                            <h5>推荐资讯</h5>
                        </div>
                        <div class="center">
                            <div
                                class="nav-item"
                                v-for="(item, index) in 8"
                                :key="index"
                                @click="showDetails(item)"
                            >
                                中国邮政发行《“一带一路”倡议提出十周年》纪念邮票
                            </div>
                        </div>
                    </div>
                </div>
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    position: relative;
    padding-bottom: 40px;
    &::before {
        content: '';
        position: absolute;
        top: 76px;
        left: 0;
        right: 0;
        bottom: auto;
        height: 310px;
        z-index: -1;
        background-image: url('@/assets/img/shougou/bg.jpg');
        background-size: cover;
        background-position: center top;
    }
    .show-element {
        display: flex;
        flex-direction: row;
        margin-top: 120px;
        .left-wrap {
            width: 280px;
            .cate-nav {
                .title {
                    padding: 30px 40px;
                    background-color: #9a0000;
                    color: #fff;
                    h5 {
                        font-size: 24px;
                    }
                    p {
                        margin-top: 10px;
                        color: #e3bf89;
                        font-size: 16px;
                    }
                }
                .center {
                    min-height: 300px;
                    padding: 20px 0;
                    background-color: #fffaeb;
                    .nav-item {
                        position: relative;
                        padding: 15px 40px;
                        margin-bottom: 10px;
                        font-size: 18px;
                        cursor: pointer;
                        .ellipsis;
                        &.active {
                            background-color: #f9ecc3;
                            &::before {
                                display: block;
                                position: absolute;
                                right: 0;
                                top: 0;
                                content: '';
                                width: 5px;
                                height: 48px;
                                background-color: #9a0000;
                            }
                        }
                        &:hover {
                            background-color: #f9ecc3;
                        }
                    }
                }
            }
            .information {
                margin-top: 10px;
                .title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 20px;
                    background: url('@/assets/img/weituo/menu-title.png');
                    span {
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                    h5 {
                        font-size: 24px;
                        color: #fff;
                    }
                }
                .center {
                    min-height: 300px;
                    padding: 20px 0;
                    background-color: #fffaeb;
                    .nav-item {
                        font-size: 14px;
                        padding: 15px 20px;
                        margin-bottom: 10px;
                        line-height: 18px;
                        border-bottom: 1px dashed #f4e5b8;
                        cursor: pointer;
                        .ellipsis2;
                        &:hover {
                            color: #fff;
                            background-color: #9a0000;
                        }
                    }
                }
            }
        }
    }
}
</style>
