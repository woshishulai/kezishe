<script setup>
import Header from './Header.vue';
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ZhiFuApi, getZhifuInfo } from '@/request/user/api';
import { encryptionPassword } from '@/hooks/user';
import { usePassword } from '@/store/store';
import { info } from '@/hooks/antd/message';
import { getCodeParams } from '@/request/api';
import { getImageUrl } from '@/utils/index';
const router = useRouter();
const route = useRoute();
const props = defineProps(['AllTotal']);
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
        OrderNo: route.query?.orderId,
        AllTotal: route.query?.AllTotal,
        PayPwd: querys.PayPwd
    };
    try {
        let res = await ZhiFuApi(query);
        if (res.Tag == 1) {
            deletes();
        } else if (res.Message == '未设置支付密码，请先设置支付密码') {
            showChangePasswordBtn.value = true;
            return;
        } else if (res.Tag != 1) {
            info('error', res.Message);
        }
    } catch (error) {}
};
const deletes = () => {
    route.query.wuliu ? router.push('/user/logistics/') : router.back();
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
        <div class="message">
            <div class="left">订单提交成功，请尽快付款</div>
            <div class="right">
                <div class="tt"> 应付金额 </div>
                <div class="pri">
                    {{ route.query.AllTotal }}
                    <span>(含运费)</span>
                </div>
            </div>
        </div>
        <div class="select-zhifu">
            <div class="tite"> 支付方式 </div>
            <div class="yu">
                <p class="label">账户余额：</p>
                <div class="zhanghu">
                    <p class="wuliu">
                        <img :src="getImageUrl('global/logo.png')" alt="" />
                        {{ infos.Balance }}
                    </p>
                    <p class="label-jifen">剩余积分：{{ infos.Points }}</p>
                </div>
            </div>
            <div class="passwrod">
                <a-form @submit.prevent="submit" style="width: 161px">
                    <a-input-password
                        style="
                            border-width: 1px;
                            border-color: rgb(220, 223, 230);
                            border-style: solid;
                            border-radius: 3px;
                            background-color: rgb(255, 255, 255);
                            width: 161px;
                            height: 40px;
                            padding: 0;
                            padding-left: 13px;
                            padding-right: 10px;
                        "
                        v-model:value="ipt"
                        autocomplete="off"
                        id="fafjlasfksa"
                        class="ipt"
                        @keydown.enter="submit"
                        placeholder="请输入支付密码"
                    />
                </a-form>
                <p class="label-jifen" @click="changePassword">忘记密码?</p>
            </div>
            <div class="select-wrap">
                <div class="label">请选择以下支付方式</div>
                <div class="flexs">
                    <div class="item">
                        <div
                            class="img-item"
                            @click="changeShowItem(2)"
                            :class="showItem == 2 ? 'active' : ''"
                        >
                            <img src="@/assets/img/user/jingmai/icon9.svg" alt="" />
                            支付宝支付
                        </div>
                        <img
                            v-show="showItem == 2"
                            src="@/assets/img/user/jingmai/code.png"
                            alt=""
                        />
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
                        <img
                            v-show="showItem == 3"
                            src="@/assets/img/user/jingmai/code.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="btns">
                <a-button class="goback" @click="deletes">返回修改</a-button>
                <a-button type="primary" html-type="submit">确认</a-button>
            </div>
            <div class="label-details">
                1.您的应付金额较大，银行对第三方支付可能有当日和单笔最大限额，请确认您的银行账号有足够的授权额度；
            </div>
            <div class="label-details">
                2.如授信额度不够，您可返回修改，通过“线下汇款方式进行支付”
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.bank {
    min-height: 700px;
    padding: 20px 70px 100px;
    background-color: #fff;
    .message {
        .flex-row;
        justify-content: space-between;
        padding: 0 30px 0 50px;
        height: 105px;
        background-color: #eef3f8;
        font-weight: 600;
        .left {
            font-size: 24px;
            font-family: 'MicrosoftYaHei';
            color: rgb(177, 21, 3);
        }
        .right {
            font-size: 20px;
            font-family: 'MicrosoftYaHei';
            color: rgb(177, 21, 3);
            .pri {
                .flex-row;
                align-items: flex-end;
                margin-top: 6px;
                gap: 4px;
                span {
                    color: #697982;
                    font-size: 14px;
                }
            }
        }
    }
    .select-zhifu {
        margin-top: 48px;
        padding: 0 50px;
        .tite {
            font-size: 18px;
            font-family: 'MicrosoftYaHei';
            color: rgb(177, 21, 3);
            font-weight: 500;
        }
        .label-jifen {
            font-size: 14px;
            font-family: 'MicrosoftYaHei';
            color: rgb(0, 0, 0);
        }
        .yu {
            .label {
                margin-top: 30px;
                font-size: 16px;
                font-family: 'MicrosoftYaHei';
                color: rgb(0, 0, 0);
            }
            .zhanghu {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-top: 20px;
                margin-bottom: 14px;

                .wuliu {
                    display: flex;
                    align-items: center;
                    padding-left: 13px;

                    gap: 10px;
                    background-color: rgb(255, 255, 255);
                    width: 159px;
                    height: 39px;
                    background: url('@img/user/jingmai/wlbg.jpg');
                    background-size: 100% 100%;
                    font-size: 18px;
                    font-family: 'MicrosoftYaHei';
                    color: rgb(177, 21, 3);
                    img {
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }
        .passwrod {
            display: flex;
            align-items: center;
            gap: 20px;
            .label-jifen {
                cursor: pointer;
                &:hover {
                    color: #9a0000;
                }
            }
            :deep(.ant-input) {
                font-size: 14px;
                font-family: 'MicrosoftYaHei';
                &::placeholder {
                    color: rgb(182, 185, 190);
                }
            }
        }
        .select-wrap {
            margin-top: 60px;
            .flexs {
                .flex-row;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 25px;
                margin-top: 20px;
                .item {
                    .flex-col;
                    gap: 20px;
                    .img-item {
                        .flex-row;
                        border-width: 2px;
                        border-color: rgb(233, 233, 233);
                        border-style: solid;
                        background-color: rgb(242, 242, 242);
                        width: 159px;
                        height: 39px;
                        cursor: pointer;
                        &:hover,
                        &.active {
                            background: url('@img/user/jingmai/wlbg.jpg');
                            background-size: 100% 100%;
                        }
                        img {
                            width: 27px;
                            height: 23px;
                        }
                    }
                }
            }
        }
        .btns {
            .flex-row;
            justify-content: flex-start;
            gap: 20px;
            margin-top: 80px;
            margin-bottom: 20px;
            .goback {
                border-radius: 4px;
                background-color: rgb(105, 121, 130);
                width: 190px;
                height: 45px;
                color: #fff;
                padding: 0;
            }
            .ant-btn-primary {
                border-radius: 4px;
                background-color: rgb(154, 0, 0);
                width: 190px;
                height: 45px;
                padding: 0;
            }
        }
        .label-details {
            font-size: 14px;
            font-family: 'MicrosoftYaHei';
            color: rgb(177, 21, 3);
            margin: 12px 0;
        }
    }
}
</style>
