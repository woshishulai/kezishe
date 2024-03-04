<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
    getUserAddressApi,
    removeUserAddressApi,
    changeUserAddressInfo,
    defaultUserAddressInfo,
    addUserAddressInfo
} from '@/request/api';
import RemoveTableList from './item/RemoveTableList.vue';
import { shippingColumns } from '../../data';
import { countryList } from '@/utils/user/country';
import { data } from '@/utils/user/data';
import { handleFinishFailed } from '@/utils/form/rules.js';
import { message } from 'ant-design-vue';
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
        there: '省',
        four: '市',
        five: '详细地址',
        six: '邮政编码',
        senven: '收货电话',
        enigh: '联系电话'
    }
});
const address = ref([]);
const formState = reactive({
    username: 'eeeeee',
    region: '中国',
    statusList: [], //省市数据
    date1: undefined, //选择的省市
    text: 'eeee', //详细地址
    bankNmae: '333333', //邮编
    tel: '17633732594', //电话
    phone: '17633732594'
});
onMounted(async () => {
    statusList();
    let res = await getUserAddressApi();
    address.value = res.Data;
});
const openModel = (biaoti, id) => {
    params.open = true;
    params.title = biaoti;
    params.id = id;
};
const openChangeParamsModel = (biaoti, id, Default) => {
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
    let res = await removeUserAddressApi(params.id);
    const index = address.value.findIndex((item) => item.Id === params.id);
    address.value.splice(index, 1);
    closeModel();
};
const changeApi = async (query) => {
    let params = {
        Id: changeParams.id,
        NickName: query.username,
        State: query.country,
        Sheng: query.status,
        Shi: query.shi,
        Address: query.text,
        Postal: query.postal,
        Tel: query.tel,
        Phone: query.phone,
        Default: changeParams.default
    };
    let res = await changeUserAddressInfo(params);
};
const changeDefault = async (id) => {
    let res = await defaultUserAddressInfo(id);
    if (res.Tag === 1) {
        const item = address.value.find((item) => item.Id === id);
        address.value.forEach((addressItem) => (addressItem.Default = 0));
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
    if (!formState.date1) {
        message['error']('省市地区不能为空');
        return;
    }
    let params = {
        NickName: formState.username, //昵称
        State: formState.region,
        Sheng: formState.date1[0],
        Shi: formState.date1[1],
        Address: formState.text,
        Postal: formState.bankNmae,
        Tel: formState.tel,
        Phone: formState.phone,
        Default: '0'
    };
    try {
        let res = await addUserAddressInfo(params);
        if (res.Tag === 1) {
            Object.keys(formState).forEach((key) => {
                formState[key] = '';
            });
        }
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
</script>

<template>
    <div class="bank-information">
        <div class="card-box">
            <div class="title">快递信息</div>
            <a-table :pagination="false" :columns="shippingColumns" :data-source="address">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Address'">
                        <div class="address">
                            <span> {{ record.State + record.Sheng }}</span>
                            <span>&nbsp;&nbsp;</span>
                            <span> {{ record.Shi }}</span>
                        </div>
                    </template>
                    <template v-if="column.key === 'AddressDetails'">
                        <div class="address-details">
                            <span> {{ record.Address }}</span>
                        </div>
                    </template>
                    <template v-if="column.key === 'Tel'">
                        <div class="tel">
                            <span v-if="record.Tel"> {{ record.Tel }}</span>
                            <span v-else> {{ record.Phone }}</span>
                        </div>
                    </template>
                    <template v-if="column.key === 'status'">
                        <div class="status">
                            <span
                                @click="
                                    openChangeParamsModel('修改地址', record.Id, record.Default)
                                "
                                >修改</span
                            >
                            <span @click="openModel('确定删除该地址吗', record.Id)">删除</span>
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
            <div class="title">新增快递收货地址信息</div>
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
                        label="所在地区"
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
                        :rules="[{ required: true, message: '详细地址不能为空' }]"
                        label="详细地址"
                        name="username"
                    >
                        <a-textarea
                            v-model:value="formState.text"
                            :auto-size="{ minRows: 2, maxRows: 5 }"
                        />
                    </a-form-item>
                    <a-form-item
                        :rules="[
                            { required: true, message: '邮编不能为空' },
                            { pattern: /^[0-9]{6}$/, message: '邮编格式不正确' }
                        ]"
                        label="邮编"
                        name="bankNmae"
                    >
                        <a-input v-model:value="formState.bankNmae" />
                    </a-form-item>
                    <a-form-item
                        :rules="[
                            { required: true, message: '收货手机号不能为空' },
                            { pattern: /^[0-9]{11}$/, message: '手机号格式不正确' }
                        ]"
                        label="'收货手机号"
                        name="tel"
                    >
                        <a-input v-model:value="formState.tel" />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '联系电话不能为空' }]"
                        label="联系电话"
                        name="phone"
                    >
                        <a-input v-model:value="formState.phone" />
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
