<script setup>
import Header from './Header.vue';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Tables from '../Financiallnfirmation/item/tables.vue';
const allPrice = localStorage.getItem('allPrice');
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const orderId = localStorage.getItem('orderId');
const emits = defineEmits(['changeShowPage']);
const isDraweComponent = ref(false);
const afterOpenChange = (bool) => {
    isDraweComponent.value = bool;
    localStorage.removeItem('checkedStatus');
    localStorage.removeItem('kuaidis');
    localStorage.removeItem('zhifus');
    localStorage.removeItem('baojias');
    localStorage.removeItem('iptValues');
    localStorage.removeItem('quans');
    localStorage.removeItem('quanLists');
    localStorage.removeItem('DelLists');
    localStorage.setItem('showPaegs', 1);
};
onMounted(() => {});
const jingMaiColumns = [
    {
        title: '国内银行',
        dataIndex: 'Bn',
        key: 'Bn',
        align: 'center',
        ellipsis: true
    },
    {
        title: '支行信息',
        dataIndex: 'Brand',
        key: 'Brand',
        align: 'center'
    },
    {
        title: '账号',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center',
        ellipsis: true
    },
    {
        title: '户名',
        dataIndex: 'PingTai',
        key: 'PingTai',
        align: 'center',
        ellipsis: true
    }
];
const showModals = ref(false);
const changeAddPrice = () => {
    isDraweComponent.value = true;
};
</script>

<template>
    <div class="bank">
        <Header num="2"></Header>
        <div class="title-nav">
            <h5>银行地址及汇款地址</h5>
        </div>
        <!-- <a-table :pagination="false" :columns="jingMaiColumns" :dataSource="props?.fetchData">
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
        </a-table> -->
        <a-modal
            width="560px"
            :closable="false"
            v-model:open="isDraweComponent"
            :footer="null"
            centered
        >
            <Tables @close="afterOpenChange" :orderId="orderId" :allPrice="allPrice"></Tables>
        </a-modal>
        <div class="element">
            <h5>注意事项</h5>
            <p class="labels">1.属性来控制元素的垂直对齐方式。如果你想让元素底部对齐，你可以设置v</p
            ><p class="labels"
                >2.属性来控制元素的垂直对齐方式。如果你想让元素底部对齐，你可以设置v</p
            ><p class="labels"
                >3.属性来控制元素的垂直对齐方式。如果你想让元素底部对齐，你可以设置v</p
            >
            <div class="label"
                >属性来控制元素的垂直对齐方式。如果你想让元素底部对齐，你可以设置</div
            >
            <div class="add">
                <div class="btns">
                    <a-button type="primary" @click="emits('changeShowPage', 2)">返回修改</a-button>
                    <a-button type="primary" @click="changeAddPrice">填写汇款告知单</a-button></div
                >
                <div class="text">
                    <p>应付金额</p>
                    <p class="price">
                        {{ allPrice }}
                        元</p
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.bank {
    min-height: 600px;
    padding: 20px 16px;
    background-color: #fff;
    .title-nav {
        .flex-row;
        justify-content: space-between;
        padding: 18px 30px;
        background-color: #eef3f8;
        h5 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 20px;
        }
    }
    .element {
        margin: 20px;
        padding: 0 30px;
        .labels {
            margin: 20px 0;
        }
        .label {
            margin-top: 40px;
        }
        .add {
            margin-top: 30px;
            .flex-row;
            align-items: flex-end;
            justify-content: space-between;
            .btns {
                .flex-row;
                gap: 20px;
                width: 500px;
            }
            .text {
                p {
                    font-size: 20px;
                }
                .price {
                    margin-top: 20px;
                    color: #9a0000;
                }
            }
        }
    }

    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #fff;
        padding: 20px 16px;
        font-weight: 400;
    }
}
</style>
