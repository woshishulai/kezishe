<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { shouhuoapi } from '@/request/user/api';
import { yifahuoDetailsapi } from '@/request/user/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps(['details']);
const details = ref();
onMounted(() => {});
const getDetails = async (id) => {
    if (!id) {
        return;
    }
    let params = {
        DeliverNo: id
    };
    try {
        let res = await yifahuoDetailsapi(params);
        details.value = res.Data;
    } catch (error) {}
};
watchEffect(() => {
    getDetails(route.query.Number);
});
const liucheng = [
    {
        img: 'user/logistics/list1.png'
    },
    {
        img: 'user/logistics/list2.png'
    },
    {
        img: 'user/logistics/list3.png'
    },
    {
        img: 'user/logistics/list4.png'
    }
];
const allPrice = computed(() => {
    if (details.value?.GoodsList?.length < 1) return 0;
    return details.value?.GoodsList?.reduce((acc, item) => acc + item.MakePrice, 0);
});

const columns = [
    {
        title: '商品编号',
        key: 'Bn',
        dataIndex: 'Bn',
        align: 'center',
        width: 180
    },
    {
        title: '藏品名称',
        key: 'Title',
        ellipsis: true,
        width: 250,
        dataIndex: 'Title',
        align: 'center'
    },
    {
        title: '类型',
        key: 'AuctionType',
        dataIndex: 'AuctionType',
        align: 'center'
    },
    {
        title: '成交价/积分',
        key: 'MakePrice',
        dataIndex: 'MakePrice',
        align: 'center'
    },
    {
        title: '数量',
        key: 'Nums',
        dataIndex: 'Nums',
        align: 'center'
    },
    {
        title: '包含收藏证书',
        key: 'IsCret',
        dataIndex: 'IsCret',
        align: 'center'
    },
    {
        title: '时间',
        key: 'time',
        dataIndex: 'time',
        align: 'center'
    }
];
const showGoodsDetails = (i) => {
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Gid
        }
    });
};
const shouHuo = async () => {
    let query = {
        DeliverNo: ''
    };
    try {
        let res = await shouhuoapi(query);
    } catch (error) {
        info('error', '确认收货发生错误');
    }
};
</script>

