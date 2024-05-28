<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { handleFinishFailed } from '@/utils/form/rules';
import {
    yuEZhuanEDu,
    BalanceToQuotaInfo,
    eDuZhuanYUE,
    QuotaToBalanceFrom
} from '@/request/user/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const showModals = ref(null);
const props = defineProps({});
const params = ref();
const formState = reactive({});
//总钱数
const priceEdu = computed(() => {
    if (
        infos.value.details1 &&
        infos.value.details1.Balance !== undefined &&
        formState.AdjustQuota &&
        Number(formState.AdjustQuota) > Number(infos.value.details1.AvailableQuotas)
    ) {
        let num = Number(formState.AdjustQuota) - Number(infos.value.details1.AvailableQuotas);
        let price = num / infos.value.details1?.BiLi;
        console.log('zhgeli', price);
        let result = infos.value.details1?.Balance - price;
        return result !== undefined ? result.toFixed(2) : undefined;
    } else {
        console.log(222);
        return infos.value.details1 && infos.value.details1?.Balance !== undefined
            ? Number(infos.value.details1?.Balance).toFixed(2)
            : undefined;
    }
});
const priceEdus = computed(() => {
    if (
        infos.value.details2 &&
        infos.value.details2?.Balance !== undefined &&
        formState.ReduceQuota
    ) {
        const balance = Number(infos.value.details2?.Balance);
        const reduceQuota = Number(formState.ReduceQuota);
        return (formState.ReduceQuota < 50 ? balance : balance + reduceQuota / 50).toFixed(2);
    } else {
        return infos.value.details2?.Balance;
    }
});

//额度转钱比例
const infos = ref({
    details1: {},
    details2: {}
});
const list = [
    {
        cate: '余额转额度'
    },
    {
        cate: '额度转余额'
    },
    {
        cate: '额度充值'
    }
];
onMounted(() => {
    params.value = showModals.value?.params;
});
const detailsInfo1 = async () => {
    try {
        let res = await yuEZhuanEDu();
        infos.value.details1 = res.Data;
        console.log(res);
    } catch (error) {
        info('error', error);
    }
};
const detailsInfo2 = async () => {
    try {
        let res = await eDuZhuanYUE();
        console.log(res);
        infos.value.details2 = res.Data;
    } catch (error) {
        info('error', error);
    }
};
watch(
    () => showModals.value?.params.titleCate,
    (news) => {
        params.value = news;
        if (news == list[0].cate) {
            formState.ReduceQuota = '';
            params.value = showModals.value?.params;
            detailsInfo1();
        } else if (news == list[1].cate) {
            formState.AdjustQuota = '';
            params.value = showModals.value?.params;
            detailsInfo2();
        } else if (news == list[2].cate) {
            params.value = showModals.value?.params;
        }
    }
);
watch(
    () => formState.AdjustQuota,
    (newValue, oldValue) => {
        const maxQuota = Number(
            (
                infos.value.details1.BiLi * infos.value.details1.Balance +
                infos.value.details1.Quota
            ).toFixed(2)
        );
        if (newValue > maxQuota) {
            formState.AdjustQuota = maxQuota;
        }
    }
);

watch(
    () => formState.ReduceQuota,
    (newValue, oldValue) => {
        if (Number(formState.ReduceQuota) > Number(infos.value.details2?.TransBalanceQuota)) {
            formState.ReduceQuota = Number(infos.value.details2?.TransBalanceQuota);
        }
    }
);

const handleFinish = async () => {
    try {
        let res = await BalanceToQuotaInfo(formState.AdjustQuota);
        console.log(res);
        if (res.Tag == 1) {
            detailsInfo1();
            info('success', res.Message);
        }
    } catch (error) {
        info('error', error);
    }
};
const handleFinishs = async () => {
    try {
        let res = await QuotaToBalanceFrom(formState.ReduceQuota);
        console.log(res);
        if (res.Tag == 1) {
            detailsInfo2();
            info('success', res.Message);
        }
    } catch (error) {
        info('error', error);
    }
};
const handleFinishss = async () => {
    try {
        let res = await QuotaToBalanceFrom(formState.ReduceQuota);
        console.log(res);
        if (res.Tag == 1) {
            info('success', res.Message);
        }
    } catch (error) {
        info('error', error);
    }
};
</script>

