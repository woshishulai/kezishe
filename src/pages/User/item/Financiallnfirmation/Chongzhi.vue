<script setup>
import { ref, computed, reactive, onMounted, toRaw, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const showModals = ref(null);
const params = ref();
onMounted(() => {
    params.value = showModals.value?.params;
    console.log(params.value?.titleCate);
});
watchEffect(() => {});
const formState = reactive({
    name: '',
    delivery: false,
    type: [],
    resource: '1',
    desc: ''
});
const onSubmit = () => {
    console.log('submit!', toRaw(formState));
};
const labelCol = {
    style: {
        width: '150px'
    }
};
const wrapperCol = {
    span: 14
};
const list = [
    {
        cate: '网上充值'
    },
    {
        cate: '线下汇款'
    }
];
const list2 = [
    {
        img: 'user/caiwu/icon1.png',
        text: '汇款银行&邮政信息'
    },
    {
        img: 'user/caiwu/icon2.png',
        text: '填写汇款告知单'
    },
    {
        img: 'user/caiwu/icon3.png',
        text: '汇款告知记录'
    }
];
</script>

<template>
    <div class="chongzhi">
        <div class="left-user-info">
            <div class="title">余额(¥)</div>
            <div class="num">143.40 <span>元</span></div>
            <p>竞卖额度</p>
            <p>¥453423</p>
            <p>¥453423可用</p>
            <div class="bi">
                <div>
                    <p class="label">涌币</p>
                    <p>0(赠送0)</p>
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
                            <a-button @click="onSubmit">去支付</a-button>
                        </a-form-item>
                    </a-form>
                </template>
                <template v-slot:active2 v-else>
                    <div class="img-list">
                        <div class="img-item" v-for="(item, index) in list2" :key="index">
                            <img :src="getImageUrl(item.img)" alt="icon" />
                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                </template>
            </showModal>
        </div>
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
        min-width: 334px;
        border-radius: 12px;
        background-color: #f7f7f7;
        padding: 40px 20px 20px 40px;
        .flex-col;
        gap: 10px;
        align-items: flex-start;
        font-size: 16px;
        .title {
            font-size: 18px;
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
            color: #6a6a6a;
        }

        .label {
            margin: 10px 0;
        }

        .bi {
            margin-top: 30px;
            width: 100%;
            .flex-row;
            align-items: flex-start;
            justify-content: space-between;
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
