<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getCaoGaoApi } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
});
const list = ref([]);
const removeList = ref([]);

const params = reactive({
    total: 1
});
watchEffect(() => {
    props.params.titleCate == '草稿' ? getMailList(1, 10) : '';
});
const getMailList = async (page, pageSize) => {
    try {
        params.PageIndex = page;
        params.PageSize = pageSize;
        let res = await getCaoGaoApi(params);
        list.value = res.Data;
        params.total = res.Total;
        console.log(res);
    } catch (error) {
        info('error', error);
    }
};
const columns = [
    {
        title: '主题',
        dataIndex: 'Title',
        key: 'Title'
    },
    {
        title: '时间',
        dataIndex: 'BaseCreateTime',
        key: 'BaseCreateTime',
        align: 'center',
        width: 328
    }
];
const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    removeList.value = selectedRowKeys;
    console.log(removeList.value);
};
const hasSelected = computed(() => removeList.value.length > 0);
const start = () => {
    loading.value = true;
};
</script>

<template>
    <div class="draft">
        <a-table
            :row-selection="{
                selectedRowKeys: removeList,
                onChange: onSelectChange
            }"
            :pagination="false"
            :columns="columns"
            :data-source="list"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div class="title-item">
                        <!-- <img src="" alt=""> -->
                        {{ record.Title }}
                    </div>
                </template>
            </template>
        </a-table>
        <div class="add-array">
            <a-button type="primary" :loading="loading" @click="start"> 选择 </a-button>
            <span style="margin-left: 8px">
                <template v-if="hasSelected">
                    {{ `总计 ${list.length} 项 已选 ${removeList.length} 项` }}
                </template>
            </span>
        </div>
        <CatePage :paginations="params" @fetchList="getCaoGaoApi"></CatePage>
    </div>
</template>

<style scoped lang="less">
.draft {
}
:deep(.ant-table-row) {
    cursor: pointer;
}
// :deep(.ant-table-thead) {
//     display: none;
// }
/* 在这里添加你的 Less 样式 */
</style>
