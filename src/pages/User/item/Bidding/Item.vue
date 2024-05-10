<script setup>
import ShippingInformation from '../AccountManagement/ShippingInformation.vue';
import Header from './Header.vue';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useUserInfo } from '@/store/store';
const jingMaiColumns = [
    {
        title: '订单编号',
        dataIndex: 'Bn',
        key: 'Bn',
        align: 'center',
        ellipsis: true
    },
    {
        title: '商品编号',
        dataIndex: 'Brand',
        key: 'Brand',
        align: 'center'
    },
    {
        title: '藏品名称',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center',
        ellipsis: true
    },
    {
        title: '交易类型',
        dataIndex: 'PingTai',
        key: 'PingTai',
        align: 'center',
        ellipsis: true
    },
    {
        title: '数量',
        dataIndex: 'MPrice',
        key: 'MPrice',
        align: 'center',
        ellipsis: true
    },
    {
        title: '成交价格',
        dataIndex: 'Ontime',
        key: 'Ontime',
        align: 'center',
        ellipsis: true
    },
    {
        title: '收藏证书',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        ellipsis: true
    }
];
const router = useRouter();
const route = useRoute();
const user = useUserInfo();
const props = defineProps({
    fetchData: {
        type: Array,
        default: []
    }
});
onMounted(() => {});
const list = [
    {
        id: '1',
        text: '顺丰特快 (到付)'
    },
    {
        id: '2',
        text: '顺丰特快 (到付)'
    },
    {
        id: '3',
        text: '顺丰特快 (到付)'
    }
];
const list1 = [
    {
        id: '1',
        text: '在线支付'
    },
    {
        id: '2',
        text: '柜台支付'
    },
    {
        id: '3',
        text: '在线汇款'
    }
];
//切换地址
const open = ref(false);
const changeOpen = () => {
    open.value = true;
};
//勾选框 优惠券
const checkedss = ref(false);
//下拉选择勾选框
const selectCheckes = ref('');
const emits = defineEmits(['changeShowPage']);
//选择的地址
const checked = ref(true);
const address = ref(null);
const addressList = ref([]);
//选择的配送方式
const checkedStatus = ref(false);

//我要保价
const baojia = ref(true);

//保价的价格
const iptValue = ref('');

const checkList = ref({
    DelList: []
});
//勾选框
const showCheck = (e) => {
    if (getChecked(e.Bn)) {
        checkList.value.DelList = checkList.value.DelList.filter((item) => item.Bn !== e.Bn);
    } else {
        let query = {
            Bn: e.Bn
        };
        checkList.value.DelList.push(query);
    }
};
function getChecked(Bn) {
    const item = checkList.value.DelList.find((item) => item.Bn === Bn);
    return item !== undefined;
}
//展示商品详情
const showGoodsDetails = (i) => {
    console.log(i);
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Gid
        }
    });
};
</script>

