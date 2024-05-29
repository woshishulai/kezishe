<script setup>
import { ref, computed, reactive, onMounted, h, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import CatePage from '@/components/common/CatePage.vue';
import SettleMentDetails from './SettlementDetails.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getJieSuanDetailsApi, getQueRenDetailsApi } from '@/request/user/api';
import {
    options1,
    timeStartOptionss,
    list,
    tableListsss,
    gouWuTitleColumns,
    gouWuDataSource
} from './data';
const setColumns = ref([
    {
        title: '编号',
        key: 'Sbn',
        dataIndex: 'Sbn',
        align: 'center'
    },
    {
        title: '结算单数',
        key: 'SettNums',
        dataIndex: 'SettNums',
        align: 'center'
    },
    {
        title: '结算总结标额',
        key: 'Prices',
        dataIndex: 'Prices',
        align: 'center'
    },
    {
        title: '结算总额',
        key: 'TotalMPrice',
        dataIndex: 'TotalMPrice',
        align: 'center'
    },

    {
        title: '',
        key: 'UnSteeNum',
        dataIndex: 'UnSteeNum',
        align: 'center'
    }
    // {
    //     title: '',
    //     key: 'CreateTime',
    //     dataIndex: 'CreateTime',
    //     width: 200,
    //     align: 'center'
    // }
    // {
    //     title: '',
    //     key: 'Status',
    //     dataIndex: 'Status',
    //     align: 'center'
    // },
    // {
    //     title: '',
    //     key: 'details',
    //     dataIndex: 'details',
    //     align: 'center'
    // }
]);
const query = reactive({
    TimeRange: '0',
    PageSize: '1',
    PageIndex: '5',
    Kw: '',
    total: 1
});
const tableList = ref([]);

const cate = ref('0');
const getGoodsList = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let res;
        if (cate.value == 0) {
            res = await getJieSuanDetailsApi(query);
        } else {
            res = await getQueRenDetailsApi(query);
        }
        tableList.value = res.Data;
        query.total = res.Tag;
        console.log(res);
    } catch (error) {}
};
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const showModals = ref(null);
const params = ref({});
const showDetails = ref(true);
onMounted(() => {
    params.value = showModals.value?.params;
});

watch(
    () => showModals.value?.params?.titleCate,
    () => {
        query.total = 1;
        getGoodsList();
    }
);

const changeShowDetails = (number) => {
    showDetails.value = false;
    router.push({
        path: 'user/my-entrustment/settlement-details',
        query: {
            Number: number
        }
    });
};
</script>

<template>
    <div class="my-set-details" v-if="showDetails">
        <div class="card-box">
            <div class="title"> 结算明细 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate" v-if="params.titleCate == list[0].cate">
                        <a-select
                            ref="select"
                            placeholder="按合同查看"
                            class="item"
                            v-model:value="cate"
                            :options="options1"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            class="item"
                            v-model:value="query.TimeRange"
                            :options="timeStartOptionss"
                        ></a-select>
                        <a-input
                            v-model:value="query.Kw"
                            class="item-input"
                            placeholder="名称和藏品"
                        />
                        <a-button @click="getGoodsList()" :icon="h(SearchOutlined)">搜索</a-button>
                    </div>
                    <div class="search-cate" v-else>
                        <a-input
                            v-model:value="value"
                            style="width: 330px"
                            placeholder="结算单号"
                        />
                        <a-button @click="getGoodsList" :icon="h(SearchOutlined)">搜索</a-button>
                    </div>
                </template>
                <template v-slot:active3>
                    <div class="table-list" v-if="params.titleCate == list[0].cate">
                        <div class="title">
                            <span v-for="item in tableListsss" :key="item">{{ item.cate }}</span>
                        </div>
                        <div class="table-wrap" v-for="item in tableList" :key="item.Cbn">
                            <div class="flexs">
                                <div class="flex">
                                    <img
                                        class="table-header"
                                        :src="getImageUrl('user/weituo/1.png')"
                                        alt=""
                                    />
                                    合同编号： {{ item.Cbn }}
                                </div>
                                <div> 结算单数: {{ item.SNums }}</div>
                                <div> 结算总结标额: {{ item.Prices }}</div>
                                <div> 结算总额: {{ item.TotalMPrice }}</div>
                                <div> 未结算藏品数: {{ item.UnSteeNum }}</div>
                            </div>
                            <a-table
                                :pagination="false"
                                :columns="setColumns"
                                :dataSource="item.SettleMentList"
                                :class="item.SettleMentList.length ? '' : 'active'"
                            >
                                <!-- <template #headerCell="{ title, column }">
                                    <template v-if="column.key === `Sbn`">
                                        <div class="flex">
                                            <img
                                                class="table-header"
                                                :src="getImageUrl('user/weituo/1.png')"
                                                alt=""
                                            />
                                            合同编号： {{ item.Cbn }}
                                        </div>
                                    </template>
                                    <template v-if="column.key === `SettNums`">
                                        结算单数: {{ item.SNums }}
                                    </template>
                                    <template v-if="column.key === `Prices`">
                                        结算总结标额: {{ item.Prices }}
                                    </template>
                                    <template v-if="column.key === `TotalMPrice`">
                                        结算总额: {{ item.TotalMPrice }}
                                    </template>
                                    <template v-if="column.key === `UnSteeNum`">
                                        未结算藏品数: {{ item.UnSteeNum }}
                                    </template>
                                </template> -->
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === `UnSteeNum`">
                                        <div class="flex info">
                                            <span>{{ record.CreateTime }}</span>
                                            <div>{{ record.Status }}</div>
                                            <div
                                                class="details"
                                                @click="changeShowDetails(record.Sbn)"
                                                >查看详情</div
                                            >
                                        </div>
                                    </template>
                                </template>
                            </a-table>
                        </div>
                    </div>
                    <div class="table-wrap" v-else>
                        <a-table
                            :pagination="false"
                            :columns="gouWuTitleColumns"
                            :dataSource="gouWuDataSource"
                        ></a-table>
                    </div>
                </template>
            </show-modal>
            <CatePage :paginations="query" @fetchList="getGoodsList"></CatePage>
        </div>
    </div>
    <SettleMentDetails v-else></SettleMentDetails>
</template>

<style scoped lang="less">
.my-set-details {
    .flexs {
        .flex-row;
        justify-content: flex-start;
        background-color: #eef3f8;
        padding: 21px 16px;
        gap: 35px;
        margin-top: 20px;
    }
    :deep(.ant-table-thead) {
        display: none;
    }
    .active {
        :deep(.ant-table-tbody) {
            display: none;
        }
    }
    .card-box {
        min-height: 700px;
        background-color: #fff;
    }
    .flex {
        .flex-row;
        gap: 6px;
        img {
            height: 15px;
        }
    }
    .info {
        justify-content: space-between;
    }
    .table-list {
        .title {
            .flex-row;
            justify-content: space-between;
            font-weight: 400;
            padding: 28px 50px 24px;
            background-color: #eef3f8;

            span {
                text-align: center;
            }
        }

        .ant-table-wrapper {
            margin: 0 0 30px;
        }

        :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
            background-color: #eef3f8;
            font-weight: 400;
        }

        .details {
            border-width: 1px;
            border-color: rgb(183, 194, 206);
            border-style: solid;
            border-radius: 4px;
            background-color: rgb(255, 255, 255);
            width: 70px;
            height: 23px;
            font-size: 12px;
            line-height: 23px;
            font-family: 'MicrosoftYaHei';
            color: rgb(102, 115, 129);
            cursor: pointer;
            &:hover {
                color: #9a0000;
            }
        }
    }
}
</style>
