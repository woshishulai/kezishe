<script setup>
import { ref, computed, h, reactive, watchEffect, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Receiving from './Receiving.vue';
import Write from './Write.vue';
import Draft from './Draft.vue';
import SendingDocuments from './SendingDocuments.vue';
const showModals = ref(null);
const router = useRouter();
const route = useRoute();
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
const params = ref({
    titleCate: list[0].cate
});
const props = defineProps();
onMounted(() => {});
watchEffect(() => {
    params.value = showModals.value?.params;
});
</script>

<template>
    <div class="mail">
        <div class="card-box">
            <div class="title"> 我的竞买 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <Receiving v-show="params?.titleCate == '收件'"></Receiving>
                    <Write v-show="params?.titleCate == '写信'"></Write>
                    <Draft v-show="params?.titleCate == '草稿'"></Draft>
                    <SendingDocuments v-show="params?.titleCate == '发件'"></SendingDocuments>
                </template>
            </show-modal>
        </div>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
</style>
