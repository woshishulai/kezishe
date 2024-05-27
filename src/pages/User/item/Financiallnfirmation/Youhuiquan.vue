<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import CatePage from '@/components/common/CatePage.vue';
import { youHuiQuan } from '@/request/user/api';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tableList = ref([]);

onMounted(async () => {
    try {
        let res = await youHuiQuan();
        console.log(res);
        tableList.value = res.Data;
    } catch (error) {
        info('error', error);
    }
});

const columns = [
    {
        title: '优惠券ID',
        dataIndex: 'CouponId',
        key: 'CouponId',
        align: 'center'
    },
    {
        title: '优惠券名称',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center',

        ellipsis: true
    },
    {
        title: '抵扣金额',
        dataIndex: 'Price',
        key: 'Price',
        align: 'center',

        ellipsis: true
    },
    {
        title: '无门槛',
        dataIndex: 'UseCondition',
        key: 'UseCondition',
        align: 'center'
    },
    {
        title: '有效开始时间',
        dataIndex: 'StartTime',
        align: 'center',
        key: 'StartTime'
    },
    {
        title: '有效截止时间',
        dataIndex: 'EndTime',
        align: 'center',
        key: 'EndTime'
    },
    {
        title: '使用说明',
        dataIndex: 'UseScope',
        align: 'center',
        key: 'UseScope',
        width: 120
    }
];
</script>

<template>
    <div class="card-box">
        <a-table :pagination="false" :columns="columns" :data-source="tableList.CouponUserData">
        </a-table>
    </div>
</template>

<style scoped lang="less">
.card-box {
    padding-top: 30px;
}
</style>
