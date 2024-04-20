<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { recordRemittanceList } from '@/request/user/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tableList = ref([]);
const columns = [
    {
        title: '告知单号',
        dataIndex: 'OrderNo',
        key: 'OrderNo',
        align: 'center',
        width: '200px'
    },
    {
        title: '提交时间',
        dataIndex: 'Dates',
        key: 'Dates',
        align: 'center',
        width: '220px'
    },
    {
        title: '汇款方式',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center',
        width: '200px'
    },
    {
        title: '汇款金额',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '200px'
    },
    {
        title: '汇款日期',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center',
        width: '200px'
    },
    {
        title: '汇款人',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '200px'
    },
    {
        title: '出款信息',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center',
        width: '200px'
    },
    {
        title: '收款信息',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: '200px'
    },
    {
        title: '关联单号',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center',
        width: '200px'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '200px',
        align: 'center'
    }
];
const emits = defineEmits(['close']);

onMounted(async () => {
    try {
        let res = await recordRemittanceList();
        console.log(res, '备注');
        if (res.Tag == 1) {
            tableList.value = res.Data;
        }
    } catch (error) {
        info('error', error);
    }
});
</script>

<template>
    <div class="tables">
        <a-table
            :columns="columns"
            :scroll="{ x: '1200px' }"
            scrollToFirstRowOnChange="true"
            :data-source="tableList"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Address'">
                    <div class="address">
                        <span>{{ record.Address }}</span>
                        <span>&nbsp;&nbsp;</span>
                        <span>{{ record.BankName }}</span>
                        <span>&nbsp;&nbsp;</span>
                        <span>{{ record.Branch }}</span>
                    </div>
                </template>
                <template v-if="column.key === 'status'">
                    <div class="status">
                        <span @click="openChangeParamsModel('修改银行账户信息', record)">修改</span>
                        <span @click="openModel('确定删除该银行信息吗', record.Id)">删除</span>
                        <span
                            @click="changeDefault(record.Id)"
                            :class="record.Default == 1 ? 'active' : ''"
                            >{{ record.Default ? '默认账号' : '设为默认' }}
                        </span>
                    </div>
                </template>
            </template>
        </a-table>
    </div>
</template>

<style scoped lang="less">
.tables {
    width: 100%;
}
</style>
