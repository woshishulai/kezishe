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
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 16 }"
                        autocomplete="off"
                        @finish="onFinish"
                        @finishFailed="handleFinishFailed"
                    >
                        <a-form-item label="评级公司" has-feedback name="IdType">
                            <a-select v-model:value.trim="formState.IdType" placeholder="">
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

                        <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
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
    margin-top: 20px;
    .left-cate {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        width: 415px;

        .search-wrap {
            .title {
                background-color: #d5b560;
                color: #fff;
                padding: 10px 20px;
                font-size: 18px;
            }
            .center {
                padding: 20px 20px 1px;
                background: linear-gradient(to bottom, #fef3d3, #fffaea);
                :deep(.ant-select-selector) {
                    background-color: #fff;
                }
                :deep(.ant-input) {
                    height: 50px;
                    background-color: #fff;
                }
                :deep(.ant-btn-default) {
                    background-color: #d5b560;
                    padding: 10px 40px;
                    border-radius: 4px;
                    color: #fff;
                }
            }
        }
        .new-cate {
            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #d5b560;
                color: #fff;
                padding: 10px 20px;
                font-size: 18px;
                .more {
                    font-size: 14px;
                    cursor: pointer;
                    color: #fdfdfd;
                }
            }
            .center {
                padding: 10px 20px;
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
                        .left-img {
                            .flex-row;
                            background-color: #fff;
                            padding: 10px;
                            img {
                                width: 90px;
                                height: 70px;
                            }
                        }
                        .right-text {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            font-size: 14px;
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
            padding: 20px;
            font-size: 20px;
            font-weight: 600;
            .more {
                font-size: 14px;
                font-weight: 400;
                cursor: pointer;
            }
        }
        .card-list {
            .flex-row;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 10px;
            padding: 0 5px;
            .card-item {
                display: flex;
                flex-direction: column;
                gap: 14px;
                width: 24%;
                padding: 20px 16px;
                background-color: #fff;
                cursor: pointer;
                .top-img {
                    .flex-row;
                    padding: 10px;
                    height: 200px;
                }
                .label-title {
                    font-size: 16px;
                    font-weight: 600;
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
