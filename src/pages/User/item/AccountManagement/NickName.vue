<script setup>
import { ref, reactive, onMounted, onActivated } from 'vue';
import {
    getUserNikeNameApi,
    removeNickNameApi,
    changeUserNickName,
    addUserNickName,
    defaultUserNickName
} from '@/request/api';
import { info } from '@/hooks/antd/message';
import RemoveTableList from './item/RemoveTableList.vue';
import { handleFinishFailed } from '@/utils/form/rules.js';
import { message } from 'ant-design-vue';
import { useUserInfo } from '@/store/store';
const user = useUserInfo();
const shippingColumns = [
    {
        title: '昵称',
        dataIndex: 'NickName',
        key: 'NickName',
        align: 'center'
    },
    {
        title: '备注信息',
        dataIndex: 'Memo',
        key: 'Memo',
        align: 'center'
    },
    {
        title: '',
        dataIndex: 'status',
        key: 'status',
        align: 'center'
    }
];
const getUserNikeNameList = async () => {
    try {
        let res = await getUserNikeNameApi();
        if (res.Tag == 1) {
            nikeNameList.value = res.Data;
        } else {
            info('error', res.Message);
        }
    } catch (error) {
        info('error', error);
    }
};
const nikeNameList = ref([]);
onMounted(async () => {
    getUserNikeNameList();
});

onActivated(() => {
    if (!nikeNameList.value.length) {
        return;
    }
    const userDefaultAddressId = user.userNickName.Id;
    const index = nikeNameList.value.findIndex((item) => item.Default == 1);
    if (nikeNameList.value[index].Id != userDefaultAddressId) {
        getUserNikeNameList();
    }
});
const params = reactive({
    open: false, //是否打开弹窗
    title: '', //标题
    id: '' //数组的某一项
});
const openModel = (biaoti, id) => {
    params.open = true;
    params.title = biaoti;
    params.id = id;
};
const postAPi = async () => {
    let res = await removeNickNameApi(params.id);
    let status;
    if (res.Tag == 1) {
        status = 'success';
        const index = nikeNameList.value.findIndex((item) => item.Id === params.id);
        nikeNameList.value.splice(index, 1);
        info(status, res.Message);
        closeModel();
    } else {
        status = 'error';
        info(status, res.Message);
    }
};
const closeModel = () => {
    params.open = false;
    params.title = '';
    params.id = '';
    changeParams.open = false;
    changeParams.title = '';
    changeParams.id = '';
};
const changeParams = reactive({
    open: false, //是否打开弹窗
    title: '', //标题
    id: '', //数组的某一项
    default: '',
    labels: {
        one: '昵称',
        two: '备注'
    }
});
const openChangeParamsModel = (biaoti, item) => {
    changeParams.title = biaoti;
    changeParams.id = item.Id;
    changeParams.default = item.Default;
    changeParams.country = item.Memo;
    changeParams.username = item.NickName;
    changeParams.open = true;
};
const changeApi = async (query) => {
    let params = {
        Id: changeParams.id,
        NickName: query.username,
        Memo: query.country,
        Default: changeParams.default
    };
    try {
        let res = await changeUserNickName(params);
        let status;
        if (res.Tag == 1) {
            status = 'success';
            const index = nikeNameList.value.findIndex((item) => item.Id === params.Id);
            nikeNameList.value[index].NickName = params.NickName;
            nikeNameList.value[index].Memo = params.Memo;
            info(status, res.Message);
            closeModel();
        } else {
            status = 'error';
            info(status, res.Message);
        }
    } catch (error) {}
};

const formState = reactive({
    username: '',
    text: '' //详细地址
});
const handleFinish = async () => {
    let params = {
        NickName: formState.username,
        Memo: formState.text,
        Default: '0'
    };
    let isDuplicate = nikeNameList.value.some((item) => item.NickName === params.NickName);
    if (isDuplicate) {
        info('error', '该昵称已存在');
        return;
    }
    try {
        let res = await addUserNickName(params);
        res.Tag == 1
            ? Object.keys(formState).forEach((key) => {
                  formState[key] = '';
              })
            : '';
        info('success', res.Message);
        params.Id = res.Data;
        nikeNameList.value.push(params);
        Object.keys(formState).forEach((key) => {
            formState[key] = '';
        });
    } catch (error) {
        info('error', error);
    }
};
const changeDefault = async (query) => {
    if (query.Default) {
        return;
    }
    let res = await defaultUserNickName(query.Id);
    if (res.Tag === 1) {
        user.changeUserNickName(query);
        const item = nikeNameList.value.find((item) => item.Id === query.Id);
        nikeNameList.value.forEach((addressItem) => (addressItem.Default = 0));
        item.Default = 1;
    }
};
</script>

<template>
    <div class="bank-information">
        <div class="card-box">
            <div class="title">个人昵称</div>
            <a-table :pagination="false" :columns="shippingColumns" :data-source="nikeNameList">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status'">
                        <div class="status">
                            <span @click="openChangeParamsModel('修改昵称', record)">修改</span>
                            <span @click="openModel('确定删除该昵称吗', record.Id)">删除</span>
                            <span
                                @click="changeDefault(record)"
                                :class="record.Default == 1 ? 'active' : ''"
                            >
                                {{ record.Default == 1 ? '默认账号' : '设为默认' }}
                            </span>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
        <div class="card-box">
            <div class="title" style="font-size: 16px">新增个人昵称</div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    :model="formState"
                    name="basicsss"
                    :label-col="{ span: 2 }"
                    :wrapper-col="{ span: 10 }"
                    autocomplete="off"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                    :hide-required-mark="true"
                >
                    <a-form-item
                        :rules="[{ required: true, message: '昵称不能为空' }]"
                        label="昵称"
                        name="username"
                    >
                        <a-input style="width: 240px" v-model:value.trim="formState.username" />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '备注不能为空' }]"
                        label="备注"
                        name="text"
                    >
                        <a-textarea
                            style="width: 300px"
                            v-model:value="formState.text"
                            :auto-size="{ minRows: 2, maxRows: 5 }"
                        />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 2, span: 3 }">
                        <a-button type="primary" html-type="submit">保存</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <RemoveTableList
            @postApi="postAPi"
            @changeApi="changeApi"
            :params="params"
            :changeParams="changeParams"
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
    }
}
</style>
