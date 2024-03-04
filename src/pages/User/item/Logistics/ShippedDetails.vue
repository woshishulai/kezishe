<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const liucheng = [
    {
        img: 'user/logistics/list1.png',
        title: '已受理',
        time: '2023-09-17'
    },
    {
        img: 'user/logistics/list2.png',
        title: '已出库',
        time: '2023-09-18'
    },
    {
        img: 'user/logistics/list3.png',
        title: '已发货',
        time: '2023-09-18'
    },
    {
        img: 'user/logistics/list4.png',
        title: '已收货',
        time: '2023-10-07'
    }
];
const fahuoList = [
    {
        title: '发货项数：',
        label: '8项'
    },
    {
        title: '发货价值：',
        label: '17.377.20元'
    },
    {
        title: '申请方式：',
        label: '新建发货单 #2108258'
    },
    {
        title: '申请时间：',
        label: '2023-09-17（星期日） 下午13:00'
    },
    {
        title: '备注：',
        label: ''
    }
];
const wuliuList = [
    {
        title: '物流形式：',
        label: '物流发货'
    },
    {
        title: '收货地址：',
        label: '北京市西城区黄寺大街些'
    },
    {
        title: '承运方: ',
        label: '顺丰标快（到付）'
    },
    {
        title: '报价价值：',
        label: '无报价'
    },
    {
        title: '承运单号：',
        label: 'SF1659120534004'
    }
];
const bushouList = [
    {
        title: '物流费：',
        label: '0元'
    },
    {
        title: '包装费：',
        label: '0元'
    },
    {
        title: '仓储费: ',
        label: '0元'
    },
    {
        title: '自淘费用：',
        label: '0元'
    }
];
const columns = [
    {
        title: '商品编号',
        key: 'goodsCode',
        dataIndex: 'goodsCode'
    },
    {
        title: '藏品名称',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: '类型',
        key: 'status',
        dataIndex: 'status'
    },
    {
        title: '成交价/积分',
        key: 'price',
        dataIndex: 'price'
    },
    {
        title: '数量',
        key: 'num',
        dataIndex: 'num'
    },
    {
        title: '包含收藏证书',
        key: 'have',
        dataIndex: 'have'
    },
    {
        title: '时间',
        key: 'time',
        dataIndex: 'time'
    }
];
const dataSource = [
    {
        goodsCode: '480943458',
        name: '纪特票新四套（部分票带边，色标）',
        status: '竞买',
        price: '355.20',
        num: 1,
        have: '有',
        time: ''
    },
    {
        goodsCode: '480943458',
        name: '纪特票新四套（部分票带边，色标）',
        status: '竞买',
        price: '355.20',
        num: 1,
        have: '有',
        time: ''
    },
    {
        goodsCode: '480943458',
        name: '纪特票新四套（部分票带边，色标）',
        status: '竞买',
        price: '355.20',
        num: 1,
        have: '有',
        time: ''
    }
];
</script>

<template>
    <div class="shipped-details">
        <div class="card-box infos">
            <div class="title">
                <p>发货申请单 {{ ' #2108258 ' }}</p>
                <p>申请日期：{{ '2023-09-17' }}</p>
            </div>
            <div class="liucheng-list">
                <div class="liucheng-item" v-for="(item, index) in liucheng" :key="index">
                    <div class="card-info">
                        <div class="left-img">
                            <img :src="getImageUrl(item.img)" alt="流程图片" />
                        </div>
                        <div class="right-text">
                            <p>{{ item.title }}</p>
                            <p>{{ item.time }}</p>
                        </div>
                    </div>
                    <img class="nav" :src="getImageUrl('user/logistics/nav.png')" alt="" />
                </div>
            </div>
        </div>
        <div class="card-box shipping">
            <div class="title"> 发货信息 </div>
            <div class="text-list">
                <p class="text-item" v-for="(item, index) in fahuoList" :key="index">
                    <span>{{ item.title }}</span>
                    <span>{{ item.label }}</span>
                </p>
            </div>
        </div>
        <div class="card-box shipping">
            <div class="title">物流信息</div>
            <div class="text-list">
                <p class="text-item" v-for="(item, index) in wuliuList" :key="index">
                    <span>{{ item.title }}</span>
                    <span>{{ item.label }}</span>
                    <span></span>
                </p>
            </div>
        </div>
        <div class="card-box">
            <div class="title">藏品清单</div>
            <a-table :columns="columns" :dataSource="dataSource"></a-table>
        </div>
        <div class="card-box shipping">
            <div class="title">物流信息</div>
            <div class="text-list">
                <p class="text-item" v-for="(item, index) in bushouList" :key="index">
                    <span>{{ item.title }}</span>
                    <span>{{ item.label }}</span>
                    <span></span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.shipped-details {
    .infos {
        .title {
            .flex-row;
            gap: 30px;
            justify-content: flex-start;
            font-weight: 500;
            color: #9a0000;
        }

        .liucheng-list {
            .flex-row;
            padding: 20px 0;
            gap: 10px;

            .liucheng-item {
                flex: 1;
                .flex-row;
                gap: 10px;

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
