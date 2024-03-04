<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="left-hot">
        <div class="title">热卖推荐</div>
        <div class="goods-list">
            <div class="goods-item" v-for="(item, index) in 6" :key="index">
                <div class="top-img">
                    <img :src="getImageUrl('chengjiao/list2.png')" alt="" />
                </div>
                <p class="info">纪11鲁迅再版带厂铭直角边双连新全</p>
                <p class="time">2023-10-23</p>
                <img class="hot" :src="getImageUrl('zhongyou/list6.jpg')" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.left-hot {
    width: 270px;
    .title {
        background-color: #e6574f;
        color: #fff;
        padding: 20px;
        font-size: 18px;
    }
    .goods-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        background-color: #fbf0d0;
        padding: 20px 10px;
        .goods-item {
            position: relative;
            background-color: #f8f8f8;
            cursor: pointer;
            .top-img {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                height: 231px;
                background-color: #fff;
                img {
                    width: 100%;
                }
            }
            p {
                .ellipsis;
                padding: 0 20px;
                &.info {
                    margin-top: 20px;
                }
                &.time {
                    margin: 10px 0 15px;
                }
            }
            .hot {
                position: absolute;
                z-index: 2;
                top: -5px;
                right: -4px;
            }
        }
    }
}
</style>
