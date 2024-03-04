<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const actives = ref(4);
const menuItems = ['收藏商品', '微信分享', '微博分享', '历史查询', '咨询反馈'];
const setActive = (index) => {
    actives.value = index;
};
</script>

<template>
    <div class="right-nav">
        <div
            v-for="(item, index) in menuItems"
            :key="index"
            :class="{ active: actives === index - 1 }"
            class="share-item"
            @mouseover="setActive(index - 1)"
        >
            {{ menuItems[index - 1] }}
        </div>
    </div>
</template>

<style scoped lang="less">
.right-nav {
    position: fixed;
    top: 50%;
    right: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
    width: 50px;
    .share-item {
        padding: 10px;
        line-height: 20px;
        border-bottom: 1px solid #dbdbdb;
        cursor: pointer;
        &:nth-child(5) {
            border: none;
        }
        &.active {
            background-color: #9a0000;
            color: #fff;
        }
    }
}
</style>
