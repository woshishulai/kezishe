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
    <div class="sale">
        <Title title="特卖推荐"></Title>
        <div class="top-img-list">
            <div class="left-img">
                <img :src="getImageUrl('zhongyou/list2.jpg')" alt="" />
            </div>
            <div class="cen-img">
                <img :src="getImageUrl('zhongyou/list3.jpg')" alt="" />
            </div>
            <div class="right-img">
                <img :src="getImageUrl('zhongyou/list4.jpg')" alt="" />
                <img :src="getImageUrl('zhongyou/list5.jpg')" alt="" />
            </div>
        </div>
        <div class="goods-list">
            <div class="goods-item" v-for="(item, index) in 8" :key="index">
                <img :src="getImageUrl('chengjiao/list2.png')" alt="" />
                <div class="right-wrap">
                    <p class="title">博古知今-9月机制币古钱</p>
                    <p class="price">¥ 1656263.7</p>
                    <p class="time">2023-05-09</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.sale {
    background-color: #f1f3f0;
    .top-img-list {
        display: flex;
        flex-direction: row;
        gap: 20px;
        padding: 20px 10px;
        .left-img {
            width: 580px;
            height: 414px;
        }
        .cen-img {
            width: 385px;
            height: 415px;
        }
        .right-img {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
                width: 380px;
                height: 200px;
            }
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
    .goods-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        padding: 0 20px 20px;
        .goods-item {
            min-width: 23%;
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            background-color: #fff;
            padding: 20px;
            cursor: pointer;
            .right-wrap {
                p {
                    margin: 10px 0;
                    &.price {
                        font-size: 16px;
                        color: #9a0000;
                    }
                }
            }
        }
    }
}
</style>
