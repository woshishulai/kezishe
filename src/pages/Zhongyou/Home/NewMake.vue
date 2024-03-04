<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Title from './Title.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="new-make">
        <Title title="最新成交藏品"></Title>
        <div class="cen-wrap">
            <div class="left-wrap">
                <img class="show-img" :src="getImageUrl('zhongyou/list1.jpg')" alt="" />
                <div class="goods-list">
                    <div class="goods-item" v-for="(item, index) in 4" :key="index">
                        <div class="top-img">
                            <img :src="getImageUrl('home/goods/goods6.jpg')" alt="" />
                        </div>
                        <p class="title"> 蓝颜 纯手工主人杯升级版 </p>
                        <p class="price">¥ 299</p>
                    </div>
                </div>
            </div>
            <div class="right-list">
                <div class="goods-item" v-for="(item, index) in 4" :key="index">
                    <img :src="getImageUrl('home/goods/goods6.jpg')" alt="" />
                    <div class="text-wrap">
                        <p class="title">博古知今一9月机制币-古钱</p>
                        <p class="price">¥ 164761.7</p>
                        <p class="time">2023-09-04</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.new-make {
    .cen-wrap {
        display: flex;
        flex-direction: row;
        gap: 15px;
        padding: 20px 10px 20px;
        background-color: #f1f3f0;
        .left-wrap {
            display: flex;
            flex-direction: row;
            gap: 15px;
            .show-img {
                width: 450px;
            }
            .goods-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                gap: 10px;
                .goods-item {
                    min-width: 45%;
                    flex: 1;
                    padding: 0 10px;
                    background-color: #fff;
                    cursor: pointer;

                    .top-img {
                        padding: 20px;
                        display: flex;
                        align-items: center;
                        img {
                            width: 100%;
                        }
                    }
                    .title {
                        font-weight: 500;
                        font-size: 16px;
                        margin: 5px 0 5px;
                    }
                    .price {
                        margin-top: 10px;
                        font-size: 20px;
                        color: #9a0000;
                    }
                }
            }
        }
        .right-list {
            min-width: 450px;
            flex: 1;
            display: flex;
            flex-direction: column;
            .goods-item {
                flex: 1;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 20px;
                padding: 20px 40px;
                background-color: #fff;
                border-bottom: 1px solid #ececec;
                img {
                    height: 70px;
                }
                .text-wrap {
                    p {
                        font-size: 16px;
                        margin: 10px;
                    }
                    .price {
                        color: #9a0000;
                    }
                }
            }
        }
    }
}
</style>
