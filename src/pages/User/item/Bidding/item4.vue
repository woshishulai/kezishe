<script setup>
import Header from './Header.vue';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ZhiFuApi, getZhifuInfo } from '@/request/user/api';
import { encryptionPassword } from '@/hooks/user';
import { usePassword } from '@/store/store';
import { info } from '@/hooks/antd/message';
import { getCodeParams } from '@/request/api';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const emits = defineEmits(['changeShowPage']);
const infos = ref({});
const newCodeParams = usePassword();
const ipt = ref('');
onMounted(async () => {
    try {
        await getZhiFuDetails();
    } catch (error) {}
    //状态过期就重新更新
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
const getZhiFuDetails = async () => {
    try {
        let res = await getZhifuInfo();
        infos.value = res.Data;
    } catch (error) {}
};
const submit = async () => {
    if (!ipt.value || ipt.value.length < 6) {
        info('error', '请输入正确格式的密码');
        return;
    }
    const pas = {
        PayPwd: ipt.value
    };
    let querys = encryptionPassword(pas, newCodeParams.codePasswords.PublicKey);
    const query = {
        OrderNo: localStorage.getItem('orderId'),
        AllTotal: localStorage.getItem('allPrice'),
        PayPwd: querys.PayPwd
    };
    try {
        let res = await ZhiFuApi(query);
        if (res.Tag == 1) {
            localStorage.removeItem('checkedStatus');
            localStorage.removeItem('kuaidis');
            localStorage.removeItem('zhifus');
            localStorage.removeItem('baojias');
            localStorage.removeItem('iptValues');
            localStorage.removeItem('quans');
            localStorage.removeItem('quanLists');
            localStorage.removeItem('DelLists');
            emits('changeShowPage', 1);
        } else if (res.Message == '未设置支付密码，请先设置支付密码') {
            showChangePasswordBtn.value = true;
        }
        console.log(res);
    } catch (error) {}
};
const deletes = () => {
    emits('changeShowPage', 1);
};
const showChangePasswordBtn = ref(false);
const changePassword = () => {
    localStorage.setItem('item4', 4);
    router.push('/user/account-management/change-password');
};
</script>

<template>
    <div class="bank">
        <Header num="2"></Header>
        <div class="cen-wrap">
            <p>账户余额:{{ infos.Balance }}</p>
            <a-input-password
                type="password"
                v-model:value="ipt"
                @keydown.enter="submit"
                placeholder="请输入支付密码"
            />
            <a-button type="primary" @click="submit">支付</a-button>
            <a-button type="primary" @click="deletes">返回订单页</a-button>
            <a-button v-show="showChangePasswordBtn" type="primary" @click="changePassword"
                >修改密码</a-button
            >
        </div>
    </div>
</template>

<style scoped lang="less">
.bank {
    min-height: 600px;
    padding: 20px 16px;
    background-color: #fff;
    .cen-wrap {
        width: 750px;
        margin: 30px auto;
        .flex-row;
        gap: 30px;

        .ant-input-password {
            width: 300px;
        }
        .ant-btn {
            flex: 1;
        }
    }
}
</style>
