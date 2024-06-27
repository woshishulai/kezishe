<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { handleFinishFailed } from '@/utils/form/rules.js';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const formState = reactive({
    IdType: '1',
    code: ''
});
const list = [
    {
        img: 'chengjiao/list1.png',
        title: '博古知今一9月机制币·古钱·金银锭专场',
        jine: '164761.7',
        shuju: '222',
        time: '2023-09-04'
    },
    {
        img: 'chengjiao/list2.png',
        title: '9月现代金银币精品专场()',
        jine: '424761.7',
        shuju: '222',
        time: '成交时间:2023-09-04'
    },
    {
        img: 'chengjiao/list3.png',
        title: '8月现代金银币生肖&熊猫金币特场(五)',
        jine: '164761.7',
        shuju: '333',
        time: '2023-09-04'
    }
];
const onFinish = (values) => {
    console.log('Success:', values);
};
const details = (item) => {
    router.push('/chengjiao/details');
};
</script>

<template>
    <div class="chengjiao-news">
        <div class="left-cate">
            <div class="search-wrap">
                <div class="title"> 评级币查询 </div>
                <div class="center">
                    <a-form
                        :model="formState"
                        name="basic"
                        :label-col="{ span: 7 }"
                        autocomplete="off"
                        @finish="onFinish"
                        @finishFailed="handleFinishFailed"
                        :hide-required-mark="false"
                        label-align="left"
                    >
                        <a-form-item label="评级公司" has-feedback name="IdType">
                            <a-select
                                style="width: 229px"
                                v-model:value.trim="formState.IdType"
                                placeholder=""
                            >
                                <a-select-option value="1">PMG</a-select-option>
                                <a-select-option value="2">护照</a-select-option>
                                <a-select-option value="3">台胞证</a-select-option>
                                <a-select-option value="4">其他</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item
                            label="评级币编号"
                            name="code"
                            :rules="[{ required: true, message: '请输入编号' }]"
                        >
                            <a-input v-model:value="formState.code" />
                        </a-form-item>

                        <a-form-item :wrapper-col="{ offset: 7, span: 16 }">
                            <a-button html-type="submit">确定</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
            <div class="new-cate">
                <div class="title">
                    最新成交专场
                    <span class="more" @click="router.push('/chengjiao/transaction-session')"
                        >更多</span
                    >
                </div>
                <div class="center">
                    <div class="shoping-list">
                        <div class="shoping-item" v-for="(item, index) in list" :key="index">
                            <div class="left-img">
                                <img :src="getImageUrl(item.img)" alt="" />
                            </div>
                            <div class="right-text">
                                <p>{{ item.title }}</p>
                                <p>成交总金额:￥{{ item.jine }}</p>
                                <p>成交数据: {{ item.shuju }}件</p>
                                <p>成交时间:{{ item.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-show-shoping">
            <div class="title">
                最新成交藏品
                <span class="more">更多</span>
            </div>
            <div class="card-list">
                <div
                    class="card-item"
                    @click="details(item)"
                    v-for="(item, index) in 8"
                    :key="index"
                >
                    <div class="top-img">
                        <img :src="getImageUrl('chengjiao/list4.png')" alt="" />
                    </div>
                    <p class="label-title"> 这是我测试的标题 </p>
                    <p class="money">¥ {{ 299 }}</p>
                    <p class="time">成交时间：{{ '2023-10-23 10:12' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.chengjiao-news {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 12px;
    .left-cate {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 413px;

        .search-wrap {
            .title {
                background-color: #d5b560;
                color: rgb(255, 255, 255);
                padding: 0 30px;
                font-size: 18px;
                height: 50px;
                line-height: 52px;
            }
            .center {
                padding: 23px 30px 10px;
                background: linear-gradient(to bottom, #fef3d3, #fffaea);
                :deep(.ant-form-item) {
                    margin-bottom: 15px;
                    .ant-form-item-control-input {
                        min-height: auto;
                    }
                    .ant-form-item-label > label {
                        height: 39px;
                    }
                }
                :deep(.ant-select-selector) {
                    border-width: 1px;
                    border-color: rgb(228, 203, 135);
                    border-style: solid;
                    border-radius: 4px;
                    background-color: rgb(255, 255, 255);
                    height: 39px;
                    .ant-select-selection-item {
                        line-height: 39px;
                    }
                }
                .ant-select .ant-select-arrow svg {
                    color: rgb(228, 203, 135);
                }
                :deep(.ant-input) {
                    border-width: 1px;
                    border-color: rgb(228, 203, 135);
                    border-style: solid;
                    border-radius: 4px;
                    background-color: rgb(255, 255, 255);
                    width: 229px;
                    height: 39px;
                }
                :deep(.ant-btn-default) {
                    border-radius: 4px;
                    background-color: rgb(201, 170, 86);
                    width: 107px;
                    height: 41px;
                    color: #fff;
                    padding: 0;
                }
            }
        }
        .new-cate {
            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #d5b560;
                color: rgb(255, 255, 255);
                padding: 0 14px 0 30px;
                font-size: 18px;
                height: 50px;
                line-height: 52px;

                .more {
                    cursor: pointer;
                    font-size: 16px;
                    color: rgb(253, 253, 253);
                    transition: 0.1s;
                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
            .center {
                padding: 0px 10px 10px;
                background-color: #fffaeb;
                .shoping-list {
                    display: flex;
                    flex-direction: column;
                    .shoping-item {
                        .flex-row;
                        justify-content: flex-start;
                        gap: 15px;
                        padding: 20px 0;
                        cursor: pointer;
                        border-bottom: 1px solid rgb(236, 236, 236);
                        &:last-child {
                            border: none;
                        }
                        .left-img {
                            .flex-row;
                            background-color: #fff;
                            padding: 10px;
                            img {
                                width: 90px;
                                height: 70px;
                                transition: 0.2s;
                                &:hover {
                                    transform: scale(1.1);
                                }
                            }
                        }
                        .right-text {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            font-size: 14px;
                            transition: 0.2s;
                            &:hover {
                                transform: scale(1.1);
                            }
                        }
                    }
                }
            }
        }
    }
    .right-show-shoping {
        flex: 1;
        background-color: #f4f4f0;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 25px;
            font-size: 20px;
            color: rgb(16, 16, 16);

            .more {
                font-size: 14px;
                font-weight: 400;
                cursor: pointer;
                font-size: 16px;
            }
        }
        .card-list {
            .flex-row;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 8px;
            padding: 0 5px 8px;
            .card-item {
                display: flex;
                flex-direction: column;
                gap: 10px;
                min-width: 24%;
                padding: 20px 16px;
                flex: 1;
                background-color: #fff;
                cursor: pointer;
                &:hover {
                    color: #d5b560;
                    .top-img {
                        img {
                            transform: scale(1.1);
                        }
                    }
                }
                .top-img {
                    .flex-row;
                    padding: 10px;
                    height: 198px;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                        transition: 0.2s;
                    }
                }
                .label-title {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .money {
                    color: #9a0000;
                    font-weight: 600;
                    font-size: 18px;
                }
                .time {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>

<style>
.ant-select .ant-select-arrow svg {
    color: rgb(228, 203, 135);
}
</style>
