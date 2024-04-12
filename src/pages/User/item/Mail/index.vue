<script setup>
import { ref, computed, h, reactive, watchEffect, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const showModals = ref(null);
const router = useRouter();
const route = useRoute();
const params = ref();
const props = defineProps({});
onMounted(() => {});
watchEffect(() => {
    params.value = showModals.value?.params;
    console.log(params.value?.titleCate);
});
const list = [
    {
        cate: '收件'
    },
    {
        cate: '写信'
    },
    {
        cate: '草稿'
    },
    {
        cate: '发件'
    }
];
</script>

<template>
    <div class="mail">
        <div class="card-box">
            <div class="title"> 我的竞买 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2> </template>
            </show-modal>
        </div>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
