<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const list = [
    {
        img: 'home/goods/goods1.jpg',
        title: '蓝颜 纯手工主人杯 升级版',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods2.jpg',
        title: '景德镇的杯子',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods3.jpg',
        title: '这是一个不错的商品',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods4.jpg',
        title: '这是个不错的枕头',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods4.jpg',
        title: '这是个不错的枕头',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    }
];
</script>

<template>
    <div class="swiper-list">
        <h5>相关推荐</h5>
        <div class="swiper-wrap">
            <a-carousel autoplay>
                <div class="goods-list">
                    <div class="goods-item" v-for="item in list" :key="item.id">
                        <img :src="getImageUrl(item.img)" alt="" />
                        <p class="item-title">{{ item.title }}</p>
                        <p class="jiage">
                            <span class="rmb"> ￥ {{ item.rmb }}</span>
                        </p>
                        <div class="jiage">
                            <p class="time">{{ item.time }}</p>
                            ({{ '69' }}个人气)
                        </div>
                    </div>
                </div>
                <div class="goods-list">
                    <div class="goods-item" v-for="item in list" :key="item.id">
                        <img :src="getImageUrl(item.img)" alt="" />
                        <p class="item-title">{{ item.title }}</p>
                        <p class="jiage">
                            <span class="rmb"> ￥ {{ item.rmb }}</span>
                        </p>
                        <div class="jiage">
                            <p class="time">{{ item.time }}</p>
                            ({{ '69' }}个人气)
                        </div>
                    </div>
                </div>
            </a-carousel>
        </div>
    </div>
</template>

<style scoped lang="less">
.swiper-list {
    padding: 30px 0;
    :deep(.ant-carousel .slick-list .slick-slide > div > div) {
        display: flex !important;
    }
    h5 {
        padding: 20px 0;
        border-top: 1px solid #e4e4e4;
        text-align: center;
        font-size: 20px;
    }
    .goods-list {
        .flex-row;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;

        .goods-item {
            flex: 1;
            padding: 12px;
            box-sizing: border-box;
            .flex-col;
            gap: 15px;
            align-items: flex-start;
            background: #f8f8f8;
            padding: 12px;
            cursor: pointer;

            img {
                width: 100%;
                height: 251px;
            }
            .item-title {
                font-weight: 600;
                font-size: 18px;
                color: #3f3f3f;
            }

            .jiage {
                width: 100%;
                .flex-row;
                justify-content: space-between;

                .rmb {
                    font-weight: 600;
                    font-size: 20px;
                    // font-family: "Arial", sans-serif;
                    color: #ae3333;
                }

                .now {
                    padding: 8px 12px;
                    color: #fff;
                    background: #ae3333;
                }
            }

            .time {
                // font-family: "Arial", sans-serif;
                font-weight: 500;
            }
        }
    }
}
</style>
