<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getNotShippedList } from '@/request/user/api';
import ShowModal from '@/components/common/user/ShowModal.vue';
import { info } from '@/hooks/antd/message';
import { timeOptions, cateOptions, seeOptions } from './data';

const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tableList = ref([]);
const query = reactive({
    PageIndex: '',
    PageSize: '',
    Bot: '',
    AuctionType: '0',
    DateRange: '0',
    total: 1
});
const showGoodsDetails = (i) => {
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Gid
        }
    });
};
const getTableList = async (PageIndex = 1, PageSize = 10) => {
    query.PageIndex = PageIndex;
    query.PageSize = PageSize;
    try {
        let res = await getNotShippedList(query);
        console.log(res);
        tableList.value = res.Data;
        query.total = res.Total;
    } catch (error) {}
};
const checkList = ref({
    DelList: []
});
//勾选框
const showCheck = (e) => {
    if (getChecked(e.Bn)) {
        checkList.value.DelList = checkList.value.DelList.filter((item) => item.Bn !== e.Bn);
    } else {
        checkList.value.DelList.push(e);
    }
    console.log(checkList.value.DelList);
};
function getChecked(Bn) {
    const item = checkList.value.DelList.find((item) => item.Bn === Bn);
    return item !== undefined;
}
const fahuo = () => {
    if (checkList.value.DelList.length < 1) {
        info('warning', '请先选择要发货的订单吧');
        return;
    }
    localStorage.setItem('checkedStatus', 0);
    localStorage.setItem('kuaidis', 0);
    localStorage.setItem('zhifus', 0);
    localStorage.setItem('baojias', true);
    localStorage.setItem('iptValues', '');
    localStorage.setItem('quanLists', '');
    localStorage.setItem('DelLists', []);
    localStorage.removeItem('allPrice');
    localStorage.removeItem('orderId');
    localStorage.setItem('showPaegs', 2);
    const goodsList = JSON.stringify(checkList.value.DelList);
    localStorage.setItem('goodsList', goodsList);
    router.push({
        path: '/user/my-bidding',
        query: {
            wuliu: true
        }
    });
};
const removeCheckList = () => {
    checkList.value.DelList = [];
};
onMounted(() => {
    getTableList();
});
const columns = [
    {
        width: 50,
        title: '',
        dataIndex: 'check',
        key: 'check',
        align: 'center'
    },
    {
        title: '藏品编号',
        dataIndex: 'Bn',
        ellipsis: true,
        width: 150,
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
        title: '成交日期',
        dataIndex: 'Ontime',
        ellipsis: true,
        key: 'Ontime',
        width: 200,
        align: 'center'
    },
    {
        title: '成交价/价格',
        dataIndex: 'MakePrice',
        key: 'MakePrice',
        ellipsis: true,
        align: 'center'
    },
    {
        title: '仓储期',
        dataIndex: 'CountdownTime',
        key: 'CountdownTime',
        ellipsis: true,
        width: 150,
        align: 'center'
    },
    {
        title: '仓储费',
        dataIndex: 'ExceedStorageFee',
        ellipsis: true,
        align: 'DeliverNo',
        key: 'ExceedStorageFee'
    },
    {
        title: '是否收藏',
        dataIndex: 'IsCret',
        ellipsis: true,
        align: 'center',
        key: 'IsCret'
    }
];
const data = reactive([]);
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        code: '63932729',
        name: '清朝瓷器',
        cate: '竞买',
        chengjiao: '3,960.00元',
        cangchuqi: '剩余114天(免费)',
        laoban: '壳子社',
        time: '2023.10.02',
        price: '1.00',
        zhaopian: 'register/logo.png',
        caozuo: '无'
    });
}
const state = reactive({
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false
});
const loading = ref(false);
const value = ref('');
const value1 = ref('0');
</script>

<template>
    <div class="my-logistics">
        <div class="card-box">
            <div class="title">未发货</div>
            <show-modal>
                <template v-slot:active1>
                    <div class="search-cate">
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
                </template>
                <template v-slot:active3>
                    <a-table :pagination="false" :columns="columns" :dataSource="tableList">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'check'">
                                <div class="title-item">
                                    <a-checkbox
                                        @change.stop="showCheck(record)"
                                        style="margin-right: 15px"
                                        :checked="getChecked(record.Bn)"
                                    ></a-checkbox>
                                </div>
                            </template>

                            <template v-if="column.key === 'Brand'">
                                {{ record.Brand == 1 ? '竞买' : record.Brand == 2 ? '一口价' : '' }}
                            </template>
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
                            <template v-if="column.key === 'IsCret'">
                                {{ record.IsCret == 1 ? '包含' : '' }}
                            </template>
                        </template>
                    </a-table>
                    <div class="add-array">
                        <div>
                            <span>
                                <template>
                                    {{
                                        `总计 ${data.length} 项 已选 ${state.selectedRowKeys.length} 项`
                                    }}
                                </template>
                            </span>
                        </div>
                        <span>
                            <template>
                                {{
                                    `未发货总数 ${data.length} 项 已选 ${state.selectedRowKeys.length} 项`
                                }}
                            </template>
                        </span>
                    </div>
                    <div class="add-array">
                        <a-button type="primary" :loading="state.loading" @click="removeCheckList">
                            撤销所有已选
                        </a-button>
                        <a-button type="primary" :loading="state.loading" @click="fahuo">
                            已选发货
                        </a-button>
                        <a-button type="primary" :loading="state.loading"> 一键转卖 </a-button>
                    </div>
                    <p class="label"
                        >藏品暂不开放支付后退货退款流程。如有退货，请收货后联系客服021-23099900</p
                    >
                    <p class="label"
                        >收藏证书不可委托，包含收藏证书的藏品一键转卖后，证书费用将退还您的账户的余额中</p
                    >
                </template>
            </show-modal>
            <CatePage @fetch-list="getTableList" :paginations="query"></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
.my-logistics {
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
    .card-box {
        padding-bottom: 30px;

        .table-item-gooods-info {
            .flex-row;
            gap: 10px;

            img {
                width: 50px;
            }
        }

        .add-array {
            padding: 20px 40px 0 0;
            .flex-row;
            gap: 30px;
            justify-content: flex-start;
        }

        .label {
            font-weight: 500;
            margin: 20px 0 0;
            color: #9a0000;
        }
    }
}
</style>
