<script setup>
import { ref, computed, reactive, onMounted, h, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import CatePage from '@/components/common/CatePage.vue';
import { yifahuoapi, yifahuoDetailsapi, cangChuFeiApi } from '@/request/user/api';
import { timeOptions, cateOptions, seeOptions } from './data';
import ShippedDetails from './ShippedDetails.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tableList = ref([]);
const details = ref({});
const query = reactive({
    PageIndex: '',
    PageSize: '',
    Bot: '',
    AuctionType: '0',
    DateRange: '0',
    total: 1
});
const loading = ref(false);

const getTableList = async (PageIndex = 1, PageSize = 10) => {
    loading.value = true;
    query.PageIndex = PageIndex;
    query.PageSize = PageSize;
    let res;

    try {
        if (route.query.price) {
            res = await cangChuFeiApi(query);
        } else {
            res = await yifahuoapi(query);
        }
        loading.value = false;
        tableList.value = res.Data;
        query.total = res.Total;
    } catch (error) {}
};

onMounted(() => {});
const showModals = ref();
const params = ref({});
watch(
    () => showModals.value?.params?.titleCate,
    () => {
        if (showModals.value?.params?.titleCate == '已发货') {
            router
                .replace({
                    query: {}
                })
                .finally(() => {
                    getTableList();
                });
        } else if (showModals.value?.params?.titleCate == '仓储费') {
            router
                .replace({
                    query: { price: 3333 }
                })
                .finally(() => {
                    getTableList();
                });
        }
        tableList.value.length = 0;
        params.value.titleCate = showModals.value?.params?.titleCate;
    }
);
const list = [
    {
        cate: '已发货'
    },
    {
        cate: '仓储费'
    }
];
const columns = [
    {
        title: '藏品编号',
        dataIndex: 'Bn',
        ellipsis: true,
        width: 180,
        key: 'Bn',
        align: 'center'
    },
    {
        title: '藏品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center'
    },
    {
        title: '类型',
        dataIndex: 'AuctionType',
        ellipsis: true,
        key: 'AuctionType',
        align: 'center'
    },
    {
        title: '数量',
        dataIndex: 'Nums',
        ellipsis: true,
        key: 'Nums',
        align: 'center'
    },
    {
        title: '商家',
        dataIndex: 'PingTai',
        key: 'PingTai',
        ellipsis: true,
        align: 'center'
    },
    {
        title: '金额/竞买积分',
        dataIndex: 'MakePrice',
        key: 'MakePrice',
        ellipsis: true,
        align: 'center'
    },
    {
        title: '发货单号',
        dataIndex: 'DeliverNo',
        ellipsis: true,
        align: 'DeliverNo',
        key: 'price'
    },
    {
        title: '剩余收货时间',
        ellipsis: true,
        dataIndex: '',
        align: '',
        key: ''
    },
    {
        title: '操作',
        dataIndex: 'caozuo',
        ellipsis: true,
        align: 'center',
        key: 'caozuo'
    }
];
const cangChuColumns = [
    {
        title: '藏品编号',
        key: 'Bn',
        dataIndex: 'Bn',
        align: 'center'
    },
    {
        title: '藏品名称',
        key: 'Title',
        dataIndex: 'Title',
        align: 'center'
    },
    {
        title: '结标时间',
        key: 'Ontime',
        dataIndex: 'Ontime',
        align: 'center'
    },
    {
        title: '收费仓储期',
        key: 'Days',
        dataIndex: 'Days',
        align: 'center'
    },
    {
        title: '仓储费率',
        key: 'fee',
        dataIndex: 'fee',
        align: 'center'
    },
    {
        title: '已收仓储费',
        key: 'FeeReceived',
        dataIndex: 'FeeReceived',
        align: 'center'
    },
    {
        title: '待收仓储费',
        key: 'FeePending',
        dataIndex: 'FeePending',
        align: 'center'
    },
    {
        title: '仓储费总额',
        key: 'FeeTotal',
        dataIndex: 'FeeTotal',
        align: 'center'
    }
];
const value = ref('');
const value1 = '0';
//展示谁
const changeShowDeatails = (Number) => {
    router.push({
        path: route.path,
        query: {
            Number
        }
    });
};

const showGoodsDetails = (i) => {
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Gid
        }
    });
};
</script>
<template>
    <div class="my-bidding">
        <ShippedDetails v-if="route.query.Number"></ShippedDetails>
        <div class="card-box" v-else>
            <div class="title"> 已发货 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate" v-show="!route.query.price">
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            v-model:value="query.DateRange"
                            class="item"
                            :options="timeOptions"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            v-model:value="query.AuctionType"
                            class="item"
                            :options="cateOptions"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="请选择查看方式"
                            v-model:value="value1"
                            class="item"
                            :options="seeOptions"
                        ></a-select>
                        <a-input
                            v-model:value="query.Bot"
                            class="item-input"
                            @keydown.enter="getTableList()"
                            placeholder="名称和藏品"
                        />
                        <a-button
                            :loading="loading"
                            @click="getTableList()"
                            :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                    <!-- <div class="search-cate" v-show="route.query.price">
                        <a-input
                            v-model:value="value"
                            style="width: 330px"
                            placeholder="名称和藏品"
                        />
                        <a-button
                            :loading="loading"
                            @click="getTableList()"
                            :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div> -->
                </template>
                <template v-slot:active3>
                    <a-table
                        :pagination="false"
                        :columns="params?.titleCate == list[0].cate ? columns : cangChuColumns"
                        :data-source="tableList"
                    >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'Title'">
                                <div class="goods-info" @click="showGoodsDetails(record)">
                                    <img :src="record.CoverImg" alt="" />
                                    <a-tooltip>
                                        <template #title> {{ record.Title }} </template>
                                        <span>
                                            {{ record.Title }}
                                        </span>
                                    </a-tooltip>
                                </div>
                            </template>

                            <template v-if="column.key === 'AuctionType'">
                                {{
                                    record.AuctionType == 1
                                        ? '竞买'
                                        : record.AuctionType == 2
                                          ? '商城'
                                          : record.AuctionType == 1
                                            ? '积分兑换'
                                            : record.AuctionType == 4
                                              ? '委托退回'
                                              : '全部'
                                }}
                            </template>
                            <template v-if="column.key === 'Days'"> {{ record.fee }}/天 </template>
                            <template v-if="column.key === 'fee'"> {{ record.fee }}/天 </template>
                            <template v-if="column.key === 'caozuo'">
                                <div class="btns" @click="changeShowDeatails(record.DeliverNo)">
                                    查看详情
                                </div>
                            </template>
                        </template>
                    </a-table>
                    <div class="leng-details">
                        <span></span>
                        <span>总计： {{ query.total }}项</span>
                    </div>
                </template>
            </show-modal>
            <CatePage @fetch-list="getTableList" :paginations="query"></CatePage>
        </div>
    </div>
</template>
<style scoped lang="less">
.my-bidding {
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
            &:placeholder-shown {
            }
        }
    }
    .ant-btn-default {
        background-color: #85909b;
    }
    .goods-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        gap: 3px;
        width: 100%;
        &:hover {
            color: #9a0000;
            cursor: pointer;
        }
        img {
            max-height: 40px;
            max-width: 40px;
        }
        span {
            flex: 1;
            width: 117px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .btns {
        color: #7dadef;
        cursor: pointer;
    }

    .leng-details {
        .flex-row;
        justify-content: space-between;
        padding: 20px;
    }
}
</style>
