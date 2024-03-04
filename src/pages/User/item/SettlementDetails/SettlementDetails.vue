<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const titleTopList = [
    {
        cate: '结算单号',
        num: 1018163
    },
    {
        cate: '所属合同',
        num: 43495433
    },
    {
        cate: '结算时间',
        num: '2023-03-12'
    },
    {
        cate: '结算单状态',
        num: '已完成'
    }
];
const titleTopDatList = [
    {
        cate: '合计结算金额',
        num: '7, 117.20'
    },
    {
        cate: '合计人民币(大写)',
        num: '七千壹佰壹拾柒元貳角整'
    },
    {
        cate: '本单获取的积分',
        num: '144'
    }
];
const columns = [
    {
        title: '分配方式',
        key: 'cate',
        dataIndex: 'cate'
    },
    {
        title: '信息',
        key: 'information',
        dataIndex: 'information'
    },
    {
        title: '金额',
        key: 'amount',
        dataIndex: 'amount'
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status'
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark'
    }
];
const dataSource = [
    {
        cate: '银联',
        information: '',
        amount: '7,117.20',
        status: '已完成',
        remark: ''
    }
];
const detailsColumns = [
    {
        title: '藏品编号',
        key: 'goodsCode',
        dataIndex: 'goodsCode'
    },
    {
        title: '关联拍品编号',
        key: 'infoGoodsCode',
        dataIndex: 'infoGoodsCode'
    },
    {
        title: '名称',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: '结标价',
        key: 'jieBiaoJia',
        dataIndex: 'jieBiaoJia'
    },
    {
        title: '服务费(-)',
        key: 'fuWuFei',
        dataIndex: 'fuWuFei'
    },
    {
        title: '制作费(-)',
        key: 'zhiZuoFei',
        dataIndex: 'zhiZuoFei'
    },
    {
        title: '涌币抵扣节省(+)',
        key: 'yongBiJieSheng',
        dataIndex: 'yongBiJieSheng'
    },
    {
        title: '福利包抵扣节省(+)',
        key: 'fuLiBaoJieSheng',
        dataIndex: 'fuLiBaoJieSheng'
    },
    {
        title: '保险费(-)',
        key: 'baoXianFei',
        dataIndex: 'baoXianFei'
    },
    {
        title: '保管费(-)',
        key: 'baoGuanFei',
        dataIndex: 'baoGuanFei'
    },
    {
        title: '结余',
        key: 'jieYu',
        dataIndex: 'jieYu'
    }
];
const detailsDataSource = [
    {
        goodsCode: 38453450983,
        infoGoodsCode: 430953234,
        name: '纪特票新四套(部分票带边，色标)',
        jieBiaoJia: 170.0,
        fuWuFei: 3.49,
        zhiZuoFei: 12.0,
        yongBiJieSheng: 0.0,
        fuLiBaoJieSheng: 0.0,
        baoXianFei: 1.7,
        baoGuanFei: 0.0,
        jieYu: 152.9
    },
    {
        goodsCode: 38453450983,
        infoGoodsCode: 430953234,
        name: '纪特票新四套(部分票带边，色标)',
        jieBiaoJia: 170.0,
        fuWuFei: 3.49,
        zhiZuoFei: 12.0,
        yongBiJieSheng: 0.0,
        fuLiBaoJieSheng: 0.0,
        baoXianFei: 1.7,
        baoGuanFei: 0.0,
        jieYu: 152.9
    },
    {
        goodsCode: 38453450983,
        infoGoodsCode: 430953234,
        name: '纪特票新四套(部分票带边，色标)',
        jieBiaoJia: 170.0,
        fuWuFei: 3.49,
        zhiZuoFei: 12.0,
        yongBiJieSheng: 0.0,
        fuLiBaoJieSheng: 0.0,
        baoXianFei: 1.7,
        baoGuanFei: 0.0,
        jieYu: 152.9
    }
];
const detailsList = [
    {
        cate: '结标金额(+)',
        data: '7,560.00'
    },
    {
        cate: '服务费(-)',
        data: '151.20'
    },
    {
        cate: '保险费(-)',
        data: '75.6'
    },
    {
        cate: '保管费(-)',
        data: '0.00'
    },
    {
        cate: '制作费(-)',
        data: '216.00'
    },
    {
        cate: '其他费用(-)',
        data: '0.00'
    },
    {
        cate: '满币抵扣制作费(+)',
        data: '0.00',
        active: true
    },
    {
        cate: '福利包抵扣制作费(+)',
        data: '0.00',
        active: true
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
            <div class="title"> 结算款分配 </div>
            <a-table :pagination="false" :columns="columns" :dataSource="dataSource"></a-table>
        </div>
        <div class="show-item">
            <div class="title"> 藏品清单 </div>
            <a-table
                :pagination="false"
                :columns="detailsColumns"
                :dataSource="detailsDataSource"
            ></a-table>
            <div class="details">
                <div class="title-wrap">
                    <p
                        ><span>项数 :</span> <span>{{ 4 }}项</span></p
                    >
                    <p
                        ><span>结余小技 :</span> <span class="active">￥{{ '7, 117.20' }}</span></p
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
                        <span>{{ item.data }}</span>
                    </p>
                </div>
            </div>
            <div class="zong"> 结余小技 ￥ 7,117.20 </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.jiesuan-details {
    .table-top {
        .title-info {
            .flex-row;
            justify-content: flex-start;
            gap: 30px;
            padding: 15px 20px;
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
            padding: 0 20px;
            margin-bottom: 20px;
            font-size: 18px;
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
                        width: 200px;
                    }
                }
            }

            .active {
                color: #9a0000;
            }
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
