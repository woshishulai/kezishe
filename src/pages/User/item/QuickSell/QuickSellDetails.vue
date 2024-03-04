<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const list = [
    {
        title: '已受理',
        time: '2023-10-27'
    },
    {
        title: '已整理',
        time: '2023-10-30'
    },
    {
        title: '已制图',
        time: '2023-11-02'
    },
    {
        title: '已审核',
        time: '2023-11-04'
    },
    {
        title: '已核查',
        time: '2023-11-07'
    },
    {
        title: '已执行',
        time: '2023-11-29'
    }
];
const status = [
    {
        title: '全部',
        num: '3'
    },
    {
        title: '已退回',
        num: '0'
    },
    {
        title: '待预展',
        num: '0'
    },
    {
        title: '预展中',
        num: '0'
    },
    {
        title: '竞买中',
        num: '0'
    },
    {
        title: '已成交',
        num: '3'
    },
    {
        title: '未成交',
        num: '0'
    },
    {
        title: '已下架',
        num: '0'
    },
    {
        title: '待结算',
        num: '0'
    },
    {
        title: '结算中',
        num: '0'
    },
    {
        title: '已结算',
        num: '0'
    }
];
const columns = [
    {
        title: '商品编号',
        dataIndex: 'goodscode',
        key: 'goodscode',
        align: 'center'
    },
    {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
        align: 'center'
    },
    {
        title: '藏品状态',
        dataIndex: 'goodscate',
        key: 'goodscate',
        align: 'center'
    },
    {
        title: '结算状态',
        dataIndex: 'order',
        key: 'order',
        align: 'center'
    },
    {
        title: '起始价',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '当前/结标价',
        dataIndex: 'sub',
        key: 'sub',
        align: 'center'
    },
    {
        title: '结标时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    }
];
const dataSource = [
    {
        goodscode: '630527010',
        goodscate: '已支付',
        goodsname: '好东西很不错',
        order: '1080840',
        time: '2023.10.12 21:37:00',
        price: '3,600.00元',
        sub: '1,220.00'
    },
    {
        goodscode: '630527010',
        goodscate: '已支付',
        goodsname: '好东西很不错',
        order: '1080840',
        time: '2023.10.12 21:37:00',
        price: '3,600.00元',
        sub: '1,220.00'
    },
    {
        goodscode: '630527010',
        goodscate: '已支付',
        goodsname: '好东西很不错',
        order: '1080840',
        time: '2023.10.12 21:37:00',
        price: '3,600.00元',
        sub: '1,220.00'
    },

    {
        goodscode: '630527010',
        goodscate: '已支付',
        goodsname: '好东西很不错',
        order: '1080840',
        time: '2023.10.12 21:37:00',
        price: '3,600.00元',
        sub: '1,220.00'
    }
];
</script>

<template>
    <div class="card-box">
        <div class="title">
            合同明细
            <p> 合同编号 638468 等级日期 2023-10-27 </p>
        </div>
        <div class="liucheng-wrap">
            <div class="time-list">
                <div class="time-item" v-for="(item, index) in list" :key="index">
                    <div class="left-info" :class="index === 0 ? 'active' : ''">
                        <p>{{ item.title }}</p>
                        <p>{{ item.time }}</p>
                    </div>
                    <i v-if="list.length !== index + 1" class="iconfont icon-right"></i>
                </div>
            </div>
            <div class="nav-list">
                <div class="xian">
                    <div
                        class="nav-red"
                        :class="'posit' + index"
                        v-for="(item, index) in list.length"
                        :key="index"
                    >
                        <span></span>
                        <p></p>
                    </div>
                </div>
                <img :src="getImageUrl('user/redNav.jpg')" alt="" />
            </div>
        </div>
        <div class="status-cate">
            <span v-for="(item, index) in status" :key="index">
                {{ item.title }} {{ item.num }}
            </span>
        </div>
        <a-table :pagination="false" :columns="columns" :data-source="dataSource">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'goodsname'">
                    <div class="table-item-gooods-info">
                        <img :src="getImageUrl('register/logo.png')" alt="" />
                        <span>{{ record.goodsname }}</span>
                    </div>
                </template>
            </template>
        </a-table>
        <div class="show-details">
            <a-button @click="router.push('/user/quick-sell/contract-details')"
                >查看结算概括</a-button
            >
        </div>
    </div>
</template>

<style scoped lang="less">
.card-box {
    padding: 0 16px 30px;
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 16px;
        color: #9a0000;
    }
}
.liucheng-wrap {
    padding: 20px 0;
    background: linear-gradient(to bottom, #fff, #f3f3f4);
    .time-list {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;

        .time-item {
            display: flex;
            gap: 0px;
            align-items: center;
            .left-info {
                padding: 10px 30px 23px;
                border-radius: 8px;
                background-color: #c7cad2;
                &.active {
                    background-color: #dd4c34;
                }
                p {
                    color: #fff;
                    margin-top: 13px;
                    font-size: 16px;
                }
            }
            i {
                color: #c7cad2;
                font-size: 30px;
                font-weight: 700;
            }
        }
    }
    .nav-list {
        .flex-row;
        padding: 26px 8px 0 20px;
        .xian {
            position: relative;
            flex: 1;
            height: 5px;
            background: linear-gradient(to right, #f7e4e3, #e2362c);
            .nav-red {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                bottom: -4px;
                z-index: 2;

                span {
                    height: 18px;
                    width: 2px;
                    background-color: #dd4c34;
                }
                p {
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background-color: #e2362c;
                }
                &.posit0 {
                    left: 60px;
                }
                &.posit1 {
                    left: 240px;
                }
                &.posit2 {
                    left: 420px;
                }
                &.posit3 {
                    left: 600px;
                }
                &.posit4 {
                    left: 780px;
                }
                &.posit5 {
                    left: 960px;
                }
            }
        }
    }
}
.status-cate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 30px 20px;
    font-weight: 700;
    span {
        cursor: pointer;
        &:hover {
            color: #9a0000;
        }
    }
}
.table-item-gooods-info {
    .flex-row;
    gap: 10px;

    img {
        width: 50px;
    }
}
.show-details {
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    .ant-btn {
        background-color: #85909b;
        color: #fff;
        padding: 16px 40px;
        border-radius: 4px;
    }
}
:deep(.ant-table-wrapper .ant-table-thead > tr > th) {
    background-color: #eef3f8;
}
</style>
