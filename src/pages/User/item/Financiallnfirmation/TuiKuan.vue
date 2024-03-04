<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { handleFinishFailed } from '@/utils/form/rules';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const formState = reactive({
    username: '',
    password: '',
    selector: undefined
});
const tableDataList = [
    {
        order: '1683762',
        time: '2023-05-15',
        price: '10,403,46',
        way: '银行划账  支行',
        status: '客服处理已受理'
    },
    {
        order: '1683762',
        time: '2023-05-15',
        price: '10,403,46',
        way: '银行划账  支行',
        status: '客服处理已受理'
    },
    {
        order: '1683762',
        time: '2023-05-15',
        price: '10,403,46',
        way: '银行划账  支行',
        status: '客服处理已受理'
    },
    {
        order: '1683762',
        time: '2023-05-15',
        price: '10,403,46',
        way: '银行划账  支行',
        status: '客服处理已受理'
    }
];
const columns = [
    {
        title: '申请单号',
        dataIndex: 'order',
        key: 'order',
        align: 'center',
        ellipsis: true
    },
    {
        title: '申请时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
    {
        title: '退款金额',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '退款方式',
        dataIndex: 'way',
        key: 'way',
        align: 'center'
    },

    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center'
    }
];
const onFinish = (values) => {
    console.log('Success:', values);
};
</script>

<template>
    <div class="tui-kuan">
        <div class="top-wrap">
            <div class="left-user-info">
                <div class="title">余额(¥)</div>
                <div class="num">143.40 <span>元</span></div>
                <p>竞卖额度</p>
                <p>¥453423</p>
                <p>¥453423可用</p>
                <div class="bi">
                    <div>
                        <p class="label">涌币</p>
                        <p>0(赠送0)</p>
                    </div>
                    <img :src="getImageUrl('user/caiwu/list1.png')" alt="" />
                </div>
            </div>
            <div class="right-wrap">
                <div class="title">
                    <p class="cate-item"> 退款 </p>
                </div>
                <a-form
                    :model="formState"
                    name="tuikuan"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="handleFinishFailed"
                    style="max-width: 400px"
                >
                    <a-form-item
                        name="username"
                        :rules="[{ required: true, message: '请输入退款金额' }]"
                    >
                        <a-input
                            placeholder="金额（RMB）"
                            v-model:value.trim="formState.username"
                        />
                    </a-form-item>

                    <a-form-item
                        name="password"
                        :rules="[{ required: true, message: '请输入支付密码' }]"
                    >
                        <a-input-password
                            placeholder="支付密码"
                            v-model:value.trim="formState.password"
                        />
                    </a-form-item>
                    <a-form-item
                        name="selector"
                        :rules="[
                            {
                                required: true,
                                message: '请选择退款方式',
                                trigger: 'change'
                            }
                        ]"
                    >
                        <a-select placeholder="退款方式" v-model:value="formState.selector">
                            <a-select-option value="1">中国银行 1314520</a-select-option>
                            <a-select-option value="2">邮政银行 5201314</a-select-option>
                            <a-select-option value="3">工商银行 999666</a-select-option>
                            <a-select-option value="4">建设银行 666999</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" html-type="submit">申请</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div class="title-jilu">退款申请记录</div>
        <a-table :pagination="false" :columns="columns" :data-source="tableDataList">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'status'">
                    <div class="status"> 客服处理已受理 </div>
                </template>
            </template>
        </a-table>
        <CatePage></CatePage>
    </div>
</template>

<style scoped lang="less">
.tui-kuan {
    padding: 20px 16px;
    background-color: #fff;
    .top-wrap {
        display: flex;
        gap: 10px;
        .left-user-info {
            min-width: 334px;
            border-radius: 12px;
            background-color: #f7f7f7;
            padding: 40px 20px 20px 40px;
            .flex-col;
            gap: 10px;
            align-items: flex-start;
            font-size: 16px;
            .title {
                font-size: 18px;
            }

            .num {
                color: #9a0000;
                font-size: 30px;
                margin: 10px 0 20px;
                span {
                    font-size: 16px;
                }
            }

            p {
                color: #6a6a6a;
            }

            .label {
                margin: 10px 0;
            }

            .bi {
                margin-top: 30px;
                width: 100%;
                .flex-row;
                align-items: flex-start;
                justify-content: space-between;
            }
        }
        .right-wrap {
            width: 100%;
            .title {
                padding: 10px 10px 0;
                background-color: #eef3f8;

                .cate-item {
                    padding: 16px 0;
                    width: 140px;
                    text-align: center;
                    font-size: 18px;
                    cursor: pointer;
                    background-color: #fff;
                    border-radius: 6px 6px 0 0;
                    color: #9a0000;
                    font-weight: 700;
                }
            }
            .ant-form {
                margin: 30px 0 0 15px;
            }
        }
    }
    .title-jilu {
        font-size: 18px;
        margin: 30px 20px 20px;
        color: #6a6a6a;
    }
    .status {
        color: #9a0000;
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #eef3f8;
    }
}
</style>
