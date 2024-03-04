<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const countDown = ref(50);
onMounted(() => {
    const timer = setInterval(() => {
        countDown.value--;
        if (countDown.value === 0) {
            clearInterval(timer);
            router.push('/login');
        }
    }, 1000);
});

const getCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    return `当前时间：${currentTime}`;
};
</script>

<template>
    <div class="success-wrap">
        <a-result
            status="success"
            :title="`账号密码重置成功!${countDown}秒钟后跳转到到登录页重新登录`"
            :sub-title="getCurrentTime()"
        >
            <template #extra>
                <div class="btn" @click="router.push('/login')">
                    <a-button type="primary">去登录</a-button></div
                >
            </template>
        </a-result>
    </div>
</template>
<style scoped lang="less"></style>
