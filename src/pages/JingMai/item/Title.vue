<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    SpecialInfo: {
        type: Object,
        default: {}
    }
});
onMounted(() => {});
</script>

<template>
    <div class="top-title" v-if="props?.SpecialInfo?.Title">
        <div class="title">
            <h5>{{ props.SpecialInfo.Title }}</h5>
            <p>时间 : {{ props.SpecialInfo.Starttime }} - {{ props.SpecialInfo.Ontime }}</p>
        </div>
        <div class="show-goods-list">
            <img :src="props.SpecialInfo.Img" alt="" />
            <div class="text-wrap" v-html="props.SpecialInfo.Brief"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.top-title {
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        background-color: #e8e8e8;
        h5 {
            font-size: 20px;
            color: #9a0000;
        }
        p {
            font-size: 16px;
        }
    }
    .show-goods-list {
        display: flex;
        flex-direction: row;
        gap: 30px;
        padding: 20px;
        background-color: #f8f8f8;
        img {
            width: 346px;
        }
        .text-wrap {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .goods-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .goods-item {
                    width: 40%;
                    margin: 10px 0;
                    color: #303030;
                }
            }
        }
    }
}
</style>
