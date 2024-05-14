<script setup>
import { ref, watchEffect, onUnmounted, defineProps } from 'vue';

const props = defineProps({
    time: {
        type: String,
        default: ''
    },
    TimeNow: {
        type: String,
        default: ''
    }
});
const emits = defineEmits(['fetchDataList']);

const time = ref('');
const endTimes = ref('');
let interval;

watchEffect(() => {
    if (props?.TimeNow) {
        time.value = Math.floor(new Date(props?.TimeNow).getTime() / 1000);
    }
    if (props?.time) {
        endTimes.value = Math.floor(new Date(props?.time).getTime() / 1000);
    }
});

const endTime = () => {
    emits('fetchDataList');
};

const countdown = ref('');

const calculateCountdown = () => {
    if (isNaN(time.value) || isNaN(endTimes.value)) {
        console.log('无效的日期');
        return;
    }

    const currentTime = new Date().getTime() / 1000;
    const difference = endTimes.value - currentTime;

    if (difference > 0) {
        const totalSeconds = Math.floor(difference);

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

watchEffect(() => {
    calculateCountdown();
    interval = setInterval(calculateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <div>
        <p>({{ countdown }})</p>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
