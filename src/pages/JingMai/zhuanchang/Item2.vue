<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import ComDetails from '@/components/common/ComDetails.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const query = {
    addPrice: false
};
</script>

<template>
    <div class="wrap">
        <ComDetails :query="query"></ComDetails>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
