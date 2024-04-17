<script setup>
import { ref, computed, h, reactive, watchEffect, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Receiving from './Receiving.vue';
import Write from './Write.vue';
import Draft from './Draft.vue';
import SendingDocuments from './SendingDocuments.vue';
const showModals = ref(null);
const details = ref({});
const router = useRouter();
const route = useRoute();
const active = ref(0);
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
onMounted(() => {
    if (!route.query) {
        console.log('调用了');
        active.value = 0;
        params.value.titleCate = '收件';
        if (showModals.value?.params) {
            console.log((showModals.value.params.titleCate = '收件'));
        }
    } else if (route.query.tab === 'write') {
        active.value = 1;
        params.value.titleCate = '写信';
        if (showModals.value?.params) {
            console.log((showModals.value.params.titleCate = '写信'));
        }
        console.log(params.value.titleCate);
    } else if (route.query.tab === 'draft') {
        active.value = 2;
        params.value.titleCate = '草稿';
        if (showModals.value?.params) {
            console.log((showModals.value.params.titleCate = '草稿'));
        }
    } else if (route.query.tab === 'send') {
        active.value = 3;
        params.value.titleCate = '发件';
        if (showModals.value?.params) {
            console.log((showModals.value.params.titleCate = '发件'));
        }
    }
});
watch(
    () => route.query, // 监听 route.query 的变化
    (newQuery, oldQuery) => {
        if (!route.query) {
            console.log('调用了');
            active.value = 0;
            params.value.titleCate = '收件';
            if (showModals.value?.params) {
                console.log((showModals.value.params.titleCate = '收件'));
            }
        } else if (newQuery.tab === 'write') {
            active.value = 1;
            params.value.titleCate = '写信';
            if (showModals.value?.params) {
                console.log((showModals.value.params.titleCate = '写信'));
            }
            console.log(params.value.titleCate);
        } else if (newQuery.tab === 'draft') {
            active.value = 2;
            params.value.titleCate = '草稿';
            if (showModals.value?.params) {
                console.log((showModals.value.params.titleCate = '草稿'));
            }
        } else if (newQuery.tab === 'send') {
            active.value = 3;
            params.value.titleCate = '发件';
            if (showModals.value?.params) {
                console.log((showModals.value.params.titleCate = '发件'));
            }
        }
    },
    { immediate: true, deep: true } // 开启深度监听
);
const props = defineProps();
onMounted(() => {});
watchEffect(() => {
    if (
        route.path == '/user/mail' &&
        showModals.value?.params &&
        showModals.value?.params.titleCate
    ) {
        if (showModals.value.params.titleCate == '收件') {
            active.value = 0;
            params.value.titleCate = '收件';
            router.push({
                path: '/user/mail?',
                query: {}
            });
        } else if (showModals.value.params.titleCate == '写信') {
            active.value = 1;
            console.log(1);
            router.push({
                path: '/user/mail?',
                query: {
                    tab: 'write'
                }
            });
        } else if (showModals.value.params.titleCate == '草稿') {
            active.value = 2;
            console.log(2);
            router.push({
                path: '/user/mail?',
                query: {
                    tab: 'draft'
                }
            });
        } else if (showModals.value.params.titleCate == '发件') {
            active.value = 3;
            console.log(3);
            router.push({
                path: '/user/mail?',
                query: {
                    tab: 'send'
                }
            });
        }
    }
    console.log(showModals.value?.params);
});
const changePage = (paramss) => {
    params.value.titleCate = paramss.page;
    params.value.Types = paramss.Types;
    details.value.Id = paramss.ID || '';
    params.value.ReplayId = paramss.ReplayId || 0;
    params.value.MsgTab = paramss.MsgTab || 0;
    params.value.Title = paramss.Title || '';
    params.value.Contents = paramss.Contents || '';
    console.log(params.value, '测试的');
};
</script>

<template>
    <div class="mail">
        <div class="card-box">
            <div class="title"> 我的竞买 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <Receiving
                        :params="params"
                        @changePage="changePage"
                        v-show="active == 0"
                    ></Receiving>
                    <Write @changePage="changePage" :params="params" v-show="active == 1"></Write>
                    <Draft :params="params" v-show="active == 2"></Draft>
                    <SendingDocuments :params="params" v-show="active == 3"></SendingDocuments>
                </template>
            </show-modal>
        </div>
    </div>
</template>

<style scoped lang="less">
.mail {
    font-family: 微软雅黑;
}
/* 在这里添加你的 Less 样式 */
:deep(.ant-table-thead) {
    .ant-table-cell {
        text-align: center;
        font-weight: 500;
        font-family: 微软雅黑;
    }
    .ant-checkbox-wrapper {
        // opacity: 0;
    }
}
:deep(.ant-table-row) {
    cursor: pointer;
    font-size: 16px;
    color: #4a4a4a;
}
:deep(.ant-table-wrapper) {
    .ant-table-thead > tr > th {
        background-color: #fff;
        font-size: 18px;
    }
}
</style>
