<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getHeTongApi } from '@/request/user/api.js';
import { timeStartOptions } from '../MyEntrustment/data';
import { options2, options3, HeTongDataSource, HeTongColumns } from '../MyEntrustment/data';
import CatePage from '@/components/common/CatePage.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const tableList = ref([]);
const statusLists = [
    {
        value: '-1',
        label: '全部'
    },
    {
        value: '1',
        label: '待受理'
    },
    {
        value: '2',
        label: '已受理'
    },
    {
        value: '3',
        label: '整理中'
    },
    {
        value: '4',
        label: '制图中'
    },
    {
        value: '5',
        label: '审核中'
    },
    {
        value: '6',
        label: '核查中'
    },
    {
        value: '7',
        label: '执行中'
    },
    {
        value: '8',
        label: '已执行'
    }
];
const query = reactive({
    Status: '-1', //默认状态
    TimeRange: '0', //时间范围
    Number: '',
    PageSize: '10',
    PageIndex: '1',
    total: 1
});
const getTableList = async (page, pageSize) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let newRes = await getGoodsListApi(query);
        tableList.value = newRes.Data;
        query.total = newRes.Total;
        console.log(newRes, '我是返回的数据', query.total);
    } catch (error) {
        info('error');
    }
};
const list = [
    {
        cate: '自营合同'
    },
    {
        cate: '商城合同'
    }
];
const state = reactive({
    selectedRowKeys: [],
    loading: false
});
const start = () => {
    state.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
    }, 1000);
};
const value = ref('');
const value1 = ref('cate1');
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const getGoodsList = () => {
    loading.value = true;
};
</script>

<template>
    <div class="my-entrustment">
        <div class="card-box">
            <div class="title"> 我的合同 </div>
            <show-modal :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有合同状态"
                            v-model:value="query.Status"
                            :options="statusLists"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有时间"
                            v-model:value="query.TimeRange"
                            :options="timeStartOptions"
                            @change="handleChange"
                        ></a-select>
                        <a-input
                            v-model:value="query.Number"
                            class="item-input"
                            placeholder="合同号"
                        />
                        <a-button type="primary" @click="getGoodsList" :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                </template>
                <template v-slot:active3>
                    参考数据
                    <a-table
                        :pagination="false"
                        :columns="HeTongColumns"
                        :dataSource="HeTongDataSource"
                    >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === `status`">
                                <div v-if="record.status == '已执行'">{{ record.status }}</div>
                                <div v-else style="color: red">{{ record.status }}</div>
                            </template>
                        </template>
                    </a-table>
                </template>
            </show-modal>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less"></style>
