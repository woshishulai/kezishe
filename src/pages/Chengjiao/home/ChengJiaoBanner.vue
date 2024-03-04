<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useUserInfo } from '@/store/store.js';
const user = useUserInfo();
const swiperList = [
    {
        img: 'home/banner1.jpg'
    },
    {
        img: 'home/banner2.jpg'
    }
];
const list = [
    {
        img: 'chengjiao/icon1.png',
        num: '357',
        text: '本月成交总数'
    },
    {
        img: 'chengjiao/icon2.png',
        num: '10349',
        text: '今日预展总数'
    },
    {
        img: 'chengjiao/icon3.png',
        num: '1662',
        text: '今日即将结标'
    }
];
</script>

<template>
    <div class="banner">
        <div class="left-wrap">
            <div class="title">
                <div class="name"> {{ user.userInfo.RealName }} </div>
                欢迎您登录！
            </div>
            <div class="center">
                <p class="label">实时成交总数量</p>
                <p>
                    <span>{{ 6986501 }}</span> 件
                </p>
            </div>
            <div class="card-list">
                <div class="card-item" v-for="(item, index) in list" :key="index">
                    <img :src="getImageUrl(item.img)" alt="" />
                    <p class="num">{{ item.num }}件</p>
                    <p class="text">{{ item.text }}</p>
                </div>
            </div>
        </div>
        <div class="swiper-wrap">
            <a-carousel autoplay>
                <img
                    class="swiper-img"
                    v-for="item in swiperList"
                    :key="item.img"
                    :src="getImageUrl(item.img)"
                    alt="img"
                />
            </a-carousel>
        </div>
    </div>
</template>

<style scoped lang="less">
.banner {
    display: flex;
    flex-direction: row;
    gap: 10px;
    .left-wrap {
        width: 415px;
        padding: 20px 16px;
        background-color: #fef4d3;
        .title {
            .flex-row;
            justify-content: flex-start;
            font-size: 16px;
            gap: 5px;
            .name {
                color: #9a0000;
            }
        }
        .center {
            background-color: #fff;
            margin: 20px 0;
            padding: 40px;
            font-size: 18px;
            border-radius: 10px;
            .label {
                font-weight: 600;
                margin-bottom: 10px;
            }
            p {
                .flex-row;
                span {
                    color: #e54037;
                    font-size: 22px;
                }
            }
        }
        .card-list {
            .flex-row;
            justify-content: space-around;
            .card-item {
                .flex-col;
                .num {
                    margin: 20px 0 10px;
                    font-weight: 600;
                }
            }
        }
    }
    .swiper-wrap {
        flex: 1;
        min-width: 950px;

        .swiper-img {
            height: 320px;
        }
    }
}
</style>
