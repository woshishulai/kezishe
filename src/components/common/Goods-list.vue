<script setup>
import { getImageUrl } from '@/utils/index';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
defineProps({
    title: String,
    list: Array
});
</script>

<template>
    <div class="goods-wrap">
        <div class="title">
            <h5>{{ title }}</h5>
            <span></span>
        </div>
        <div class="goods-list">
            <div
                class="goods-item"
                v-for="item in list"
                :key="item.id"
                @click="router.push('/jingmai/goods-details')"
            >
                <img :src="getImageUrl(item.img)" alt="" />
                <p class="item-title">{{ item.title }}</p>
                <p class="jiage">
                    <span class="rmb"> ￥ {{ item.rmb }}</span>
                    <span class="now">竞买中</span>
                </p>
                <p class="time">{{ item.time }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.goods-wrap {
    padding: 30px 0;

    .title {
        background: url('@/assets/img/home/lang-bg.jpg');
        .flex-col;

        h5 {
            color: #e5574f;
            margin: 20px 0 10px;
            font-size: 22px;
            font-weight: 600;
        }

        span {
            width: 160px;
            height: 5px;
            background: #eb655c;
        }
    }

    .goods-list {
        .flex-row;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 12px;

        .goods-item {
            width: 270px;
            padding: 12px;
            box-sizing: border-box;
            .flex-col;
            gap: 15px;
            align-items: flex-start;
            background: #fff;
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