<template>
    <div class="chongzhi">
        <div class="edu">
            <div class="left-user-info">
                <div class="title">账户余额(¥)</div>
                <div class="num" v-show="params?.titleCate == '余额转额度'"
                    >{{ priceEdu }} <span>元</span></div
                >
                <div class="num" v-show="params?.titleCate == '额度转余额'"
                    >{{ priceEdus }} <span>元</span></div
                >
                <div class="bi">
                    <div>
                        <p>竞卖额度</p>
                        <p
                            >¥{{
                                formState.AdjustQuota ||
                                infos.details1.Quota ||
                                infos.details2.Quota
                            }}</p
                        >
                        <p
                            >¥{{
                                params?.titleCate == list[0].cate
                                    ? infos.details1.AvailableQuotas
                                    : infos.details2.AvailableQuotas
                            }}可用</p
                        >
                    </div>
                    <img :src="getImageUrl('user/caiwu/list2.png')" alt="" />
                </div>
            </div>
            <div class="right-info">
                <showModal ref="showModals" :titleList="list">
                    <template v-slot:active2 v-if="params?.titleCate == list[0].cate">
                        <div class="form">
                            <a-form
                                :model="formState"
                                labelAlign="left"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 14 }"
                                @finish="handleFinish"
                                @finishFailed="handleFinishFailed"
                            >
                                <a-form-item
                                    :rules="[{ required: true, message: '额度不可为空' }]"
                                    label="调整额度"
                                    name="AdjustQuota"
                                >
                                    <a-input type="number" v-model:value="formState.AdjustQuota" />
                                </a-form-item>
                                <p
                                    >{{ infos.details1.Quota }} ~
                                    {{
                                        Math.floor(
                                            Number(infos.details1.BiLi) *
                                                Number(infos.details1.Balance) +
                                                Number(infos.details1.Quota)
                                        )
                                    }}
                                </p>
                                <p class="bottoms"
                                    >竞买额度用于竞买藏品 , 余额 : 额度 = 1:{{
                                        infos.details1.BiLi
                                    }}</p
                                >

                                <a-form-item :wrapper-col="{ offset: 5, span: 14 }">
                                    <a-button type="primary" html-type="submit">调整</a-button>
                                </a-form-item>
                            </a-form>
                        </div>
                    </template>
                    <template v-slot:active2 v-if="params?.titleCate == list[1].cate">
                        <div class="form">
                            <a-form
                                :model="formState"
                                labelAlign="left"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 14 }"
                                @finish="handleFinishs"
                                @finishFailed="handleFinishFailed"
                            >
                                <a-form-item
                                    :rules="[{ required: true, message: '额度不可为空' }]"
                                    label="调整额度"
                                    name="ReduceQuota"
                                >
                                    <a-input type="number" v-model:value="formState.ReduceQuota" />
                                </a-form-item>
                                <p
                                    >可用调整额度为 {{ infos.details2.TransBalanceQuota }} , 额度 :
                                    余额 = {{ infos.details2.BiLi }}:1</p
                                >
                                <p class="bottoms" style="opacity: 0">345678</p>
                                <a-form-item :wrapper-col="{ offset: 5, span: 14 }">
                                    <a-button type="primary" html-type="submit">调整</a-button>
                                </a-form-item>
                            </a-form>
                        </div>
                    </template>
                    <template v-slot:active2 v-if="params?.titleCate == list[2].cate">
                        <div class="forms">
                            <a-form
                                :model="formState"
                                labelAlign="left"
                                :label-col="{ span: 0 }"
                                :wrapper-col="{ span: 14 }"
                                @finish="handleFinishss"
                                @finishFailed="handleFinishFailed"
                            >
                                <p>直接输入目标额度,系统将自动按照比例100:1自动换算人民币</p>
                                <a-form-item
                                    :rules="[{ required: true, message: '额度不可为空' }]"
                                    name="ReduceQuota"
                                >
                                    <a-input type="number" v-model:value="formState.ReduceQuota" />
                                </a-form-item>
                                <a-form-item name="resource">
                                    <p class="bottoms">选择支付方式</p>
                                    <a-radio-group v-model:value="formState.resource">
                                        <a-radio value="1">微信</a-radio>
                                        <a-radio value="2">支付宝</a-radio>
                                        <a-radio value="3">汇款</a-radio>
                                    </a-radio-group>
                                </a-form-item>
                                <a-form-item :wrapper-col="{ offset: 0, span: 14 }">
                                    <a-button :disabled="true" type="primary" html-type="submit"
                                        >去支付</a-button
                                    >
                                </a-form-item>
                            </a-form>
                        </div>
                    </template>
                </showModal>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.edu {
    padding: 20px 16px;
    .flex-row;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 10px;
    .left-user-info {
        border-radius: 12px;
        background-color: #f7f7f7;
        padding: 40px;
        min-width: 334px;
        .flex-col;
        gap: 10px;
        align-items: flex-start;

        .title {
            font-size: 24px;
        }

        .num {
            color: #9a0000;
            font-size: 30px;
            margin: 10px 0 20px;
            span {
                font-size: 16px;
            }
        }

        p {
            margin-top: 20px;
            color: #6a6a6a;
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
    .right-info {
        flex: 1;

        .ant-form {
            padding: 30px 20px;

            .ant-form-item-control {
                margin-left: 0;

                .ant-btn {
                    padding: 21px 50px;
                    border-radius: 4;
                }
            }
        }

        .form {
            margin-top: 30px;
            margin-left: 39px;
            p {
                margin-left: 140px;
                margin-bottom: 10px;
            }
            .bottoms {
                margin-bottom: 46px;
            }
        }
        .forms {
            p {
                margin-bottom: 20px;
            }
            .bottoms {
                margin-bottom: 10px;
            }
        }
    }
}
</style>
