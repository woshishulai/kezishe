<script setup>
import { ref, computed, reactive, onMounted, watchEffect, h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const loading = ref(false);
const showModals = ref(null);
const params = ref({});
const columnsList = ref([]);
const dataSourceList = ref([]);
const columns1 = [
    {
        title: '产生时间',
        dataIndex: 'increaseTime',
        key: 'increaseTime',
        width: '250px',
        align: 'center'
    },
    {
        title: '类别',
        dataIndex: 'cate',
        key: 'cate',
        align: 'center'
    },
    {
        title: '增加',
        dataIndex: 'increase',
        key: 'increase',
        align: 'center'
    },
    {
        title: '减少',
        dataIndex: 'reduce',
        key: 'reduce',
        align: 'center'
    },
    {
        title: '仓储费',
        dataIndex: 'storage',
        key: 'storage',
        align: 'center'
    }
];
const columns2 = [];
const dataList1 = [
    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    },
    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    },

    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    },
    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    },
    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    },
    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    },
    {
        increaseTime: '2024-29-44 01:52:44',
        cate: '交易单支付',
        increase: '+3452',
        reduce: '-3452',
        storage: ''
    }
];
const dataList2 = [];
const query = reactive({
    cid: '-1',
    start: '-1',
    end: '-1',
    brand: '-1',
    kw: '',
    status: undefined,
    pageSize: '10',
    pageIndex: '1'
});
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
watchEffect(() => {
    console.log(params.value.titleCate);
    columnsList.value =
        params.value.titleCate == list[0].cate || params.value.titleCate == undefined
            ? columns1
            : columns2;
    dataSourceList.value =
        params.value.titleCate == list[0].cate || params.value.titleCate == undefined
            ? dataList1
            : dataList2;
    if (params.value.titleCate == list[1].cate && params.value.statusCate == '额度明细') {
        (columnsList.value = columns2), (dataSourceList.value = dataList2JieSuan);
    }
});
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const getGoodsList = async () => {
    console.log(query);
    loading.value = true;
    try {
        let res = await getUserCollectionListApi(query);
        loading.value = false;
        console.log(res);
    } catch (error) {}
};
</script>

<template>
    <div class="card-box">
        <div class="title"> 财务明细 </div>
        <ShowModal ref="showModals" :titleList="list">
            <template v-slot:active3>
                <div class="search-cate" v-if="params.titleCate == list[0].cate">
                    <a-select
                        placeholder="所有分类"
                        v-model:value="query.status"
                        style="width: 220px"
                        @change="handleChange"
                    ></a-select>
                    <a-select
                        placeholder="所有时间"
                        v-model:value="query.status"
                        style="width: 220px"
                        @change="handleChange"
                    ></a-select>
                    <a-button :loading="loading" @click="getGoodsList" :icon="h(SearchOutlined)"
                        >搜索</a-button
                    >
                </div>
            </template>
            <template v-slot:active4>
                <a-table :pagination="false" :columns="columnsList" :dataSource="dataSourceList">
                </a-table>
            </template>
        </ShowModal>
        <CatePage></CatePage>
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
