<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getExpertAPi } from '@/request/weituo/index';
const route = useRoute();
console.log(route.query.id);
const textInfo = ref('');
onMounted(async () => {
    let params = route.query.id;
    let res = await getExpertAPi(params);
    document.title = res.Data.seoData.seoTitle;
    textInfo.value = res.Data.ArticleInfo.Content;
});
</script>

<template>
    <div class="weituo-entrust">
        <p v-html="textInfo"></p>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
