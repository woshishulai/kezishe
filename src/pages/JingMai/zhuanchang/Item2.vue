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
const getGoodsDetailsFn = async () => {
    try {
        let res = await getGoodsDetails(route.query.id);
        goodsDtails.value = res.Data;
        console.log(goodsDtails.value, '商品详情页');
    } catch (error) {
        info('error', error);
    }
};
onMounted(async () => {
    getGoodsDetailsFn();
});
</script>

<template>
    <ComDetails @getGoodsDetailsFn="getGoodsDetailsFn" :goodsDtails="goodsDtails"></ComDetails>
</template>
