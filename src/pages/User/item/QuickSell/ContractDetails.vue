<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const columns = [
    {
        title: '结算单号',
        dataIndex: 'code',
        key: 'code',
        align: 'center'
    },
    {
        title: '结算项数',
        key: 'cate',
        dataIndex: 'cate',
        align: 'center'
    },
    {
        title: '结算总额',
        dataIndex: 'num',
        key: 'num',
        align: 'center'
    },
    {
        title: '实得总额',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '生成时间',
        key: 'chengjiao',
        align: 'center',
        dataIndex: 'chengjiao'
    },
    {
        title: '状态',
        dataIndex: 'laoban',
        key: 'laoban',
        align: 'center'
    }
];
const data = [
    {
        code: '63932729',
        cate: '3项',
        num: '16,920.00',
        name: '16,376.40',
        chengjiao: '2023-11-10 21:37:30',
        laoban: '已完成'
    }
];
</script>

<template>
    <div class="card-box">
        <div class="title">
            合同明细
            <p> 合同编号 638468 等级日期 2023-10-27 </p>
        </div>
        <a-table :pagination="false" :columns="columns" :data-source="data"> </a-table>
    </div>
</template>

<style scoped lang="less">
.card-box {
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
            font-size: 16px;
            color: #9a0000;
        }
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #eef3f8;
    }
}
</style>
