<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getZhuanChangHomeApi } from '@/request/jingmai';
import Cen from '../item/Cen.vue';
import List from '../item/List.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const fetchData = ref([]);
onMounted(async () => {
    try {
        let res = await getZhuanChangHomeApi({ Types: 1 });
        fetchData.value = res.Data;
        console.log(res, '专场首页 index 竞买 16行');
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <div class="wrap">
        <Cen :banner="fetchData?.BannerList"></Cen>
        <List :SpecialList="fetchData?.SpecialList"></List>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
