<script setup>
import { ref, computed, reactive, onMounted, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import {
    getHeTongDetailsApi,
    getJieSuanGaiKuo,
    getGoodsListApi,
    getGoodsCateApi
} from '@/request/user/api.js';
import {
    timeStartOptions,
    timeEndOptions,
    sellingPriceList,
    statusLists,
    JingMaiColumns1,
    JingMaiColumns2,
    JingMaiColumns3,
    JingMaiColumns4,
    JingMaiColumns5,
    JingMaiColumns6,
    JingMaiColumns,
    JingMaiColumns7,
    ShippingColumns
} from '../MyEntrustment/data';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const navList = ref([]);
const showModals = ref(null);
const tableList = ref([]);
const columnsList = ref([]);
const query = reactive({
    Cid: '-1', //默认
    StartDateRange: '-1', //时间范围
    EndDateRange: '-1', //时间范围
    Brand: '-1', //全部类型 竞买 一口价
    Kw: '', //关键字
    Status: '', //active2
    PageSize: '10',
    PageIndex: '1',
    total: 1,
    Cbn: route.query.Number
});
//获取所有的分类
const getNavCateList = async () => {
    try {
        let res = await getGoodsCateApi(route.query.Number);
        navList.value = res.Data;
        query.Status = navList.value[0].Key;
    } catch (error) {}
};
const getTableList = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;

    try {
        let newRes = await getGoodsListApi(query);
        tableList.value = newRes.Data;
        query.total = newRes.Total;
    } catch (error) {}
};
onMounted(() => {
    Promise.all([getHetongDetails(route.query.Number), getNavCateList()]).then(() => {
        getTableList();
    });
});
const tableLists = ref({});
const getHetongDetails = async (number) => {
    try {
        let res = await getHeTongDetailsApi(number);
        tableLists.value = res.Data;
    } catch (error) {}
};
watch(
    () => showModals.value?.params.statusCate,
    () => {
        if (!showModals.value?.params?.statusCate) {
            return;
        }
        query.Status = showModals.value?.params?.statusCate;
        getTableList(1, 10);
    },
    {
        deep: true
    }
);
watchEffect(() => {
    columnsList.value =
        //结算成交
        query.Status == 3 || query.Status == 6
            ? JingMaiColumns1
            : //预展
              query.Status == 1 || query.Status == 0
              ? JingMaiColumns2
              : //"竞买中"
                query.Status == 2
                ? JingMaiColumns3
                : //已退回
                  query.Status == 9
                  ? JingMaiColumns4
                  : //已下架
                    query.Status == 8
                    ? JingMaiColumns5
                    : //未成交
                      query.Status == 7
                      ? JingMaiColumns6
                      : //待结算结算中
                        query.Status == 4 || query.Status == 5
                        ? JingMaiColumns7
                        : JingMaiColumns;
});
const setColumns = ref([
    {
        title: '结算单号',
        key: 'Sbn',
        dataIndex: 'Sbn',
        align: 'center'
    },
    {
        title: '结算项数',
        key: 'SettNums',
        dataIndex: 'SettNums',
        align: 'center'
    },
    {
        title: '结算总额',
        key: 'TotalMPrice',
        dataIndex: 'TotalMPrice',
        align: 'center'
    },
    {
        title: '实得总额',
        key: 'Prices',
        dataIndex: 'Prices',
        align: 'center'
    },

    {
        title: '生成时间',
        key: 'CreateTime',
        dataIndex: 'CreateTime',
        width: 200,
        align: 'center'
    },
    {
        title: '状态',
        key: 'Status',
        dataIndex: 'Status',
        align: 'center'
    }
    // {
    //     title: '',
    //     key: 'details',
    //     dataIndex: 'details',
    //     align: 'center'
    // }
]);
const statusText = (value) => {
    const statusMap = {
        0: '无状态',
        4: '待结算',
        5: '结算中',
        6: '已结算'
    };

    return statusMap[value] || undefined;
};
const statusTexts = (value) => {
    const statusMap = {
        0: '待预展',
        1: '预展中',
        2: '竞买中',
        3: '已成交',
        7: '未成交',
        8: '已下架',
        9: '已退回'
    };

    return statusMap[value] || undefined;
};
const gaiKuoList = ref({});
const isShowModal = ref(false);
const getGaiKuo = async () => {
    let res = await getJieSuanGaiKuo(tableLists.value.Number);
    gaiKuoList.value = res.Data;
};
const showModalPage = (open) => {
    isShowModal.value = open;
    getGaiKuo();
};
const showGoodsDetails = (i) => {
    console.log(i);
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Id
        }
    });
};
</script>

