<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();

onMounted(() => {});
const props = defineProps({
    time: {
        type: String,
        default: ''
    }
});
const endTime = () => {
    console.log('时间到了');
};

const countdown = ref('');

const calculateCountdown = () => {
    const offerTime = props?.time;
    if (!offerTime) return;

    // 获取用户本地时间
    const userTime = new Date();

    const endTimeValue = new Date(offerTime); // 服务器时间
    const currentTime = userTime;

    const difference = endTimeValue - currentTime;
    if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);

        const hours = Math.floor(totalSeconds / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        countdown.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
        )}:${String(seconds).padStart(2, '0')}`;
    } else {
        countdown.value = '00:00:00';
        // 倒计时结束，调用 endTime 方法
        endTime();
        clearInterval(interval); // 清除定时器
    }
};

let interval;

watchEffect(() => {
    calculateCountdown();
    interval = setInterval(calculateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <p>({{ countdown }})</p>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
