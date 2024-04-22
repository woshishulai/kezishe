<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getConfirmDetails, confirmOrder } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const details = ref({});
onMounted(async () => {
    try {
        // let res = await getConfirmDetails({ id: route.query.id });
        let query = {
            id: route.query.id
        };
        let res = await getConfirmDetails(query);
        details.value = res.Data;
        console.log(res);
    } catch (error) {
        info('error', error);
    }
});
const columns = [
    {
        title: '藏品编号',
        dataIndex: 'Bn',
        key: 'Bn',
        align: 'center'
    },
    {
        title: '藏品名称',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center'
    },
    {
        title: '藏品公司',
        dataIndex: 'Ratings',
        key: 'Ratings',
        align: 'center'
    },
    {
        title: '藏品分数',
        dataIndex: 'RatingScore',
        key: 'RatingScore',
        align: 'center'
    },

    {
        title: '藏品品位',
        dataIndex: 'Official',
        key: 'Official',
        align: 'center'
    },
    {
        title: '藏品类型',
        dataIndex: 'CType',
        key: 'CType',
        align: 'center'
    },
    {
        title: '藏品底价',
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center'
    },
    {
        title: '所属专场',
        dataIndex: 'ZhuanChang',
        key: 'ZhuanChang',
        align: 'center'
    },
    {
        title: '制作费',
        dataIndex: 'ZhiZuoPrice',
        key: 'ZhiZuoPrice',
        align: 'center'
    },
    {
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center'
    }
];
const returnStatus = (num) => {
    let arr = ['待预展', '预展中', '竞买中', '已成交', '', '', '', '未成交', '已下架', '已退回'];
    return arr[num];
};
const changeStatus = async () => {
    try {
        let query = {
            id: route.query.id
        };
        let res = await confirmOrder(query);
        if (res.Tag == 1) {
            details.value.Status = 1;
        }
    } catch (error) {
        info('error', error);
    }
};
</script>

<template>
    <div class="wrap">
        <Logo></Logo>
        <div class="titles"> 壳子社在线委托出售明细 </div>
        <div class="label"
            ><span>委托方ID：{{ details?.UserId || '' }}</span>
            <p>
                <span>状态：{{ details?.Status == 1 ? '已确认' : '待确认' }}</span>
                <span>合同编号：{{ details?.Number || '' }}</span>
            </p></div
        >

        <a-table :pagination="false" :columns="columns" :data-source="details?.ContractConfirmData">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Status'">
                    <span>{{ returnStatus(record.Status) }}</span>
                </template>
            </template>
        </a-table>
        <div class="btn">
            <a-button type="primary" v-if="details?.Status != 1" @click="changeStatus"
                >确认</a-button
            >
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    height: 100vh;
    width: 1250px;
    margin: 0 auto;
    color: #333;
    .titles {
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        margin-top: 20px;
    }
    .label {
        .flex-row;
        justify-content: space-between;
        margin-top: 30px;
        margin-bottom: 10px;
        padding: 10px 16px;
        p {
            .flex-row;
            gap: 20px;
        }
    }
    .btn {
        margin-top: 26px;
        width: 150px;
        margin-left: auto;
    }
}
</style>
