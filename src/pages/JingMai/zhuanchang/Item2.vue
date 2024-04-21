<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import ComDetails from '@/components/common/ComDetails.vue';
import { getGoodsDetails } from '@/request/jingmai';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const goodsDtails = ref({});
onMounted(async () => {
    try {
        let res = await getGoodsDetails();
        goodsDtails.value = res.Data;
    } catch (error) {
        info('error', error);
    }
});
const query = {
    addPrice: false
};
</script>

<template>
    <div class="wrap">
        <ComDetails :query="query" :goodsDtails="goodsDtails"></ComDetails>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
