<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const value = ref('1');
const open = ref(false);
const columns = [
    {
        title: '商品信息',
        dataIndex: 'goodsDetails',
        key: 'goodsDetails',
        width: '320px',
        align: 'center'
    },
    {
        title: '单价/积分',
        dataIndex: 'code',
        key: 'code',
        align: 'center'
    },
    {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center'
    },
    {
        title: '小计',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'status',
        key: 'status'
    }
];
const state = reactive({
    selectedRowKeys: [],
    loading: false
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const tableDataList = [{}, {}];
const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys;
};
</script>

<template>
    <div class="wrap">
        <div class="con-main-wrap">
            <div class="title"> 购物车 (全部2) </div>
            <a-table
                :pagination="false"
                :row-selection="{
                    selectedRowKeys: state.selectedRowKeys,
                    onChange: onSelectChange
                }"
                :columns="columns"
                :data-source="tableDataList"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'goodsDetails'">
                        <div class="table-item-gooods-info">
                            <img :src="getImageUrl('chengjiao/list2.png')" alt="" />
                            <p
                                >这样，首先我们取反了 state[key]
                                的值，然后打印了新的值。这应该能更准</p
                            >
                        </div>
                    </template>
                    <template v-if="column.key === 'code'">
                        <div class="table-item-gooods-code">
                            <p>¥ 530。00</p>
                            <p>(含30.00服务费)</p>
                        </div>
                    </template>
                    <template v-if="column.key === 'num'">
                        <div class="table-item-gooods-num">
                            <button>-</button>
                            <a-input v-model:value="value"></a-input>
                            <button>+</button>
                        </div>
                    </template>
                    <template v-if="column.key === 'price'">
                        <div class="table-item-gooods-price">
                            <p>¥ 530.00 </p>
                            <p>1056 积分 </p>
                        </div>
                    </template>
                    <template v-if="column.key === 'status'">
                        <div class="table-item-gooods-status">
                            <p> 移至我的关注 </p>
                            <p>到货提醒</p>
                            <p @click="open = true">删除</p>
                        </div>
                    </template>
                </template>
            </a-table>
            <div class="operate">
                <a-checkbox v-model:checked="checked">全选</a-checkbox>
                <p click="open = true">删除</p>
                <p>移入收藏夹</p>
            </div>
            <div class="details-wrap">
                <div></div>
                <div class="details">
                    <p
                        >已选择 <span class="num">2</span> 件商品 总价 ¥
                        <span class="price">530.00</span></p
                    >
                    <p>消耗 <span class="jifen">1056</span> 积分</p>
                    <a-button>去结算</a-button></div
                >
            </div>
        </div>
    </div>
    <a-modal v-model:open="open" title="删除商品" @ok="handleOk">
        <p>您可以选择移至我的关注</p>
    </a-modal>
</template>

<style scoped lang="less">
.wrap {
    padding: 100px 0;
    background-color: #fdeace;
    .con-main-wrap {
        padding: 0 20px 40px;
        background-color: #fff;
        .title {
            font-size: 20px;
            padding: 20px 30px;
        }
        .table-item-gooods-info {
            display: flex;
            gap: 20px;
            text-align: left;
            align-items: center;
        }
        .table-item-gooods-num {
            display: flex;
            justify-content: center;
            button {
                font-size: 26px;
                padding: 0 16px;
                cursor: pointer;
            }
            .ant-input {
                width: 80px;
                text-align: center;
            }
        }
        .table-item-gooods-price {
            color: #9a0000;
            font-weight: 600;
            font-size: 18px;
        }
        .table-item-gooods-status {
            cursor: pointer;
            p {
                font-size: 16px;
                line-height: 20px;
            }
        }
        .operate {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
        }
        .details-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .details {
                p {
                    margin: 20px 0;
                }
                .ant-btn {
                    color: #fff;
                    padding: 15px 50px;
                    background-color: #9a0000;
                }
            }
        }
    }
}
</style>
