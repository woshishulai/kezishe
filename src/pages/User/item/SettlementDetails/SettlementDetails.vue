<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getJieSuanXiangQing } from '@/request/user/api';

const router = useRouter();
const route = useRoute();
const tableListInfo = ref({});
const props = defineProps({});
const titleTopList = ref([
    {
        cate: '结算单号',
        num: ''
    },
    {
        cate: '所属合同',
        num: ''
    },
    {
        cate: '结算时间',
        num: ''
    },
    {
        cate: '结算单状态',
        num: ''
    }
]);
const titleTopDatList = ref([
    {
        cate: '合计结算金额',
        num: ''
    },
    {
        cate: '合计人民币(大写)',
        num: ''
    },
    {
        cate: '本单获取的积分',
        num: ''
    }
]);
const dataSource = ref([
    {
        PayType: '',
        PayInfo: '',
        Prices: '',
        Status: '',
        Remarks: ''
    }
]);
const detailsList = ref([
    {
        cate: '结标金额(+)',
        data: ''
    },
    {
        cate: '服务费(-)',
        data: ''
    },
    {
        cate: '保险费(-)',
        data: ''
    },
    {
        cate: '保管费(-)',
        data: ''
    },
    {
        cate: '制作费(-)',
        data: ''
    },
    {
        cate: '其他费用(-)',
        data: ''
    }
]);
const getDetails = async () => {
    let res = await getJieSuanXiangQing(route.query.Number);
    tableListInfo.value = res.Data;
    titleTopList.value[0].num = tableListInfo.value.Sbn;
    titleTopList.value[1].num = tableListInfo.value.Cbn;
    titleTopList.value[2].num = tableListInfo.value.SettleTime;
    titleTopList.value[3].num = tableListInfo.value.Status;
    titleTopDatList.value[0].num = tableListInfo.value.Prices;
    titleTopDatList.value[1].num = tableListInfo.value.CnPrices;
    titleTopDatList.value[2].num = tableListInfo.value.Points;
    dataSource.value[0].PayType = tableListInfo.value.PayType;
    dataSource.value[0].PayInfo = tableListInfo.value.PayInfo;
    dataSource.value[0].Prices = tableListInfo.value.Prices;
    dataSource.value[0].Status = tableListInfo.value.Status;
    dataSource.value[0].Remarks = tableListInfo.value.Remarks;
    detailsList.value[0].data = tableListInfo.value.TotalMPrice;
    detailsList.value[1].data = tableListInfo.value.FwPrices;
    detailsList.value[2].data = tableListInfo.value.BxPrices;
    detailsList.value[3].data = tableListInfo.value.BgPrices;
    detailsList.value[4].data = tableListInfo.value.ZzPrices;
    detailsList.value[5].data = tableListInfo.value.QtPrices;
};
onMounted(() => {
    getDetails();
});

const columns = [
    {
        title: '分配方式',
        key: 'PayType',
        dataIndex: 'PayType'
    },
    {
        title: '信息',
        key: 'PayInfo',
        dataIndex: 'PayInfo'
    },
    {
        title: '金额',
        key: 'Prices',
        dataIndex: 'Prices'
    },
    {
        title: '状态',
        key: 'Status',
        dataIndex: 'Status'
    },
    {
        title: '备注',
        key: 'Remarks',
        dataIndex: 'Remarks'
    }
];

const detailsColumns = [
    {
        title: '藏品编号',
        key: 'Bn',
        dataIndex: 'Bn',
        width: 150
    },
    {
        title: '名称',
        key: 'Title',
        dataIndex: 'Title',
        width: 150,
        ellipsis: true
    },
    {
        title: '结标价',
        key: 'MPrice',
        dataIndex: 'MPrice'
    },
    {
        title: '服务费(-)',
        key: 'FwPrices',
        dataIndex: 'FwPrices'
    },
    {
        title: '制作费(-)',
        key: 'ZzPrices',
        dataIndex: 'ZzPrices'
    },
    {
        title: '保险费(-)',
        key: 'BxPrices',
        dataIndex: 'BxPrices'
    },
    {
        title: '保管费(-)',
        key: 'BgPrices',
        dataIndex: 'BgPrices'
    },
    {
        title: '结余',
        key: 'Prices',
        dataIndex: 'Prices'
    }
];
</script>

<template>
    <div class="jiesuan-details">
        <div class="card-box">
            <div class="title"> 结算明细 </div>
            <div class="table-top">
                <div class="title-info">
                    <p v-for="item in titleTopList" :key="item.cate">
                        <span>{{ item.cate }}</span>
                        :
                        <span class="active">{{ item.num }}</span>
                    </p>
                </div>
                <div class="data-info title-info">
                    <p v-for="item in titleTopDatList" :key="item.cate">
                        <span>{{ item.cate }}</span>
                        :
                        <span>{{ item.num }}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="show-item">
            <div class="title xiao"> 结算款分配 </div>
            <a-table :pagination="false" :columns="columns" :dataSource="dataSource"> </a-table>
        </div>
        <div class="show-item">
            <div class="title xiao"> 藏品清单 </div>
            <a-table
                :pagination="false"
                :columns="detailsColumns"
                :dataSource="tableListInfo.SettlementRecordDatas"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Title'">
                        <div class="goods-info">
                            <a-tooltip>
                                <template #title> {{ record.Title }} </template>
                                <span>
                                    {{ record.Title }}
                                </span>
                            </a-tooltip>
                        </div>
                    </template>
                </template>
            </a-table>
            <div class="details">
                <div class="title-wrap">
                    <p
                        ><span>项数 : </span>
                        <span>{{ tableListInfo?.SettlementRecordDatas?.length }}项</span></p
                    >
                    <p
                        ><span>结余小计 : </span>
                        <span class="active"> ￥ {{ titleTopDatList[0].num }}</span></p
                    >
                </div>
                <div class="data-wrap">
                    <p
                        class="data-item"
                        v-for="item in detailsList"
                        :key="item.cate"
                        :class="item.active ? 'active' : ''"
                    >
                        <span>{{ item.cate }}</span>
                        <span> ￥ {{ item.data }}</span>
                    </p>
                </div>
            </div>
            <div class="zong"> 结余小计 ￥ {{ titleTopDatList[0].num }} </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.jiesuan-details {
    font-size: 14px;
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        padding: 16px 15px;
        background-color: #eef3f8;
    }
    :deep(.ant-table-wrapper .ant-table-tbody > tr > td, ) {
        padding: 16px 22px;
    }
    .goods-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            flex: 1;
            width: 117px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .table-top {
        .title-info {
            .flex-row;
            justify-content: flex-start;
            gap: 30px;
            padding: 20px;
            background-color: #eef3f8;

            .active {
                color: #9a0000;
            }
        }

        .data-info {
            padding: 30px 20px;
            background-color: #fff;
        }
    }

    .show-item {
        margin: 30px 0;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;

        .title {
            padding: 0 32px;
            margin-bottom: 20px;
            font-size: 16px;
            color: #333;
        }

        .details {
            padding: 20px;

            .title-wrap {
                .flex-row;
                justify-content: flex-start;
                gap: 30px;
            }

            .data-wrap {
                .flex-col;
                gap: 20px;
                align-items: flex-start;
                margin-top: 30px;

                .data-item {
                    .flex-row;

                    span {
                        width: 213px;
                    }
                }
            }

            .active {
                color: #9a0000;
            }
        }
        .xiao {
            font-size: 16px;
        }
        .zong {
            color: #9a0000;
            padding: 20px;
            background-color: #eef3f8;
            font-size: 18px;
            font-weight: 600;
        }
    }
}
</style>
