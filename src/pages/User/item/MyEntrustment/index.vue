<script setup>
import { ref, computed, reactive, onMounted, h, watchEffect } from 'vue';
import CatePage from '@/components/common/CatePage.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import {
    timeStartOptions,
    timeEndOptions,
    sellingPriceList,
    statusLists,
    JingMaiColumns,
    ShippingColumns
} from './data';
import { getUserCollectionListApi } from '@/request/api';
const props = defineProps({});
const tableList = ref([]);
const query = reactive({
    cid: '-1', //默认
    start: '-1', //时间范围
    end: '-1', //时间范围
    brand: '-1', //全部类型 竞买 一口价
    kw: '', //关键字
    status: '1', //active2
    pageSize: '10',
    pageIndex: '1'
});
const list = [
    {
        cate: '竞买'
    },
    {
        cate: '购物'
    }
];
const showModals = ref(null);
const columnsList = ref([]);
const params = ref({});
var a = 2;
var b = 5;
console.log(a === 2 || (1 && b == 3) || 4);
const getGoodsList = async () => {
    console.log(query);
    try {
        let res = await getUserCollectionListApi(query);
        tableList.value = res.Data;
        tableList.value.BidderType.unshift({
            Key: '-1',
            Value: '全部'
        });
        console.log(tableList.value.GoodsStatusList);
    } catch (error) {}
};
let res = [];
onMounted(() => {
    params.value = showModals.value?.params;
    getGoodsList();
});
watchEffect(() => {
    columnsList.value =
        params.value.titleCate == list[0].cate || params.value.titleCate == undefined
            ? JingMaiColumns
            : ShippingColumns;
});
const changeStatusCate = (item) => {
    query.status = item.Key;
    getGoodsList(query);
};
const state = reactive({
    selectedRowKeys: []
});
const handleChange = () => {
    console.log(query);
};
const statusText = (value) => {
    const statusMap = {
        0: '无状态',
        4: '待结算',
        5: '结算中',
        6: '已结算'
    };

    return statusMap[value] || undefined;
};
</script>

<template>
    <div class="my-entrustment">
        <div class="card-box">
            <div class="title"> 我的藏品 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <div class="status-cate">
                        <p
                            v-for="item in tableList.GoodsStatusList"
                            :key="item.Key"
                            @click="changeStatusCate(item)"
                            :class="item.Key == query.status ? 'active' : ''"
                        >
                            {{ item.Value }} ({{ item.Count }})
                        </p>
                    </div>
                </template>
                <template v-slot:active3>
                    <div class="search-cate" v-if="params.titleCate == list[0].cate">
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有分类"
                            :field-names="{ label: 'Value', value: 'Key' }"
                            v-model:value="query.cid"
                            :options="tableList.BidderType"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            class="item"
                            placeholder="全部委托时间"
                            style="width: 300px"
                            v-model:value="query.start"
                            :options="timeStartOptions"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            class="item"
                            placeholder="全部结标时间"
                            v-model:value="query.end"
                            :options="timeEndOptions"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            class="item"
                            placeholder="全部类型"
                            v-model:value="query.brand"
                            :options="sellingPriceList"
                            @change="handleChange"
                        ></a-select>
                        <a-input
                            name="shulai"
                            v-model:value="query.kw"
                            class="item-input"
                            placeholder="名称和藏品"
                        />
                        <a-button type="primary" @click="getGoodsList" :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                    <div class="search-cate" v-else>
                        <a-select
                            placeholder="全部属性"
                            v-model:value="query.status"
                            style="width: 220px"
                            :options="statusLists"
                            @change="handleChange"
                        ></a-select>
                        <a-input
                            v-model:value="query.kw"
                            style="width: 316px"
                            placeholder="名称/藏品/合同号"
                        />
                        <a-button @click="getGoodsList" :icon="h(SearchOutlined)">搜索</a-button>
                    </div>
                </template>
                <template v-slot:active4>
                    <div class="table-wrap">
                        <a-table
                            :pagination="false"
                            :columns="columnsList"
                            :dataSource="tableList.GoodsList"
                            :scroll="{ x: '1070px' }"
                            scrollToFirstRowOnChange="true"
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'Bn'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.Bn">{{
                                            record.Bn
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Title'">
                                    <div class="table-item-gooods-info">
                                        <img :src="record.CoverImg" alt="" />
                                        <span style="width: 100%" :title="record.Title">{{
                                            record.Title
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Cbn'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.Cbn">{{
                                            record.Cbn
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'EntrustTime'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.EntrustTime">{{
                                            record.EntrustTime
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'MakePrice'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.MakePrice">{{
                                            record.MakePrice
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'BasePrice'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.BasePrice">{{
                                            record.BasePrice
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'Starttime'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.Starttime">{{
                                            record.Starttime
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'ClosingTime'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.ClosingTime">{{
                                            record.ClosingTime
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'SettleStatus'">
                                    <div
                                        class="status"
                                        :class="record.SettleStatus == '5' ? 'active' : ''"
                                    >
                                        <span>{{ statusText(record.SettleStatus) }}</span>
                                        <span class="tiem">({{ '10574279' }})</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'SettleTime'">
                                    <div class="table-item-gooods-info">
                                        <span style="width: 100%" :title="record.SettleTime">{{
                                            record.SettleTime
                                        }}</span>
                                    </div>
                                </template>
                                <template v-if="column.key === 'jiesuanzhuangtai'">
                                    <div class="jiesuanzhuangtai">
                                        <span>{{ record.jiesuanzhuangtai.title }}</span>
                                        <span>({{ record.jiesuanzhuangtai.num }})</span>
                                    </div>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </template>
            </show-modal>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
.my-entrustment {
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #eef3f8;
    }
    :deep(.ant-select-selector) {
        padding: 0 20px;
    }
    .table-item-gooods-info {
        .flex-row;
        gap: 10px;

        img {
            max-width: 30px;
            max-height: 30px;
        }
    }

    .jiesuanzhuangtai {
        .flex-col;
    }

    .status {
        &.active {
            color: #9a0000;
        }
    }
}
</style>
