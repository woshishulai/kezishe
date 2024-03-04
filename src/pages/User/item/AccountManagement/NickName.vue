<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
    getUserNikeNameApi,
    removeNickNameApi,
    changeUserNickName,
    addUserNickName,
    defaultUserNickName
} from '@/request/api';
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
const nikeNameList = ref([]);
onMounted(async () => {
    let res = await getUserNikeNameApi();
    nikeNameList.value = res.Data;
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
    if (res.Tag == 1) {
        const index = nikeNameList.value.findIndex((item) => item.Id === params.id);
        nikeNameList.value.splice(index, 1);
        closeModel();
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
const openChangeParamsModel = (biaoti, id, Default) => {
    changeParams.open = true;
    changeParams.title = biaoti;
    changeParams.id = id;
    changeParams.default = Default;
};
const changeApi = async (query) => {
    console.log(query);
    let params = {
        Id: changeParams.id,
        NickName: query.username,
        Memo: query.country,
        Default: changeParams.default
    };
    let res = await changeUserNickName(params);
};

const formState = reactive({
    username: '测试的昵称',
    text: '我是用来测试的昵称' //详细地址
});
const handleFinish = async () => {
    let params = {
        NickName: formState.username,
        Memo: formState.text,
        Default: '0'
    };
    let isDuplicate = nikeNameList.value.some((item) => item.NickName === params.NickName);
    if (isDuplicate) {
        message['error']('已经存在该昵称');
        return;
    }
    try {
        let res = await addUserNickName(params);
        res.Tag == 1
            ? Object.keys(formState).forEach((key) => {
                  formState[key] = '';
              })
            : '';
    } catch (error) {
        console.log(error);
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
                            <span
                                @click="
                                    openChangeParamsModel('修改昵称', record.Id, record.Default)
                                "
                                >修改</span
                            >
                            <span @click="openModel('确定删除该昵称吗', record.Id)">删除</span>
                            <span
                                @click="changeDefault(record)"
                                :class="record.Default ? 'active' : ''"
                                >{{ record.Default ? '默认账号' : '设为默认' }}
                            </span>
                        </div>
                    </template>
                </template>
            </a-table>
        </div>
        <div class="card-box">
            <div class="title">新增个人昵称</div>
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
                        :rules="[{ required: true, message: '昵称不能为空' }]"
                        label="昵称"
                        name="username"
                    >
                        <a-input v-model:value.trim="formState.username" />
                    </a-form-item>
                    <a-form-item
                        :rules="[{ required: true, message: '备注不能为空' }]"
                        label="备注"
                        name="username"
                    >
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
