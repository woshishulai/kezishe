<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Title from './Title.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const list = [
    {
        img: 'home/activity/list1.jpg'
    },
    {
        img: 'home/activity/list2.jpg'
    }
];
</script>

<template>
    <div class="hot-goods">
        <Title title="热卖"></Title>
        <div class="con-wrap">
            <div class="top-imgs">
                <img v-for="item in list" :key="item.img" :src="getImageUrl(item.img)" alt="图片" />
            </div>
            <div class="cen-wrap">
                <div class="img-list">
                    <div class="goods-item">
                        <div class="top-img"
                            ><img :src="getImageUrl('chengjiao/list1.png')" alt=""
                        /></div>
                        <h5>蓝颜 纯手工主人杯 升级版</h5>
                        <p class="price">¥ {{ 299 }}</p>
                        <p class="time">2023-10-23 10:23:20</p>
                        <p class="fraction">分数: 100分</p>
                        <p class="info"
                            >真的很不错我特很喜欢 希望能多卖点这样的摆脱你好就开始感慨</p
                        >
                        <p class="add"> 已收藏 <i class="iconfont icon-star"></i> </p>
                    </div>
                    <div class="goods-list">
                        <div class="info-item">
                            <h5>蓝颜 纯手工主人杯 升级版</h5>
                            <div class="con">
                                <div class="left-img"
                                    ><img :src="getImageUrl('chengjiao/list1.png')" alt=""
                                /></div>
                                <div class="right-wrap">
                                    <p class="price">¥ {{ 299 }}</p>
                                    <p class="time">2023-10-23 10:23:20</p>
                                    <p class="fraction">分数: 100分</p>
                                    <p class="pingji">评级公司:PMG</p>
                                    <p class="add"> 已收藏 <i class="iconfont icon-star"></i> </p>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <h5>蓝颜 纯手工主人杯 升级版</h5>

                            <div class="con">
                                <div class="left-img"
                                    ><img :src="getImageUrl('chengjiao/list1.png')" alt=""
                                /></div>
                                <div class="right-wrap">
                                    <p class="price">¥ {{ 299 }}</p>
                                    <p class="time">2023-10-23 10:23:20</p>
                                    <p class="fraction">分数: 100分</p>
                                    <p class="pingji">评级公司:PMG</p>
                                    <p class="add"> 已收藏 <i class="iconfont icon-star"></i> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="img-list">
                    <div class="goods-item">
                        <div class="top-img"
                            ><img :src="getImageUrl('chengjiao/list1.png')" alt=""
                        /></div>
                        <h5>蓝颜 纯手工主人杯 升级版</h5>
                        <p class="price">¥ {{ 299 }}</p>
                        <p class="time">2023-10-23 10:23:20</p>
                        <p class="fraction">分数: 100分</p>
                        <p class="info"
                            >真的很不错我特很喜欢 希望能多卖点这样的摆脱你好就开始感慨</p
                        >
                        <p class="add"> 已收藏 <i class="iconfont icon-star"></i> </p>
                    </div>
                    <div class="goods-list">
                        <div class="info-item">
                            <h5>蓝颜 纯手工主人杯 升级版</h5>
                            <div class="con">
                                <div class="left-img"
                                    ><img :src="getImageUrl('chengjiao/list1.png')" alt=""
                                /></div>
                                <div class="right-wrap">
                                    <p class="price">¥ {{ 299 }}</p>
                                    <p class="time">2023-10-23 10:23:20</p>
                                    <p class="fraction">分数: 100分</p>
                                    <p class="pingji">评级公司:PMG</p>
                                    <p class="add"> 已收藏 <i class="iconfont icon-star"></i> </p>
                                </div>
                            </div>
                        </div>
                        <div class="info-item">
                            <h5>蓝颜 纯手工主人杯 升级版</h5>

                            <div class="con">
                                <div class="left-img"
                                    ><img :src="getImageUrl('chengjiao/list1.png')" alt=""
                                /></div>
                                <div class="right-wrap">
                                    <p class="price">¥ {{ 299 }}</p>
                                    <p class="time">2023-10-23 10:23:20</p>
                                    <p class="fraction">分数: 100分</p>
                                    <p class="pingji">评级公司:PMG</p>
                                    <p class="add"> 已收藏 <i class="iconfont icon-star"></i> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hot-goods {
    background-color: #f1f3f0;
    .con-wrap {
        padding: 20px 10px;
        .top-imgs {
            .flex-row;
            gap: 10px;

            img {
                min-width: 48%;
                flex: 1;
            }
        }
        .cen-wrap {
            display: flex;
            flex-direction: row;
            gap: 10px;
            padding: 20px 0 0;
            .img-list {
                flex: 1;
                display: flex;
                flex-direction: row;
                gap: 10px;
                &:nth-child(2) {
                    flex-direction: row-reverse;
                }
                .goods-item {
                    width: 284px;
                    background-color: #fff;
                    padding: 0 20px;
                    cursor: pointer;
                    .top-img {
                        padding: 30px 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: 208px;
                            height: 126px;
                        }
                    }
                    h5 {
                        font-size: 18px;
                        margin: 10px 0;
                    }
                    p {
                        margin: 20px 0;
                        .ellipsis;
                        &.price {
                            font-size: 20px;
                            color: #9a0000;
                        }
                        &.add {
                            display: flex;
                            justify-content: flex-end;
                        }
                    }
                }
                .goods-list {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    .info-item {
                        flex: 1;
                        background-color: #fff;
                        padding: 10px 20px;
                        cursor: pointer;
                        h5 {
                            font-size: 18px;
                            padding: 10px 0;
                        }
                        .con {
                            display: flex;
                            gap: 20px;
                            align-items: center;
                            .left-img {
                                width: 155px;
                                .flex-row;
                                img {
                                    max-width: 100%;
                                }
                            }
                            .right-wrap {
                                flex: 1;
                                p {
                                    margin: 10px 0;
                                    &.price {
                                        font-size: 20px;
                                        color: #9a0000;
                                    }
                                    &.time {
                                        color: #000;
                                        font-weight: 600;
                                    }
                                    &.add {
                                        display: flex;
                                        justify-content: flex-end;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
