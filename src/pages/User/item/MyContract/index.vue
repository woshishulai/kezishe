<script setup>
import { ref, computed, reactive, onMounted, h, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getHeTongApi } from '@/request/user/api.js';
import { timeStartOptionss } from '../MyEntrustment/data';
import { options2, options3, HeTongDataSource, HeTongColumns } from '../MyEntrustment/data';
import { info } from '@/hooks/antd/message';
import CatePage from '@/components/common/CatePage.vue';
import Details from './Details.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const showModals = ref(null);
const tableList = ref([]);
const loading = ref(false);
const statusInfo = (index) => {
    let statuses = {
        '-1': '全部',
        1: '待受理',
        2: '已受理',
        3: '整理中',
        4: '制图中',
        5: '审核中',
        6: '核查中',
        7: '执行中',
        8: '已执行'
    };
    return statuses[index] || '未知状态';
};

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
const getTableList = async (page = 1, pageSize = 10) => {
    loading.value = true;
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let newRes;
        if (showModals.value?.params?.titleCate == '自营合同') {
            newRes = await getHeTongApi(query);
        }
        tableList.value = newRes.Data;
        query.total = newRes.Total;
    } catch (error) {}
    loading.value = false;
};
const list = [
    {
        cate: '自营合同'
    },
    {
        cate: '商城合同'
    }
];

watch(
    () => showModals.value?.params?.titleCate,
    () => {
        query.total = 1;
        tableList.value = [];
        getTableList();
    }
);
const showDetails = (Number) => {
    router.push({
        path: '/user/my-entrustment/my-contract',
        query: {
            Number
        }
    });
};
</script>

<template>
    <Details v-if="route.query.Number"></Details>
    <div v-else class="my-entrustment">
        <div class="card-box">
            <div class="title"> 我的合同 </div>
            <show-modal :titleList="list" ref="showModals">
                <template v-slot:active2>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有合同状态"
                            v-model:value="query.Status"
                            :options="statusLists"
                        ></a-select>
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有时间"
                            v-model:value="query.TimeRange"
                            :options="timeStartOptionss"
                        ></a-select>
                        <a-input
                            v-model:value="query.Number"
                            class="item-input"
                            @keydown.enter="getTableList()"
                            placeholder="合同号"
                        />
                        <a-button
                            @click="getTableList()"
                            :loading="loading"
                            :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                </template>
                <template v-slot:active3>
                    <a-table :pagination="false" :columns="HeTongColumns" :dataSource="tableList">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === `Status`">
                                <p :class="record.Status == 2 ? 'active' : ''">
                                    {{ statusInfo(record.Status) }}
                                </p>
                            </template>
                            <template v-if="column.key === `Details`">
                                <p class="details" @click="showDetails(record.Number)">
                                    查看详情
                                </p>
                            </template>
                        </template>
                    </a-table>
                </template>
            </show-modal>
            <CatePage :paginations="query" @fetchList="getTableList"></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
.my-entrustment {
    .ant-input {
        border-width: 1px;
        border-style: solid;
        border-radius: 4px;
        border-color: rgb(218, 225, 232);
        height: 43px;
        background-color: rgb(255, 255, 255);
        font-size: 14px;
    }
    :deep(.ant-select-selection-item) {
        line-height: 43px;
        font-size: 14px;
    }
    :deep(.ant-select-selection-placeholder) {
        line-height: 43px;
    }
    :deep(.ant-select-selector) {
        font-size: 14px;

        .ant-select-selection-search-input {
            height: 43px;
            line-height: 43px;
            font-size: 14px;
        }
    }
    :deep(.ant-table-wrapper) {
        .ant-table-thead > tr > th {
            background-color: #eef3f8;
        }
        .active {
            color: #a11111;
        }
        .details {
            cursor: pointer;
            &:hover {
                color: #a11111;
            }
        }
    }
}
</style>
