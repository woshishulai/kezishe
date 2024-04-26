<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { recordRemittanceList } from '@/request/user/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tableList = ref([]);
const columns = [
    {
        title: '告知单号',
        dataIndex: 'OrderNo',
        key: 'OrderNo',
        align: 'center',
        width: '200px'
    },
    {
        title: '提交时间',
        dataIndex: 'Dates',
        key: 'Dates',
        align: 'center',
        width: '220px'
    },
    {
        title: '汇款方式',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center',
        width: '200px'
    },
    {
        title: '汇款金额',
        dataIndex: 'Prices',
        key: 'Prices',
        align: 'center',
        width: '200px'
    },
    {
        title: '汇款日期',
        dataIndex: 'Dates',
        key: 'Dates',
        align: 'center',
        width: '200px'
    },
    {
        title: '汇款人',
        dataIndex: 'UName',
        key: 'UName',
        align: 'center',
        width: '200px'
    },
    {
        title: '出款信息',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center',
        width: '200px'
    },
    {
        title: '收款信息',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '200px'
    },
    {
        title: '关联单号',
        dataIndex: 'Uid',
        key: 'Uid',
        align: 'center',
        width: '200px'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '200px',
        align: 'center'
    }
];
const params = reactive({
    total: 1
});
const emits = defineEmits(['close']);
const getList = async (page, pageSize) => {
    try {
        params.PageIndex = page;
        params.PageSize = pageSize;
        let res = await recordRemittanceList(params);
        if (res.Tag == 1) {
            params.total = res.Total;
            tableList.value = res.Data;
        }
    } catch (error) {
        info('error', error);
    }
};
onMounted(async () => {
    getList(1, 10);
});
</script>

<template>
    <div class="tables">
        <div class="titles">
            <p> 汇款告知记录</p>
            <span @click="emits('close')">X</span>
        </div>
        <a-table
            :pagination="false"
            :columns="columns"
            :scroll="{ x: '1200px', y: '500px' }"
            scrollToFirstRowOnChange="true"
            :data-source="tableList"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                    <div class="status">
                        {{ '通过' }}
                    </div>
                </template>
            </template>
        </a-table>
        <cate-page :paginations="params" @fetchList="getList"></cate-page>
    </div>
</template>

<style scoped lang="less">
.tables {
    width: 100%;
    .titles {
        .flex-row;
        justify-content: space-between;
        padding: 5px 30px 25px;
        p {
            font-size: 20px;
            font-weight: 600;
        }
        span {
            font-size: 16px;
            font-weight: 600;
            color: #666;
            cursor: pointer;
        }
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #eef3f8;
    }
    :deep(.ant-table-cell) {
        font-size: 14px;
    }
}
</style>
<style></style>