<template>
    <div class="address-wrap">
        <Header num="1"></Header>
        <div class="title-nav">
            <h5>收货信息</h5>
            <p @click="changeOpen">新增收货地址</p>
        </div>
        <!-- 地址 -->
        <div class="center">
            <div class="address-default">
                <div class="address">
                    <a-radio v-model:checked="checked"></a-radio>
                    <p>小鱼先生 中国北京西城区黄寺大街 1434u295295 (小鱼收)</p>
                </div>
                <div class="change">
                    <p>修改</p>
                    |
                    <p>删除</p>
                </div>
            </div>
            <div class="check-one">
                <a-select
                    ref="select"
                    placeholder="更多地址"
                    class="item"
                    v-model:value="address"
                    :options="addressList"
                    style="width: 140px"
                ></a-select>
                <img :src="getImageUrl('user/jingmai/icon8.svg')" alt="" />
            </div>
        </div>
        <!-- 配送方式 -->
        <div class="title-nav">
            <h5>配送方式</h5>
            <p>新增收货地址</p>
        </div>
        <div class="center">
            <div class="select">
                <a-radio v-model:checked="checkedStatus">
                    <span class="radio">暂存</span>
                </a-radio>
                <p
                    >选择暂存,商品将进入未发货状态中合并发货或<span>一键转存</span>;
                    暂存免60天仓储费,60天后正常收费,参照<span>仓储费收费标准</span>
                </p>
            </div>
            <div class="kuai-di">
                <div class="select">
                    <a-radio v-model:checked="checkedStatus"
                        ><span class="radio">物流发货</span></a-radio
                    >
                    <p>(藏品约3个工作日发货) </p>
                </div>
                <div class="list">
                    <div
                        class="item"
                        v-for="item in list"
                        :key="item.id"
                        :class="item.id == 1 ? 'active' : ''"
                    >
                        {{ item.text }}
                    </div>
                </div>
            </div>
            <div class="select">
                <a-radio v-model:checked="checkedStatus"
                    ><span class="radio">上门提货</span></a-radio
                >
            </div>
        </div>
        <!-- 支付方式 -->
        <div class="title-nav">
            <h5>
                支付方式
                <div>(商城商品只支持在线支付,完成支付后可申请上门自提)</div>
            </h5>
        </div>
        <div class="center">
            <div class="list">
                <div
                    class="item"
                    v-for="item in list1"
                    :key="item.id"
                    :class="item.id == 1 ? 'active' : ''"
                >
                    {{ item.text }}
                </div>
            </div>
        </div>
        <!-- 是否保价 -->
        <div class="title-nav">
            <h5>
                是否保价
                <div>(仅限物流发货)</div>
            </h5>
        </div>
        <div class="center price-list">
            <a-checkbox v-model:checked="baojia">我要保价</a-checkbox>
            <a-input
                style="width: 150px; background-color: #f3f3f3; height: 40px; border-radius: 10px"
                v-model:value="iptValue"
            />
            元
            <p>保价费:{{ iptValue }}元</p>
            <a-tooltip color="#9a0000">
                <template #title>
                    <div class="info-fuwu">
                        <p>服务费基础服务费{{ props.goodsDtails?.offerData?.Tips }}</p>
                        <p>服务费百分比{{ props.goodsDtails?.offerData?.TipsRate }}</p>
                        <p>服务费起征点{{ props.goodsDtails?.offerData?.TipsLevel }}</p>
                        <p>服务费提示信息{{ props.goodsDtails?.offerData?.TipsDes }}</p>
                    </div>
                </template>
                <img style="cursor: pointer" :src="getImageUrl('chengjiao/icon6.png')" alt="" />
            </a-tooltip>
        </div>
        <!-- 订单信息 -->
        <div class="title-nav">
            <h5>订单信息</h5>
            <p @click="emits('changeShowPage', 1)">返回修改</p>
        </div>
        <a-table :pagination="false" :columns="jingMaiColumns" :dataSource="props?.fetchData">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div class="goods-info" @click="showGoodsDetails(record)">
                        <img :src="record.CoverImg" alt="" />
                        <span>
                            {{ record.Title }}
                        </span>
                    </div>
                </template>
                <template v-if="column.key === 'Status'">
                    <a-checkbox
                        @change.stop="showCheck(record)"
                        style="margin-right: 15px"
                        :checked="getChecked(record.Bn)"
                    ></a-checkbox>
                </template>
                <template v-if="column.key === 'MPrice'">
                    <span class="active">￥{{ record.MPrice || record.MakePrice }}</span>
                </template>
            </template>
        </a-table>
        <div class="center">
            <div class="details">
                <div class="left">
                    <div class="top-title">
                        <a-checkbox v-model:checked="baojia"><h5>优惠券</h5></a-checkbox>
                        <a-dropdown placement="bottomLeft" :arrow="true">
                            <div class="top-title">
                                <p>您已选择1张优惠券 ￥-20.00元</p>
                            </div>
                            <template #overlay>
                                <div class="select-wrap">
                                    <div
                                        style="
                                            padding: 16px 26px;
                                            box-shadow:
                                                0 1px 2px -2px rgba(0, 0, 0, 0.16),
                                                0 3px 6px 0 rgba(0, 0, 0, 0.12),
                                                0 5px 12px 4px rgba(0, 0, 0, 0.09);
                                        "
                                        class="title"
                                        >共5张,可用5张,已选择1张</div
                                    >
                                    <div class="check-list">
                                        <div class="check-item" v-for="item in 8" :key="item">
                                            <a-checkbox v-model:checked="checked"
                                                >免费收藏证书券{{ item }}</a-checkbox
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <span>2件商品总额:</span>
                        <span>499.50</span>
                    </div>
                    <div class="item">
                        <span>运费:</span>
                        <span>0.00</span>
                    </div>
                    <div class="item">
                        <span>收藏证书:</span>
                        <span>20.00</span>
                    </div>
                    <div class="item">
                        <span>优惠券:</span>
                        <span>-0.00</span>
                    </div>
                    <div class="item">
                        <span>收藏证书优惠券:</span>
                        <span>-20.00</span>
                    </div>
                    <div class="zong">
                        应付总额:<p class="price">￥<span>499.50</span></p
                        >元
                    </div>
                    <a-button type="primary" @click="emits('changeShowPage', 3)">去付款</a-button>
                </div>
            </div>
        </div>
        <!-- 订单相关的 -->
        <a-drawer v-model:open="open" width="1000" class="custom-class" placement="right">
            <ShippingInformation></ShippingInformation>
        </a-drawer>
    </div>
