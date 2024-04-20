<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import {
    getUserBankInfo,
    removeUserBankApi,
    changeUserBankInfo,
    defaultUserBankInfo,
    addUserBankInfo,
    getCountList
} from '@/request/api';
import { info } from '@/hooks/antd/message';
import { message } from 'ant-design-vue';
import RemoveTableList from './item/RemoveTableList.vue';
import { handleFinishFailed } from '@/utils/form/rules.js';
const countList = ref([]);
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
    default: ''
});
onMounted(async () => {
    try {
        const res = await getUserBankInfo();
        if (res.Tag !== 1) {
            return;
        }
        tableDataList.value = res.Data;
        const ress = await getCountList();
        if (ress.Tag !== 1) {
            info('error', ress.Message);
            return;
        }
        countList.value = ress.Data;
        formState.region = countList.value[0].AreaName;
        formState.statusList = countList.value[0].ChildList;
    } catch (error) {
        info('error', error);
    }
});
const formState = reactive({
    username: '',
    region: '',
    statusList: [], //省市数据
    date1: undefined, //选择的省市
    text: '', //备注信息
    bankNmae: '', //银行名称
    tel: '', //分行支行
    phone: '' //银行卡号
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
const openChangeParamsModel = (biaoti, item) => {
    changeParams.title = biaoti;
    changeParams.id = item.Id;
    changeParams.username = item.FullName; //姓名
    changeParams.region = item.Address; //国家
    changeParams.date1 = [item.Sheng, item.Shi]; //省
    changeParams.bankNmae = item.BankName; //银行名称
    changeParams.tel = item.Branch; //支行
    changeParams.phone = item.Card; //卡号
    changeParams.text = item.Memo;
    changeParams.default = item.Default;
    changeParams.open = true;
};
const closeModel = () => {
    changeParams.open = false;
    changeParams.title = '';
    changeParams.id = '';
    params.open = false;
    params.title = '';
    params.id = '';
};
const postAPi = async () => {
    let res = await removeUserBankApi(params.id);
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
    let status;
    if (res.Tag == 1) {
        status = 'success';
        const index = tableDataList.value.findIndex((item) => item.Id === params.Id);
        tableDataList.value.splice(index, 1, params);
        info(status, res.Message);
        closeModel();
    } else {
        status = 'error';
        info(status, res.Message);
    }
};
const changeDefault = async (id) => {
    let res = await defaultUserBankInfo(id);
    if (res.Tag === 1) {
        const item = tableDataList.value.find((item) => item.Id === id);
        tableDataList.value.forEach((addressItem) => (addressItem.Default = 0));
        item.Default = 1;
    }
};
// const statusList = (country) => {
//     const defaultCountry = country || 'CHN';
//     const getStatusList = (countryCode) => {
//         const provinces = data[countryCode];
//         if (!provinces) {
//             console.error(`Invalid country code: ${countryCode}`);
//             return [];
//         }

//         return Object.entries(provinces).map(([provinceCode, provinceName]) => {
//             const cities = data[provinceCode];

//             return {
//                 value: provinceName,
//                 label: provinceName,
//                 ChildList: cities
//                     ? Object.entries(cities).map(([cityCode, cityName]) => ({
//                           value: cityName,
//                           label: cityName
//                       }))
//                     : []
//             };
//         });
//     };
//     formState.statusList = getStatusList(defaultCountry);
//     return getStatusList(defaultCountry);
// };
const handleChange = (value, option) => {
    console.log(value);
    formState.region = value;
    formState.date1 = option.ChildList;
};
const handleFinish = async () => {
    if (!formState.date1) {
        info('error', '信息请填写完整');
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
        params.Id = res.Data;
        if (res.Tag == 1) {
            tableDataList.value.push(params);
            formState.username = '';
            formState.region = '';
            formState.bankNmae = '';
            formState.tel = '';
            formState.phone = '';
            formState.text = '';
        }
    } catch (error) {
        info('error', error);
    }
};
const handleFinishs = async () => {
    if (!changeParams.date1) {
        info('error', '信息请填写完整');
        return;
    }
    let params = {
        Id: changeParams.id,
        FullName: changeParams.username, //昵称
        Address: changeParams.region,
        BankName: changeParams.bankNmae,
        Sheng: changeParams.date1[0],
        Shi: changeParams.date1[1],
        Branch: changeParams.tel,
        Card: changeParams.phone,
        Memo: changeParams.text,
        Default: changeParams.default
    };
    try {
        let res = await changeUserBankInfo(params);
        if (res.Tag == 1) {
            changeParams.open = false;
            const index = tableDataList.value.findIndex((item) => item.Id === params.Id);
            tableDataList.value.splice(index, 1, params);
        }
    } catch (error) {
        info('error', error);
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
                            <span @click="openChangeParamsModel('修改银行账户信息', record)"
                                >修改</span
                            >
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
                            :field-names="{
                                label: 'AreaName',
                                value: 'AreaName',
                                options: 'ChildList'
                            }"
                            v-model:value="formState.region"
                            show-search
                            :options="countList"
                            @change="handleChange"
                        ></a-select>
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '省市不能为空' }]"
                        label="省市地址"
                        name="username"
                    >
                        <a-cascader
                            :field-names="{
                                label: 'AreaName',
                                value: 'AreaName',
                                children: 'ChildList'
                            }"
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
        <a-modal :title="changeParams.title" :footer="null" v-model:open="changeParams.open">
            <a-form
                labelAlign="left"
                :model="changeParams"
                name="basicsss"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                autocomplete="off"
                @finish="handleFinishs"
                @finishFailed="handleFinishFailed"
            >
                <a-form-item
                    :rules="[{ required: true, message: '姓名不能为空' }]"
                    label="姓名"
                    name="username"
                >
                    <a-input v-model:value.trim="changeParams.username" />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '国家不能为空' }]"
                    label="国家地区"
                >
                    <a-select
                        :field-names="{
                            label: 'AreaName',
                            value: 'AreaName',
                            options: 'ChildList'
                        }"
                        v-model:value="changeParams.region"
                        show-search
                        :options="countList"
                        @change="handleChange"
                    ></a-select>
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '省市不能为空' }]"
                    label="省市地址"
                    name="username"
                >
                    <a-cascader
                        :field-names="{
                            label: 'AreaName',
                            value: 'AreaName',
                            children: 'ChildList'
                        }"
                        expand-trigger="hover"
                        v-model:value="changeParams.date1"
                        :options="formState.statusList"
                    />
                </a-form-item>

                <a-form-item
                    :rules="[{ required: true, message: '银行名称不能为空' }]"
                    label="银行名称"
                    name="bankNmae"
                >
                    <a-input v-model:value="changeParams.bankNmae" />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '分行支行' }]"
                    label="'分行支行"
                    name="tel"
                >
                    <a-input v-model:value="changeParams.tel" />
                </a-form-item>
                <a-form-item
                    :rules="[
                        { required: true, message: '银行卡号不能为空' },
                        { pattern: /^[0-9]{13,19}$/, message: '银行卡号格式不正确' }
                    ]"
                    label="银行卡号"
                    name="phone"
                >
                    <a-input v-model:value="changeParams.phone" />
                </a-form-item>

                <a-form-item label="备注信息">
                    <a-textarea
                        v-model:value="changeParams.text"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                    />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 5, span: 19 }">
                    <a-button type="primary" html-type="submit">保存</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
        <RemoveTableList
            @closeModel="closeModel"
            @postApi="postAPi"
            :params="params"
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
