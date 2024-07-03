<script setup>
import { ref, computed, reactive, onMounted, h, watch, watchEffect } from 'vue';
import CatePage from '@/components/common/CatePage.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
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
} from './data';
import { getGoodsCateApi, getSelectCateApi, getGoodsListApi } from '@/request/user/api.js';
import { info } from '@/hooks/antd/message';
import { useRouter } from 'vue-router';
const loading = ref(false);
const router = useRouter();
const props = defineProps({});
const tableList = ref([]);
const navList = ref([]);
const selectList = ref([]);
const showModals = ref(null);
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
    Cbn: '0'
});
const list = [
    {
        cate: '竞买'
    },
    {
        cate: '购物'
    }
];
//获取所有的分类
const getNavCateList = async () => {
    try {
        let res = await getGoodsCateApi(0);
        navList.value = res.Data;
        query.Status = navList.value[0].Key;
    } catch (error) {}
};
//获取所有的分类
const getSelectCate = async () => {
    try {
        let res = await getSelectCateApi();
        selectList.value = res.Data;
        selectList.value.unshift({
            Key: '-1',
            Value: '全部'
        });
    } catch (error) {}
};
const getTableList = async (page = 1, pageSize = 10) => {
    loading.value = true;
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let newRes = await getGoodsListApi(query);
        tableList.value.length = 0;
        tableList.value = newRes.Data;
        query.total = newRes.Total;
    } catch (error) {}
    loading.value = false;
};
onMounted(() => {
    Promise.all([getNavCateList(), getSelectCate()]).then(() => {});
});
const showGoodsDetails = (i) => {
    console.log(i);
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Id
        }
    });
};
const columnsList = ref([]);
watch(
    () => showModals.value?.params,
    () => {
        if (!showModals.value?.params?.titleCate) {
            return;
        }
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
</script>

<template>
    <div class="my-entrustment">
        <div class="card-box">
            <div class="title"> 我的藏品 </div>
            <show-modal ref="showModals" :titleList="list" :statusList="navList">
                <template v-slot:active3>
                    <div class="search-cate" v-show="showModals?.params?.titleCate == list[0].cate">
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有分类"
                            :field-names="{ label: 'Value', value: 'Key' }"
                            v-model:value="query.Cid"
                            :options="selectList"
                        ></a-select>
                        <a-select
                            class="item"
                            placeholder="全部委托时间"
                            style="width: 300px"
                            v-model:value="query.StartDateRange"
                            :options="timeStartOptions"
                        ></a-select>
                        <a-select
                            class="item"
                            placeholder="全部结标时间"
                            v-model:value="query.EndDateRange"
                            :options="timeEndOptions"
                        ></a-select>
                        <a-select
                            class="item"
                            placeholder="全部类型"
                            v-model:value="query.Brand"
                            :options="sellingPriceList"
                        ></a-select>
                        <a-input
                            name="shulai"
                            v-model:value="query.Kw"
                            @keydown.enter="getTableList(1, 10)"
                            class="item-input"
                            placeholder="名称和藏品"
                        />
                        <a-button
                            @click="getTableList(1, 10)"
                            :loading="loading"
                            :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                    <div class="search-cate" v-show="showModals?.params?.titleCate == list[1].cate">
                        <a-select
                            placeholder="全部属性"
                            v-model:value="query.status"
                            style="width: 220px"
                            :options="statusLists"
                        ></a-select>
                        <a-input
                            v-model:value="query.Kw"
                            style="width: 316px"
                            placeholder="名称/藏品/合同号"
                        />
                        <a-button :icon="h(SearchOutlined)" :loading="loading || false"
                            >搜索</a-button
                        >
                    </div>
                </template>
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
                                <template v-if="column.key === 'Cbn'">
                                    <div
                                        class="goods-infos"
                                        @click="
                                            router.push({
                                                path: '/user/my-entrustment/my-contract',
                                                query: {
                                                    Number: record.Cbn
                                                }
                                            })
                                        "
                                    >
                                        <span> {{ record.Cbn }}</span>
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
            &:placeholder-shown {
            }
        }
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #eef3f8;
    }
    :deep(.ant-select-selector) {
        padding: 0 20px;
    }
    .goods-info,
    .goods-infos {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 10px;
        width: 100%;
        cursor: pointer;

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
    .jiesuanzhuangtai {
        .flex-col;
    }

    .status {
        &.active {
            color: #a11111;
        }
    }
}
</style>
