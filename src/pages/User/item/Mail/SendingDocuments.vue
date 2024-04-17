<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getFaSongApi } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
});
const list = ref([]);
const params = reactive({
    total: 1
});
const getMailList = async (page, pageSize) => {
    try {
        params.PageIndex = page;
        params.PageSize = pageSize;
        let res = await getFaSongApi(params);
        list.value = res.Data;
        params.total = res.Total;
        console.log(res);
    } catch (error) {
        info('error', error);
    }
};
watchEffect(() => {
    props.params?.titleCate == '发件' ? getMailList(1, 10) : '';
});

const columns = [
    {
        title: '主题',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center'
    },
    {
        title: '时间',
        dataIndex: 'BaseCreateTime',
        key: 'BaseCreateTime',
        align: 'center'
    }
];
</script>

<template>
    <div class="send-element">
        <a-table :pagination="false" :columns="columns" :data-source="list">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div class="title-item">
                        <!-- <img src="" alt=""> -->
                        {{ record.Title }}
                    </div>
                </template>
            </template>
        </a-table>
        <CatePage :paginations="params" @fetchList="getFaSongApi"></CatePage>
    </div>
</template>

<style scoped lang="less">
.send-element {
}
:deep(.ant-table-row) {
    cursor: pointer;
}
// :deep(.ant-table-thead) {
//     display: none;
// }
/* 在这里添加你的 Less 样式 */
</style>
