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
                <p class="label">{{ item.Title }}</p>
                <p class="time">{{ item.Ontime }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hot-goods {
    width: 300px;
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
            .flex-col;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 20px;
            padding: 10px 10px 15px;
            justify-content: space-between;
            background-color: #fff;
            cursor: pointer;
            .goods-img {
                .flex-row;
                width: 100%;
                height: 200px;
                padding: 10px;
                img {
                    max-height: 100%;
                    max-width: 100%;
                }
            }
            .label {
                width: 100%;
                .ellipsis;
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
