<script setup>
import { ref, computed, reactive, onMounted, toRaw, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { yuEZhuanEDu } from '@/request/user/api';
import { getImageUrl } from '@/utils';
import Tables from './item/tables.vue';
import TableDetails from './item/tableDetails.vue';
import { list, list2, labelCol } from './data.js';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const showModals = ref(null);
const params = ref();
const infos = ref('');
const comInfo = ref({});
onMounted(() => {
    params.value = showModals.value?.params;
    getZhiFuDetails();
});
watchEffect(() => {});
const formState = reactive({
    name: '',
    delivery: false,
    type: [],
    resource: '1',
    desc: ''
});
const getZhiFuDetails = async () => {
    try {
        let res = await yuEZhuanEDu();
        infos.value = res.Data;
    } catch (error) {}
};
const onSubmit = () => {
    console.log('submit!', toRaw(formState));
};
const isDraweComponent = ref(false);
const isDraweTableList = ref(false);
// const isDraweComponent = ref(false);
//切换线下汇款的
const changeShowPage = (index) => {
    if (index == 1) {
        comInfo.value.title = '填写汇款告知';
        isDraweComponent.value = true;
        return;
    }
    if (index == 2) {
        comInfo.value.title = '汇款告知记录';
        isDraweTableList.value = true;
        return;
    }
};
const afterOpenChange = (bool) => {
    isDraweComponent.value = bool;
};
const afterOpenChanges = (bool) => {
    isDraweTableList.value = bool;
};
</script>

<template>
    <div class="chongzhi">
        <div class="left-user-info">
            <div class="title">余额(¥)</div>
            <div class="num">{{ infos?.Balance }} <span>元</span></div>

            <div class="bi">
                <div>
                    <p>竞买额度</p>
                    <p>¥{{ infos?.Quota }}</p>
                    <p>¥{{ infos.AvailableQuotas }}可用</p>
                </div>
                <img :src="getImageUrl('user/caiwu/list1.png')" alt="" />
            </div>
        </div>
        <div class="right-info">
            <showModal ref="showModals" :titleList="list">
                <template v-slot:active2 v-if="params?.titleCate == list[0].cate">
                    <a-form :model="formState" :label-col="labelCol">
                        <a-form-item>
                            <a-input
                                style="width: 300px"
                                v-model:value="formState.name"
                                placeholder="金额 (RMB)"
                            />
                        </a-form-item>
                        <a-form-item>
                            <a-textarea
                                style="height: 100px; width: 400px"
                                v-model:value="formState.desc"
                                placeholder="备注"
                            />
                        </a-form-item>
                        <p style="margin-bottom: 10px">选择支付方式</p>
                        <a-form-item>
                            <a-radio-group v-model:value="formState.resource">
                                <a-radio value="1">微信</a-radio>
                                <a-radio value="2">支付宝</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" @click="onSubmit">去支付</a-button>
                        </a-form-item>
                    </a-form>
                </template>
                <template v-slot:active2 v-else>
                    <div class="img-list">
                        <div
                            class="img-item"
                            v-for="(item, index) in list2"
                            :key="index"
                            @click="changeShowPage(index)"
                        >
                            <img :src="getImageUrl(item.img)" alt="icon" />
                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                </template>
            </showModal>
        </div>
        <a-modal
            width="560px"
            :closable="false"
            v-model:open="isDraweComponent"
            :footer="null"
            centered
        >
            <Tables @close="afterOpenChange"></Tables>
        </a-modal>
        <a-modal
            :closable="false"
            width="1300px"
            v-model:open="isDraweTableList"
            :footer="null"
            centered
        >
            <TableDetails @close="afterOpenChanges"></TableDetails>
        </a-modal>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.chongzhi {
    width: 100%;
    padding: 20px 16px;
    .flex-row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    background-color: #fff;

    .left-user-info {
        border-radius: 12px;
        background-color: #f7f7f7;
        padding: 40px 15px 13px 40px;
        min-width: 334px;
        .flex-col;
        align-items: flex-start;

        .title {
            font-size: 18px;
            font-family: 'MicrosoftYaHei';
            color: rgb(82, 82, 82);
        }

        .num {
            font-size: 30px;
            margin: 18px 0 30px;
            font-family: 'PingFang SC';
            color: rgb(154, 0, 0);

            span {
                font-size: 16px;
            }
        }

        p {
            margin-bottom: 14px;
            color: rgb(74, 74, 74);
            font-size: 16px;
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

        .img-list {
            padding: 30px 0 0;
            .flex-row;
            justify-content: space-between;

            .img-item {
                .flex-col;
                gap: 10px;
                width: 235px;
                height: 110px;
                border-radius: 6px;
                cursor: pointer;
                background: linear-gradient(to bottom, #fdf3e1, #fee6c0);

                img {
                    width: 37px;
                    height: 37px;
                }
            }
        }
    }
}
</style>
