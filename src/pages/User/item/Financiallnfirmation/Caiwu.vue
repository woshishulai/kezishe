<script setup>
import { ref, computed, reactive, onMounted, watch, h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { getYuERiJiParams, yuerijizhang, eDuInfoParams, edumingxi } from '@/request/user/api';
const timeOptions = [
    {
        value: '0',
        label: '全部'
    },
    {
        value: '1',
        label: '一月内'
    },
    {
        value: '2',
        label: '三月内'
    },
    {
        value: '3',
        label: '六月内'
    },
    {
        value: '4',
        label: '六月外'
    }
];
const query = reactive({
    total: 1,
    TimeRange: '0',
    Kid: '0',
    PageSize: 1,
    PageSize: 10
});
const paramsList = ref([]);
const getEDuParasList = async () => {
    let res = await getYuERiJiParams();
    paramsList.value = res.Data;
    console.log(paramsList.value);
};
const getEDuParasLists = async () => {
    let res = await eDuInfoParams();
    paramsList.value = res.Data;
    console.log(paramsList.value);
};
const tableList = ref([]);
const getTableList = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    console.log(query);
    let res;
    if (params.value.titleCate == list[0].cate) {
        res = await yuerijizhang(query);
    } else if (params.value.titleCate == list[1].cate) {
        res = await edumingxi(query);
    }
    query.total = res.Total;
    tableList.value = res.Data;
    console.log(tableList.value);
};
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const showModals = ref(null);
const params = ref({});
const columnsList = ref([]);
const columns1 = [
    {
        title: '产生时间',
        dataIndex: 'CreateTime',
        key: 'CreateTime',
        align: 'center'
    },
    {
        title: '类别',
        dataIndex: 'KDes',
        key: 'KDes',
        align: 'center'
    },
    {
        title: '金额',
        dataIndex: 'Amount',
        key: 'Amount',
        align: 'center'
    }
];

onMounted(() => {
    params.value = showModals.value?.params;
});
const list = [
    {
        cate: '余额日记账'
    },
    {
        cate: '额度明细'
    }
];

watch(
    () => showModals.value?.params?.titleCate,
    () => {
        if (showModals.value?.params?.titleCate == list[0].cate) {
            query.TimeRange = '0';
            query.Kid = '0';
            getEDuParasList();
            getTableList();
            columnsList.value = columns1;
            return;
        }
        if (showModals.value?.params?.titleCate == list[1].cate) {
            query.TimeRange = '0';
            query.Kid = '0';
            getEDuParasLists();
            getTableList();
            columnsList.value = columns1;
            return;
        }
    }
);
</script>

<template>
    <div class="card-box">
        <div class="title"> 财务明细 </div>
        <ShowModal ref="showModals" :titleList="list">
            <template v-slot:active3>
                <div class="search-cate">
                    <a-select
                        placeholder="所有分类"
                        v-model:value="query.Kid"
                        style="width: 220px"
                        :options="paramsList"
                        :field-names="{ label: 'Value', value: 'Key', options: 'Children' }"
                    ></a-select>
                    <a-select
                        placeholder="所有时间"
                        v-model:value="query.TimeRange"
                        style="width: 220px"
                        :options="timeOptions"
                    ></a-select>
                    <a-button @click="getTableList()" :icon="h(SearchOutlined)">搜索</a-button>
                </div>
            </template>
            <template v-slot:active4>
                <a-table :pagination="false" :columns="columnsList" :dataSource="tableList">
                </a-table>
            </template>
        </ShowModal>
        <CatePage :paginations="query" @fetchList="getTableList"></CatePage>
    </div>
</template>

<style scoped lang="less">
.card-box {
    padding: 0 20px 30px;
}
:deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background-color: #eef3f8;
}
</style>