<template>
    <div class="hetong-details">
        <div class="card-box infos">
            <div class="news">
                <div class="title">
                    <p>合同编号： {{ tableLists.Number }}</p>
                    <p>登记日期：{{ tableLists.AcceptTime }}</p>
                </div>
                <div class="show-jie-suan" @click="showModalPage(true)"> 查看结算概括 </div>
            </div>
            <div class="liucheng-list">
                <div
                    class="liucheng-item"
                    v-for="(item, index) in tableLists.JinDuList"
                    :key="index"
                >
                    <div class="card-info" :class="tableLists.IsNow == item.Id ? 'active' : ''">
                        <p>{{ item.Title }}</p>
                        <p>{{ item.Time }}</p>
                    </div>
                    <img class="nav" :src="getImageUrl('user/logistics/nav.png')" alt="" />
                </div>
            </div>
        </div>
        <div class="card-box">
            <show-modal ref="showModals" :statusList="navList">
                <template v-slot:active4>
                    <div class="table-wrap">
                        <a-table
                            :pagination="false"
                            :columns="columnsList"
                            :dataSource="tableList"
                            :scroll="{ x: '1070px' }"
                            scrollToFirstRowOnChange="true"
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
                                <template v-if="column.key === 'SettleStatus'">
                                    <div
                                        class="status"
                                        :class="record.SettleStatus == '5' ? 'active' : ''"
                                    >
                                        <span>{{ statusText(record.SettleStatus) }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Status'">
                                    <div class="status">
                                        <span>{{ statusTexts(record.Status) }}</span>
                                    </div>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </template>
            </show-modal>
            <CatePage :paginations="query" @fetchList="getTableList()"></CatePage>
        </div>
        <a-modal
            :footer="null"
            v-model:open="isShowModal"
            style="width: 1130px; top: 25%"
            @ok="showModalPage(false)"
            class="xin"
        >
            <div class="title">结算概况</div>
            <div class="flex">
                <div> 单据数： {{ gaiKuoList.SNums }} </div>
                <div> 结算项数: {{ gaiKuoList.SettNums }}项</div>
                <div> 结算总额: {{ gaiKuoList.TotalMPrice }}元</div>
                <div> 实得总额: {{ gaiKuoList.Prices }}元</div>
                <div> 未结算: {{ gaiKuoList.UnSteeNum }}项</div>
            </div>
            <a-table
                :pagination="false"
                :columns="setColumns"
                :dataSource="gaiKuoList.SettleMentList"
            >
            </a-table>
        </a-modal>
    </div>
</template>

<style scoped lang="less">
.hetong-details {
    .infos {
        margin-bottom: 30px;
        .title {
            .flex-row;
            gap: 30px;
            font-size: 20px;
            justify-content: flex-start;
            font-weight: 500;
            color: #9a0000;
            border: none;
        }
    }
    .news {
        width: 100%;
        border-bottom: 1px solid #ebebeb;
        .flex-row;
        justify-content: space-between;
        .show-jie-suan {
            color: #3a84e6;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .goods-info,
    .goods-infos {
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

    .goods-infos {
        color: #3a84e6;
        text-decoration: underline;
    }

    .liucheng-list {
        .flex-row;
        padding: 20px 0;
        gap: 10px;

        .liucheng-item {
            flex: 1;
            .flex-row;
            gap: 10px;

            &:last-child {
                .nav {
                    display: none;
                }
            }
            .card-info {
                flex: 1;
                .flex-col;
                height: 68px;
                gap: 10px;
                padding: 15px 0;
                background-color: #eef3f8;
                border-radius: 8px;
                font-size: 14px;

                p {
                    height: 14px;
                }
            }
            .active {
                background-color: #9a0000;
                color: #fff;
            }
        }
    }
}
.title {
    font-size: 18px;
    font-family: 'Adobe Heiti Std';
    color: rgb(82, 82, 82);
    margin-left: 16px;
}
.flex {
    .flex-row;
    gap: 20px;
    justify-content: flex-start;
    margin-top: 20px;
    margin-left: 16px;
    margin-bottom: 22px;
    font-size: 16px;
    font-family: 'Adobe Heiti Std';
    color: rgb(85, 82, 82);
}
</style>
