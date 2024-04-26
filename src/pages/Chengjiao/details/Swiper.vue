<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    swiperList: {
        type: Object,
        default: []
    },
    userId: {
        type: String,
        default: ''
    }
});
onMounted(() => {});
</script>

<template>
    <a-carousel
        v-if="props?.swiperList.length"
        autoplay
        :slides-to-scroll="2"
        :slides-to-show="2"
        dot-position="left"
    >
        <div class="item" v-for="item in props?.swiperList" :key="item.Uid">
            <p :class="item.Uid == props?.userId ? 'active' : ''">
                <span class="user">{{ item.Unick }}</span>
                <span class="price">¥{{ item.MPrice }}</span>
                <span class="time">{{ item.CreateTime }}</span>
                <span class="address">{{ item.IpAddr }}</span>
            </p>
        </div>
    </a-carousel>
</template>
<script setup></script>
<style scoped lang="less">
:deep(.slick-slide) {
    overflow: hidden;
}
:deep(.slick-list) {
    margin: 5px 0;
}
:deep(.slick-track) {
    height: auto !important;
}
.item {
    padding: 5px 40px;
    p {
        display: flex;
        justify-content: space-between;
        // line-height: 30px;
        color: #777;
        &.active {
            color: #9a0000;
        }
        span {
            &.user {
                width: 200px;
            }
            &.price {
                width: 140px;
            }
            &.time {
                width: 200px;
            }
            &.address {
                min-width: 100px;
            }
        }
    }
}
</style>
