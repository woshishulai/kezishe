<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMenuListAPi } from '@/request/weituo/index';
const route = useRoute();
onMounted(async () => {
    let params = {
        id: route.query.id,
        coltype: 'single'
    };
    let res = await getMenuListAPi(params);
    document.title = res.Data.seoData.seoTitle;
    console.log(res);
});
</script>

<template>
    <div class="wrap"></div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
