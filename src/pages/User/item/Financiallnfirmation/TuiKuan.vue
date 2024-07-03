<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { handleFinishFailed } from '@/utils/form/rules';
import {
    getTuiKuanCateApi,
    getAccountYuEApi,
    refundApi,
    getTuiKuanJiLuApi
} from '@/request/user/api';
import { encryptionPassword } from '@/hooks/user';
import { getCodeParams } from '@/request/api';
import { useUserInfo, usePassword } from '@/store/store';
import { info } from '@/hooks/antd/message';
const newCodeParams = usePassword();
const typeList = ref([]);
const getFetchType = async () => {
    try {
        let res = await getTuiKuanCateApi();
        typeList.value = res.Data;
    } catch (error) {
        console.log(error);
    }
};
const userInfoDetails = ref({});
const getUserYue = async () => {
    try {
        let res = await getAccountYuEApi();
        console.log(res);
        userInfoDetails.value = res.Data;
    } catch (error) {
        console.log(error);
    }
};
const newQuery = ref({
    total: 1
});
const tableDataList = ref([]);
const getTableDataList = async (page = 1, pageSize = 10) => {
    newQuery.value.PageIndex = page;
    newQuery.value.PageSize = pageSize;
    try {
        let res = await getTuiKuanJiLuApi(newQuery.value);
        tableDataList.value = res.Data;
    } catch (error) {
        console.log(error);
    }
};
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {
    getFetchType();
    getUserYue();
    getTableDataList();
    const codeTime = newCodeParams.codePasswords.ExpireTime;
    const currentTime = Date.now();
    if (!codeTime || currentTime > codeTime) {
        getCodeParamsApi();
    }
});
const getCodeParamsApi = async () => {
    try {
        let res = await getCodeParams();
        if (res.Tag == 1) {
            console.log(res);
            newCodeParams.changeCodePasswords(res.Data);
        }
    } catch (error) {
        info('error', error);
    }
};
const formState = reactive({
    Prices: '',
    Password: '',
    RefundType: undefined
});

const columns = [
    {
        title: '申请单号',
        dataIndex: 'Rbn',
        key: 'Rbn',
        align: 'center',
        ellipsis: true
    },
    {
        title: '申请时间',
        dataIndex: 'Time',
        key: 'Time',
        align: 'center'
    },
    {
        title: '退款金额',
        dataIndex: 'Prices',
        key: 'Prices',
        align: 'center'
    },
    {
        title: '退款方式',
        dataIndex: 'RefundType',
        key: 'RefundType',
        align: 'center'
    },

    {
        title: '状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center'
    }
];
const onFinish = async (values) => {
    let params = {
        Password: values.Password
    };
    let query = encryptionPassword(params, newCodeParams.codePasswords.PublicKey);
    query.Prices = values.Prices;
    query.RefundType = values.RefundType;
    try {
        let res = await refundApi(query);
        console.log(res);
        if (res.Tag == 1) {
            Object.keys(formState).forEach((item) => {
                formState[item] = '';
            });
            info('success', res.Message);
        } else {
            info('error', res.Message);
        }
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="tui-kuan">
        <div class="top-wrap">
            <div class="left-user-info">
                <div class="title">账户余额(¥)</div>
                <div class="num">{{ userInfoDetails.Balance }} <span>元</span></div>
                <div class="bi">
                    <div>
                        <p>竞卖额度</p>
                        <p>¥{{ userInfoDetails.Quota || '' }}</p>
                        <p>¥{{ userInfoDetails.AvailableQuotas || '' }}可用</p>
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
                        name="Prices"
                        :rules="[{ required: true, message: '请输入退款金额' }]"
                    >
                        <a-input
                            style="width: 260px"
                            placeholder="金额（RMB）"
                            type="number"
                            v-model:value.trim="formState.Prices"
                        />
                    </a-form-item>

                    <a-form-item
                        name="Password"
                        id="login-account"
                        :rules="[{ required: true, message: '请输入支付密码' }]"
                    >
                        <a-input-password
                            style="width: 260px"
                            autocomplete="92ifelkfmaslk"
                            placeholder="支付密码"
                            v-model:value.trim="formState.Password"
                        />
                    </a-form-item>
                    <a-form-item
                        name="RefundType"
                        :rules="[
                            {
                                required: true,
                                message: '请选择退款方式',
                                trigger: 'change'
                            }
                        ]"
                    >
                        <a-select
                            style="width: 260px"
                            placeholder="退款方式"
                            v-model:value="formState.RefundType"
                            :options="typeList"
                            :field-names="{
                                label: 'Value',
                                value: 'RefundType',
                                options: 'children'
                            }"
                        >
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
                <template v-if="column.key === 'RefundType'">
                    <div>{{
                        record.RefundType == 1
                            ? '邮政'
                            : record.RefundType == 2
                              ? '银行划账'
                              : record.RefundType == 3
                                ? '柜台提账'
                                : '其他'
                    }}</div>
                </template>
                <template v-if="column.key === 'Status'">
                    <div :style="{ color: record.Status == '已受理' ? '#9a0000' : '' }">{{
                        record.Status
                    }}</div>
                </template>
            </template>
        </a-table>
        <CatePage :paginations="newQuery" @fetchList="getTableDataList"></CatePage>
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
            border-radius: 12px;
            background-color: #f7f7f7;
            padding: 40px 15px 13px 40px;
            min-width: 334px;
            .flex-col;
            align-items: flex-start;

            .title {
                font-size: 18px;
                font-family: 'MicrosoftYaHei';
                color: rgb(82, 82, 82);
            }

            .num {
                font-size: 30px;
                margin: 18px 0 30px;
                font-family: 'PingFang SC';
                color: rgb(154, 0, 0);

                span {
                    font-size: 16px;
                }
            }

            p {
                margin-bottom: 14px;
                color: rgb(74, 74, 74);
                font-size: 16px;
            }

            .label {
                margin: 10px 0;
            }

            .bi {
                width: 100%;
                .flex-row;
                align-items: flex-start;
                justify-content: space-between;

                img {
                    margin-top: 120px;
                }
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
                .ant-input {
                    width: 260px;
                    border-width: 1px;
                    border-style: solid;
                    border-radius: 4px;
                    border-color: rgb(218, 225, 232);
                    height: 43px;
                    background-color: rgb(255, 255, 255);
                    font-size: 14px;
                }
                :deep(.ant-select-selection-item) {
                    line-height: 43px;
                    font-size: 14px;
                    width: 260px;
                }
                :deep(.ant-select-selection-placeholder) {
                    line-height: 43px;
                }
                :deep(.ant-select-selector) {
                    font-size: 14px;

                    .ant-select-selection-search-input {
                        height: 43px;
                        line-height: 43px;
                        font-size: 14px;
                        width: 260px;
                    }
                }
                .ant-btn {
                    border-radius: 4px;
                    background-color: rgb(154, 0, 0);
                    width: 125px;
                    height: 45px;
                    font-size: 18px;
                    padding: 0;
                    font-family: 'MicrosoftYaHei';
                    color: rgb(255, 255, 255);
                }
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