</template>

<style scoped lang="less">
.address-wrap {
    padding: 20px 16px;
    background-color: #fff;
    .title-nav {
        .flex-row;
        justify-content: space-between;
        padding: 18px 50px;
        background-color: #eef3f8;
        h5 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 20px;
            div {
                font-weight: 400;
                font-size: 16px;
            }
        }
        p {
            color: #1677ff;
            padding-bottom: 1px;
            border-bottom: 1px solid #1677ff;
            cursor: pointer;
            &:hover {
                color: #b11503;
                border-color: #b11503;
            }
        }
    }
    .center {
        padding: 34px 50px 22px;
        .address-default {
            .flex-row;
            justify-content: space-between;
            .address {
                .flex-row;
                gap: 10px;
            }
            .change {
                .flex-row;
                gap: 5px;
                color: #1677ff;
                p {
                    padding-bottom: 1px;
                    border-bottom: 1px solid #1677ff;
                    cursor: pointer;
                }
            }
        }
        .select {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 30px;
            .radio {
                margin-left: 10px;
            }
            p {
                width: 70%;
                line-height: 24px;
                span {
                    color: #1677ff;
                    border-bottom: 1px solid #1677ff;
                    padding-bottom: 1px;
                    cursor: pointer;
                }
            }
        }
        .kuai-di {
            margin-bottom: 30px;
            .select {
                margin-bottom: 20px;
            }
        }
        .list {
            margin-left: 35px;
            .flex-row;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 100px;
            .item {
                width: 174px;
                text-align: center;
                padding: 15px 20px;
                background-color: #eef3f8;
                border: 1px solid transparent;
                cursor: pointer;
                &:hover,
                &.active {
                    border-color: #9a0000;
                }
            }
        }
        .ant-select {
            margin-top: 15px;
            text-align: center;
            font-size: 14px;
        }
        .check-one {
            width: 141px;
            position: relative;
            margin-left: 38px;
            img {
                position: absolute;
                top: 52%;
                right: 17%;
                width: 12px;
            }
        }
        :deep(.ant-select-selector) {
            .flex-row;
            border-radius: 10px;
            line-height: 45px;
            height: 45px;
            input {
                height: 33px;
            }
        }
        :deep(.ant-select-arrow) {
            display: none;
        }
        .details {
            .flex-row;
            align-items: flex-start;
            justify-content: space-between;
            .left {
                .top-title {
                    .flex-row;
                }
                .title {
                    padding: 10px 16px;
                    border: 1px solid #eef3f8;
                }
            }
            .right {
                .item {
                    .flex-row;
                    justify-content: space-between;
                    margin: 15px 0;
                }
                .zong {
                    .flex-row;
                    align-items: flex-end;
                    gap: 5px;
                    margin-top: 40px;
                    font-size: 20px;
                    line-height: 30px;
                    .price {
                        color: #9a0000;
                        span {
                            font-size: 30px;
                        }
                    }
                }
                .ant-btn {
                    margin-top: 30px;
                }
            }
        }
    }
    .price-list {
        .flex-row;
        justify-content: flex-start;
        gap: 10px;
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
            height: 40px;
        }
        span {
            flex: 1;
        }
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #fff;
        padding: 20px 16px;
        font-weight: 400;
    }
}
.check-list {
    background-color: #fff;
    padding-bottom: 10px;
    height: 180px;
    overflow: auto;
    /* 添加以下代码 */

    .check-item {
        padding: 8px 26px;
        background-color: #fff;
        cursor: pointer;
        &:hover {
            background-color: #eef3f8;
        }
    }
}
/* 修改滚动条的宽度和颜色 */
::-webkit-scrollbar {
    width: 6px; /* 设置滚动条宽度 */
    background-color: #fff; /* 设置滚动条背景色 */
}

/* 修改滚动条滑块的颜色 */
::-webkit-scrollbar-thumb {
    background-color: #999; /* 设置滚动条滑块颜色 */
}
</style>