<template>
    <div class="shipped-details">
        <div class="card-box infos">
            <div class="news">
                <div class="title">
                    <p>发货申请单 {{ details?.ShipInfo?.ApplyType }}</p>
                    <p>申请日期：{{ details?.ShipInfo?.ApplyTime }}</p>
                </div>
                <div v-show="details?.DeliverNodes?.[2]?.IsOccor == 1">
                    剩余X天确认收货
                    <a-button type="primary" @click="shouHuo">确认收货</a-button>
                </div>
            </div>
            <div class="liucheng-list">
                <div class="liucheng-item" v-for="(item, index) in liucheng" :key="index">
                    <div class="card-info">
                        <div class="left-img">
                            <img :src="getImageUrl(item.img)" alt="流程图片" />
                        </div>
                        <div class="right-text">
                            <p>{{ details?.DeliverNodes?.[index]?.Title }}</p>
                            <p>{{ details?.DeliverNodes?.[index]?.NodeTime }}</p>
                        </div>
                    </div>
                    <img class="nav" :src="getImageUrl('user/logistics/nav.png')" alt="" />
                </div>
            </div>
        </div>
        <div class="card-box shipping">
            <div class="title"> 发货信息 </div>
            <div class="text-list">
                <p class="text-item">
                    <span>发货项数：</span>
                    <span> {{ details?.ShipInfo?.SendNums }}项</span>
                </p>
                <p class="text-item">
                    <span>发货价值：</span>
                    <span> {{ details?.ShipInfo?.SendPrice }}元</span>
                </p>
                <p class="text-item">
                    <span>申请方式：</span>
                    <span> {{ details?.ShipInfo?.ApplyType }}</span>
                </p>
                <p class="text-item">
                    <span>申请时间：</span>
                    <span> {{ details?.ShipInfo?.ApplyTime }}</span>
                </p>
                <p class="text-item">
                    <span>备注：</span>
                    <span> {{ details?.ShipInfo?.Remarks }}</span>
                </p>
            </div>
        </div>
        <div class="card-box shipping">
            <div class="title">物流信息</div>
            <div class="text-list">
                <p class="text-item">
                    <span>物流形式：</span>
                    <span>{{ details?.DeliverInfo?.DeliveryType }}</span>
                </p>
                <p class="text-item">
                    <span>收货地址：</span>
                    <span>{{ details?.DeliverInfo?.ExpressAddr }}</span>
                </p>
                <p class="text-item">
                    <span>承运方: </span>
                    <span>{{ details?.DeliverInfo?.ExpressCompany }}</span>
                </p>
                <p class="text-item">
                    <span>保价价值：</span>
                    <span>{{ details?.DeliverInfo?.InsuredValue }}元</span>
                </p>
                <p class="text-item">
                    <span>承运单号：</span>
                    <span>{{ details?.DeliverInfo?.ExpressNo }}</span>
                </p>
            </div>
        </div>
        <div class="card-box">
            <div class="title">藏品清单</div>
            <a-table
                bordered
                :pagination="false"
                :columns="columns"
                :dataSource="details?.GoodsList"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Title'">
                        <div class="goods-info" @click="showGoodsDetails(record)">
                            <img :src="record.CoverImg" alt="" />
                            <span>
                                {{ record.Title }}
                            </span>
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
            <div class="leng-details">
                <span></span>
                <span>总计： {{ details?.GoodsList?.length }}项 价值{{ allPrice }}元</span>
            </div>
        </div>
        <div class="card-box shipping">
            <div class="title">补收费用</div>
            <div class="text-list">
                <p class="text-item">
                    <span>物流费：</span>
                    <span>{{ details?.FeeInfo?.FeeLogistics }}元</span>
                </p>
                <p class="text-item">
                    <span>包装费：</span>
                    <span>{{ details?.FeeInfo?.FeePackaging }}元</span>
                </p>
                <p class="text-item">
                    <span>仓储费：</span>
                    <span>{{ details?.FeeInfo?.FeeStorage }}元</span>
                </p>
                <p class="text-item">
                    <span>自淘费用：</span>
                    <span>{{ details?.FeeInfo?.FeeSelfTao }}元</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.shipped-details {
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
    .leng-details {
        .flex-row;
        justify-content: space-between;
        padding: 20px;
    }
    .news {
        width: 100%;
        border-bottom: 1px solid #ebebeb;
        .flex-row;
        justify-content: space-between;
        .ant-btn {
            height: 44px;
            padding: 0;
            line-height: 44px;
            width: 100px;
        }
    }
    .infos {
        .title {
            .flex-row;
            gap: 30px;
            font-size: 20px;
            justify-content: flex-start;
            font-weight: 500;
            color: #9a0000;
            border: none;
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
                    .flex-row;
                    gap: 10px;
                    padding: 30px 0;
                    background-color: #eef3f8;
                    border-radius: 8px;

                    .left-img {
                        padding: 10px;
                        border-radius: 50%;
                        background-color: #fff;

                        img {
                            width: 35px;
                            height: 35px;
                        }
                    }

                    .right-text {
                        font-size: 18px;
                        .flex-col;
                        gap: 10px;
                        align-items: flex-start;
                    }
                }
            }
        }
    }

    .shipping {
        padding: 20px;
        margin: 20px 0;

        .title {
            padding: 18px 40px 18px;
            background-color: #eef3f8;
        }

        .text-list {
            .flex-col;
            align-items: flex-start;
            padding: 20px 60px;
            gap: 20px;
            font-size: 18px;
        }
    }
}
</style>
