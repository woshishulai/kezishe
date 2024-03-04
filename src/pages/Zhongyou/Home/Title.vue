<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});
onMounted(() => {});
</script>

<template>
    <div class="title">
        <div class="icons">
            <img :src="getImageUrl('zhongyou/icon1.jpg')" alt="" />
            <img :src="getImageUrl('zhongyou/icon2.jpg')" alt="" />
        </div>
        {{ props.title }}
        <div class="icons">
            <img :src="getImageUrl('zhongyou/icon1.jpg')" alt="" />
            <img :src="getImageUrl('zhongyou/icon2.jpg')" alt="" />
        </div>
    </div>
</template>

<style scoped lang="less">
.title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    margin-top: 30px;
    background: url('@/assets/img/weituo/menu-title.png');
    background-size: 100% 100%;
    color: #ffebba;
    font-size: 20px;
    .icons {
        display: flex;
        align-items: center;
    }
}
</style>
