<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
    getUserAddressApi,
    removeUserAddressApi,
    changeUserAddressInfo,
    defaultUserAddressInfo,
    addUserAddressInfo,
    getCountList
} from '@/request/api';
import { info } from '@/hooks/antd/message';
import RemoveTableList from './item/RemoveTableList.vue';
import { shippingColumns } from '../../data';
import { handleFinishFailed } from '@/utils/form/rules.js';
import { message } from 'ant-design-vue';
import { useUserInfo } from '@/store/store';
import localeValues from 'ant-design-vue/es/locale/zh_CN';
const countList = ref([]);
const user = useUserInfo();
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
    username: '',
    region: '中国',
    statusList: [], //省市数据
    date1: undefined, //选择的省市
    text: '', //详细地址
    bankNmae: '', //邮编
    tel: '', //电话
    phone: '',
    AreaType: ''
});
onMounted(async () => {
    try {
        let res = await getUserAddressApi();
        if (res.Tag !== 1) {
            return;
        }
        address.value = res.Data;
        res = null;
        if (address.value.length >= 1) {
            const item = address.value.find((item) => item.Default == 1);
            if (item) {
                user.changeUserAddress(item);
            } else {
                user.changeUserAddress(address.value[0]);
            }
        } else {
            user.removeUserAddress();
        }
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
const addId = (e, value) => {
    console.log(localeValues);
    formState.AreaType = value[0].AreaType;
    changeParams.AreaType = value[0].AreaType;
};
const openModel = (biaoti, id) => {
    params.open = true;
    params.title = biaoti;
    params.id = id;
};
const openChangeParamsModel = (biaoti, item) => {
    console.log(item);
    changeParams.id = item.Id;
    changeParams.username = item.NickName;
    changeParams.region = item.State;
    changeParams.date1 = [item.Sheng, item.Shi];
    changeParams.text = item.Address;
    changeParams.Postal = item.Postal;
    changeParams.tel = item.Tel;
    changeParams.phone = item.Phone;
    changeParams.title = biaoti;
    changeParams.default = item.Default;
    changeParams.AreaType = item.AreaType;
    changeParams.open = true;
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
    if (res.Tag == 1) {
        const index = address.value.findIndex((item) => item.Id === params.id);
        address.value.splice(index, 1);
        if (user.userAddress.Id == params.id) {
            if (address.value.length >= 1) {
                user.changeUserAddress(address.value[0]);
            } else {
                user.changeUserAddress();
            }
        }
        closeModel();
    }
};
const changeDefault = async (id) => {
    let res = await defaultUserAddressInfo(id);
    if (res.Tag === 1) {
        const item = address.value.find((item) => item.Id === id);
        address.value.forEach((addressItem) => (addressItem.Default = 0));
        item.Default = 1;
    }
};
const handleChange = (value, option) => {
    formState.region = value;
    formState.statusList = option.ChildList;
    formState.date1 = [];
};
const handleChanges = (value, option) => {
    changeParams.region = value;
    changeParams.statusList = option.ChildList;
    changeParams.date1 = [];
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
        AreaType: formState.AreaType,
        Default: '0'
    };
    try {
        let res = await addUserAddressInfo(params);
        params.Id = res.Data;
        if (res.Tag === 1) {
            address.value.push(params);
            formState.username = '';
            // formState.region = '';
            formState.bankNmae = '';
            formState.tel = '';
            formState.phone = '';
            formState.text = '';
            formState.date1 = [];
            info('success', res.Message);
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
        NickName: changeParams.username, //昵称
        State: changeParams.region, //国家
        Sheng: changeParams.date1[0], //省市
        Shi: changeParams.date1[1], //省市
        Address: changeParams.text,
        Postal: changeParams.Postal,
        Tel: changeParams.tel,
        Phone: changeParams.phone,
        AreaType: changeParams.AreaType,
        Default: changeParams.default
    };
    try {
        let res = await changeUserAddressInfo(params);
        let status;
        if (res.Tag == 1) {
            status = 'success';
            const index = address.value.findIndex((item) => item.Id === params.Id);
            address.value.splice(index, 1, params);
            if (address.value.length >= 1) {
                user.changeUserAddress(address.value[0]);
            } else {
                user.changeUserAddress();
            }
            info(status, res.Message);
            closeModel();
        }
    } catch (error) {
        info('error', error);
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
                            <span @click="openChangeParamsModel('修改地址', record)">修改</span>
                            <span @click="openModel('确定删除该地址吗', record.Id)">删除</span>
                            <span
                                @click="changeDefault(record.Id)"
                                :class="record.Default == 1 ? 'active' : ''"
                                >{{ record.Default == 1 ? '默认账号' : '设为默认' }}
                            </span>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
        <div class="card-box">
            <div class="title" style="font-size: 16px">新增快递收货地址信息</div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    :model="formState"
                    name="basicsss"
                    style="width: 771px"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 10 }"
                    autocomplete="off"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                    :hide-required-mark="true"
                >
                    <a-form-item
                        :rules="[{ required: true, message: '姓名不能为空' }]"
                        label="姓名"
                        name="username"
                    >
                        <a-input style="width: 240px" v-model:value.trim="formState.username" />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '国家不能为空' }]"
                        label="所在地区"
                    >
                        <a-select
                            :field-names="{
                                label: 'AreaName',
                                value: 'AreaName'
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
                        name="date1"
                    >
                        <a-cascader
                            :field-names="{
                                label: 'AreaName',
                                value: 'AreaName',
                                children: 'ChildList'
                            }"
                            expand-trigger="hover"
                            @change="addId"
                            v-model:value="formState.date1"
                            :options="formState.statusList"
                        />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '详细地址不能为空' }]"
                        label="详细地址"
                        name="text"
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
                        label="收货手机号"
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
                    <a-form-item :wrapper-col="{ offset: 3 }">
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
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
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
                    label="所在地区"
                >
                    <a-select
                        :field-names="{
                            label: 'AreaName',
                            value: 'AreaName'
                        }"
                        v-model:value="changeParams.region"
                        show-search
                        :options="countList"
                        @change="handleChanges"
                    ></a-select>
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '省市不能为空' }]"
                    label="省市地址"
                    name="date1"
                >
                    <a-cascader
                        :field-names="{
                            label: 'AreaName',
                            value: 'AreaName',
                            children: 'ChildList'
                        }"
                        @change="addId"
                        expand-trigger="hover"
                        v-model:value="changeParams.date1"
                        :options="formState.statusList"
                    />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '详细地址不能为空' }]"
                    label="详细地址"
                    name="text"
                >
                    <a-textarea
                        v-model:value="changeParams.text"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                    />
                </a-form-item>
                <a-form-item
                    :rules="[
                        { required: true, message: '邮编不能为空' },
                        { pattern: /^[0-9]{6}$/, message: '邮编格式不正确' }
                    ]"
                    label="邮编"
                    name="Postal"
                >
                    <a-input v-model:value="changeParams.Postal" />
                </a-form-item>
                <a-form-item
                    :rules="[
                        { required: true, message: '收货手机号不能为空' },
                        { pattern: /^[0-9]{11}$/, message: '手机号格式不正确' }
                    ]"
                    label="收货手机号"
                    name="tel"
                >
                    <a-input v-model:value="changeParams.tel" />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '联系电话不能为空' }]"
                    label="联系电话"
                    name="phone"
                >
                    <a-input v-model:value="changeParams.phone" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 6, span: 3 }">
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
            width: 94px;
            height: 32px;
            &.active {
                border-width: 1px;
                border-color: rgb(154, 0, 0);
                border-style: solid;
                border-radius: 4px;
                background-color: rgb(227, 61, 52);
                color: #fff;
            }
        }
    }
    .form-wrap {
        padding: 25px 30px 20px 32px;
        .ant-input {
            border-width: 1px;
            border-style: solid;
            border-radius: 4px;
            border-color: rgb(218, 225, 232);
            height: 43px;
            background-color: rgb(255, 255, 255);
        }
        .ant-btn {
            width: 100px;
            height: 43px;
            border-radius: 4px;
        }
    }
}
</style>
