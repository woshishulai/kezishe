<script setup>
import Header from './Header.vue';
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
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
const AllTotal = localStorage.getItem('allPrice');
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
            deletes();
        } else if (res.Message == '未设置支付密码，请先设置支付密码') {
            showChangePasswordBtn.value = true;
        }
    } catch (error) {}
};
const deletes = () => {
    route.query.wuliu ? router.push('/user/logistics/') : emits('changeShowPage', 1);
};
const showChangePasswordBtn = ref(false);
const changePassword = () => {
    localStorage.setItem('item4', 4);
    router.push('/user/account-management/change-password');
};
const showItem = ref(1);
const changeShowItem = (index) => {
    showItem.value = index;
};
</script>

<template>
    <div class="bank">
        <Header num="2"></Header>

        <div class="cen-wrap">
            <div class="element-item">
                <div class="text-item"> 应付金额 </div>
                <p class="label"
                    >¥<span class="price">{{ AllTotal ? AllTotal : '' }}</span
                    >元(含运费)</p
                >
            </div>
            <div class="element-item">
                <div class="text-item"> 支付方式 </div>
                <div class="details">账户余额</div>
                <div class="flexs" :class="showChangePasswordBtn ? 'active' : ''">
                    <p
                        class="labels"
                        @click="changeShowItem(1)"
                        :class="showItem == 1 ? 'active' : ''"
                    >
                        <img class="logo" src="@/assets/img/global/logo.png" alt="" />
                        <span class="price">{{ infos.Balance }}</span>
                    </p>
                    <a-input-password
                        v-show="showItem == 1"
                        type="password"
                        v-model:value="ipt"
                        @keydown.enter="submit"
                        placeholder="请输入支付密码"
                    />
                    <a-button v-show="showItem == 1" type="primary" @click="submit">支付</a-button>
                    <a-button v-show="showItem == 1" class="goback" @click="deletes"
                        >返回订单页</a-button
                    >
                    <a-button v-show="showChangePasswordBtn" class="goback" @click="changePassword"
                        >修改密码</a-button
                    >
                </div>
                <div class="details">其他方式</div>
                <div class="flexs" :class="showChangePasswordBtn ? 'active' : ''">
                    <div class="item">
                        <div
                            class="img-item"
                            @click="changeShowItem(2)"
                            :class="showItem == 2 ? 'active' : ''"
                        >
                            <img src="@/assets/img/user/jingmai/icon9.svg" alt="" />
                            支付宝支付
                        </div>
                        <img src="@/assets/img/user/jingmai/code.png" alt="" />
                    </div>

                    <div class="item">
                        <div
                            class="img-item"
                            @click="changeShowItem(3)"
                            :class="showItem == 3 ? 'active' : ''"
                        >
                            <img src="@/assets/img/user/jingmai/icon10.svg" alt="" />
                            微信支付
                        </div>
                        <img src="@/assets/img/user/jingmai/code.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.bank {
    min-height: 700px;
    padding: 20px 16px;
    background-color: #fff;
    .cen-wrap {
        width: 750px;
        margin: 0 auto;
        .element-item {
            padding: 30px 0;
            border-bottom: 1px solid #ebebeb;
            .text-item {
                font-size: 20px;
            }
            .details {
                color: #808080;
                margin: 20px 0 0 30px;
            }
            .label {
                margin: 20px 0 0 30px;

                .price {
                    font-size: 26px;
                    color: #9a0000;
                }
            }
            .labels {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 200px;
                padding: 10px 5px;
                height: 48px;
                cursor: pointer;
                &.active {
                    border: 1px solid #9a0000;
                }
                .logo {
                    height: 26px;
                }
                .price {
                    color: #9a0000;
                }
            }
            .flexs {
                display: flex;
                align-items: center;
                gap: 20px;
                margin: 20px 0 0 30px;
                &.active {
                    gap: 15px;
                    .ant-input-password {
                        width: 200px;
                    }
                }
                .item {
                    text-align: center;
                }
                .img-item {
                    width: 200px;
                    padding: 10px 0;
                    cursor: pointer;
                    height: 48px;
                    margin-bottom: 20px;
                    .flex-row;
                    gap: 5px;
                    &.active {
                        border: 1px solid #9a0000;
                    }

                    cursor: pointer;
                    img {
                        height: 20px;
                    }
                }
            }

            .ant-input-password {
                width: 200px;
            }
            .ant-btn {
                flex: 1;
            }
            .goback {
                background-color: #808080;
                color: #fff;
            }
        }
    }
}
</style>
