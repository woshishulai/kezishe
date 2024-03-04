<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import {
    getUserBankInfo,
    removeUserBankApi,
    changeUserBankInfo,
    defaultUserBankInfo,
    addUserBankInfo
} from '@/request/api';
import { message } from 'ant-design-vue';
import { countryList } from '@/utils/user/country';
import { data } from '@/utils/user/data';
import RemoveTableList from './item/RemoveTableList.vue';
import { handleFinishFailed } from '@/utils/form/rules.js';

const tableDataList = ref([]);
const params = reactive({
    open: false, //是否打开弹窗
    title: '', //标题
    id: '' //数组的某一项
});
const changeParams = reactive({
    open: false, //是否打开弹窗
    title: '', //标题
    id: '', //数组的某一项
    default: '',
    labels: {
        one: '姓名',
        two: '国家',
        there: '银行名称',
        four: '省份',
        five: '市',
        six: '分行支行',
        senven: '银行卡号',
        enigh: '备注信息'
    }
});
onMounted(async () => {
    statusList();
    try {
        let res = await getUserBankInfo();
        tableDataList.value = res.Data;
    } catch (error) {
        console.log(error);
    }
});
const formState = reactive({
    username: '测试',
    region: '中国',
    statusList: [], //省市数据
    date1: undefined, //选择的省市
    text: '工资卡', //备注信息
    bankNmae: '中国银行', //银行名称
    tel: '回龙观支行', //分行支行
    phone: '8372749471938492' //银行卡号
});
const columns = [
    {
        title: '姓名',
        dataIndex: 'FullName',
        key: 'FullName',
        align: 'center'
    },
    {
        title: '银行',
        dataIndex: 'Address',
        key: 'Address',
        align: 'center'
    },
    {
        title: '账号',
        dataIndex: 'Card',
        key: 'Card',
        align: 'center'
    },
    {
        title: '',
        dataIndex: 'status',
        key: 'status'
    }
];
const openModel = (biaoti, id) => {
    params.open = true;
    params.title = biaoti;
    params.id = id;
};
const openChangeParamsModel = (biaoti, id, Default) => {
    console.log(biaoti, id, Default);
    changeParams.open = true;
    changeParams.title = biaoti;
    changeParams.id = id;
    changeParams.default = Default;
};
const closeModel = () => {
    params.open = false;
    params.title = '';
    params.id = '';
    changeParams.open = false;
    changeParams.title = '';
    changeParams.id = '';
};
const postAPi = async () => {
    let res = await removeUserBankApi(params.id);
    console.log(res);
    if (res.Tag == 1) {
        const index = tableDataList.value.findIndex((item) => item.Id === params.id);
        tableDataList.value.splice(index, 1);
        closeModel();
    }
};
const changeApi = async (query) => {
    let params = {
        Id: changeParams.id,
        FullName: query.username,
        Address: query.country,
        BankName: query.status,
        Sheng: query.shi,
        Shi: query.text,
        Branch: query.postal,
        Card: query.tel,
        Memo: query.phone,
        Default: changeParams.default
    };
    let res = await changeUserBankInfo(params);
};
const changeDefault = async (id) => {
    let res = await defaultUserBankInfo(id);
    if (res.Tag === 1) {
        const item = tableDataList.value.find((item) => item.Id === id);
        tableDataList.value.forEach((addressItem) => (addressItem.Default = 0));
        item.Default = 1;
    }
};
const statusList = (country) => {
    const defaultCountry = country || 'CHN';
    const getStatusList = (countryCode) => {
        const provinces = data[countryCode];
        if (!provinces) {
            console.error(`Invalid country code: ${countryCode}`);
            return [];
        }

        return Object.entries(provinces).map(([provinceCode, provinceName]) => {
            const cities = data[provinceCode];

            return {
                value: provinceName,
                label: provinceName,
                children: cities
                    ? Object.entries(cities).map(([cityCode, cityName]) => ({
                          value: cityName,
                          label: cityName
                      }))
                    : []
            };
        });
    };
    formState.statusList = getStatusList(defaultCountry);
    return getStatusList(defaultCountry);
};
const handleChange = (value, option) => {
    statusList(option.id);
    formState.region = value;
    formState.date1 = '';
};
const handleFinish = async () => {
    console.log(formState.date1);
    if (!formState.date1) {
        message['error']('省市地区不能为空');
        return;
    }
    let params = {
        FullName: formState.username, //昵称
        Address: formState.region,
        BankName: formState.bankNmae,
        Sheng: formState.date1[0],
        Shi: formState.date1[1],
        Branch: formState.tel,
        Card: formState.phone,
        Memo: formState.text,
        Default: '0'
    };
    try {
        let res = await addUserBankInfo(params);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="bank-information">
        <div class="card-box">
            <div class="title">银行账号</div>
            <a-table :pagination="false" :columns="columns" :data-source="tableDataList">
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
                            <span
                                @click="
                                    openChangeParamsModel(
                                        '修改银行账户信息',
                                        record.Id,
                                        record.Default
                                    )
                                "
                                >修改</span
                            >
                            <span @click="openModel('确定删除该银行信息吗', record.Id)">删除</span>
                            <span
                                @click="changeDefault(record.Id)"
                                :class="record.Default ? 'active' : ''"
                                >{{ record.Default ? '默认账号' : '设为默认' }}
                            </span>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
        <div class="card-box">
            <div class="title">新增银行账号</div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    :model="formState"
                    name="basicsss"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 10 }"
                    autocomplete="off"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                >
                    <a-form-item
                        :rules="[{ required: true, message: '姓名不能为空' }]"
                        label="姓名"
                        name="username"
                    >
                        <a-input v-model:value.trim="formState.username" />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '国家不能为空' }]"
                        label="国家地区"
                    >
                        <a-select
                            v-model:value="formState.region"
                            show-search
                            :options="countryList"
                            @change="handleChange"
                        ></a-select>
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '省市不能为空' }]"
                        label="省市地址"
                        name="username"
                    >
                        <a-cascader
                            expand-trigger="hover"
                            v-model:value="formState.date1"
                            :options="formState.statusList"
                        />
                    </a-form-item>

                    <a-form-item
                        :rules="[{ required: true, message: '银行名称不能为空' }]"
                        label="银行名称"
                        name="bankNmae"
                    >
                        <a-input v-model:value="formState.bankNmae" />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '分行支行' }]"
                        label="'分行支行"
                        name="tel"
                    >
                        <a-input v-model:value="formState.tel" />
                    </a-form-item>
                    <a-form-item
                        :rules="[
                            { required: true, message: '银行卡号不能为空' },
                            { pattern: /^[0-9]{13,19}$/, message: '银行卡号格式不正确' }
                        ]"
                        label="银行卡号"
                        name="phone"
                    >
                        <a-input v-model:value="formState.phone" />
                    </a-form-item>

                    <a-form-item label="备注信息">
                        <a-textarea
                            v-model:value="formState.text"
                            :auto-size="{ minRows: 2, maxRows: 5 }"
                        />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 3, span: 10 }">
                        <a-button type="primary" html-type="submit">保存</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <RemoveTableList
            @closeModel="closeModel"
            @postApi="postAPi"
            :params="params"
            :changeParams="changeParams"
            @changeApi="changeApi"
        ></RemoveTableList>
    </div>
</template>

<style scoped lang="less">
.bank-information {
    width: 100%;
    .flex-col;
    gap: 30px;

    .status {
        .flex-row;
        justify-content: space-around;

        span {
            padding: 5px 10px;
            cursor: pointer;

            &.active {
                background-color: #9a0000;
                color: #fff;
            }
        }
    }

    .form-wrap {
        padding: 40px 30px 20px 40px;
    }
}
</style>
