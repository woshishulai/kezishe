<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    goodsList: {
        type: Array,
        default: []
    },
    title: {
        type: String,
        default: ''
    }
});
onMounted(() => {});
</script>

<template>
    <div class="hot-goods">
        <div class="top-title"> {{ props?.title }} </div>
        <div class="goods-list">
            <div class="goods-item" v-for="item in props?.goodsList.slice(0, 6)">
                <div class="goods-img">
                    <img :src="item.CoverImg" alt="" />
                </div>
                <div class="text-wrap">
                    <p class="label">{{ item.Title }}</p>
                    <p class="price">¥ {{ item.BasePrice }}</p>
                    <p class="time">{{ item.Ontime }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hot-goods {
    width: 300px;
    margin-top: 30px;
    background-color: #fcdca5;
    .top-title {
        color: #fff;
        font-size: 20px;
        padding: 20px;
        background-color: #c83327;
    }
    .goods-list {
        padding: 20px 10px;
        .goods-item {
            .flex-row;
            gap: 10px;
            margin-bottom: 20px;
            padding: 10px 10px;
            justify-content: space-between;
            background-color: #f4f4f4;
            cursor: pointer;
            .goods-img {
                .flex-row;
                padding: 10px;
                background-color: #fff;
                img {
                    max-height: 80px;
                }
            }
            .text-wrap {
                flex: 1;
                .ellipsis;
                .price {
                    margin: 10px 0;
                    color: #c83327;
                    font-weight: normal;
                }
            }
        }
    }
    .goods-item:hover {
        img {
            transform: scale(1.1);
            transition: 0.3s;
        }
    }
}
</style>
