<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
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
const query = ref('余额转额度');
const query1 = ref('额度转余额');
const query2 = ref('额度充值');
</script>

<template>
    <div class="chongzhi">
        <div class="edu">
            <div class="left-user-info">
                <div class="title">账户余额(¥)</div>
                <div class="num">143.40 <span>元</span></div>
                <div class="bi">
                    <div>
                        <p>竞卖额度</p>
                        <p>¥500.000</p>
                        <p>¥500.000可用</p>
                    </div>
                    <img :src="getImageUrl('user/caiwu/list2.png')" alt="" />
                </div>
            </div>
            <div class="right-info">
                <div class="title">
                    <p
                        class="cate-item"
                        :class="item.cate == query ? 'active' : ''"
                        v-for="item in list"
                        :key="item.cate"
                    >
                        <span>{{ item.cate }}</span>
                    </p>
                </div>
                <div class="element">
                    <div>
                        <span>调整额度：</span> <input type="text" placeholder="金额（RMB）" />
                    </div>
                    <p>453.423-646.618</p>
                    <p>竞卖额度用于竞买藏品，余额：额度=1:1000</p>
                    <div class="btn">调整</div>
                </div>
            </div>
        </div>
        <div class="edu">
            <div class="left-user-info">
                <div class="title">账户余额(¥)</div>
                <div class="num">143.40 <span>元</span></div>
                <div class="bi">
                    <div>
                        <p>竞卖额度</p>
                        <p>¥500.000</p>
                        <p>¥500.000可用</p>
                    </div>
                    <img :src="getImageUrl('user/caiwu/list2.png')" alt="" />
                </div>
            </div>
            <div class="right-info">
                <div class="title">
                    <p
                        class="cate-item"
                        :class="item.cate == query1 ? 'active' : ''"
                        v-for="item in list"
                        :key="item.cate"
                    >
                        <span>{{ item.cate }}</span>
                    </p>
                </div>
                <div class="element">
                    <div>
                        <span>调整额度：</span> <input type="text" placeholder="金额（RMB）" />
                    </div>
                    <p>竞买额度为153423，额度：余额=50:1</p>
                    <div class="btn">调整</div>
                </div>
            </div>
        </div>
        <div class="edu">
            <div class="left-user-info">
                <div class="title">账户余额(¥)</div>
                <div class="num">143.40 <span>元</span></div>
                <div class="bi">
                    <div>
                        <p>竞卖额度</p>
                        <p>¥500.000</p>
                        <p>¥500.000可用</p>
                    </div>
                    <img :src="getImageUrl('user/caiwu/list2.png')" alt="" />
                </div>
            </div>
            <div class="right-info">
                <div class="title">
                    <p
                        class="cate-item"
                        :class="item.cate == query2 ? 'active' : ''"
                        v-for="item in list"
                        :key="item.cate"
                    >
                        <span>{{ item.cate }}</span>
                    </p>
                </div>
                <div class="element">
                    <p>直接输入目标额度，系统将按照比例100：1自动续算人民币</p>
                    <div>
                        <span>调整额度：</span> <input type="text" placeholder="金额（RMB）" />
                    </div>
                    <h5>选择支付方式</h5>
                    <div class="check">
                        <a-checkbox v-model:checked="checked">微信</a-checkbox>
                        <a-checkbox v-model:checked="checked">支付宝</a-checkbox>
                        <a-checkbox v-model:checked="checked">汇款</a-checkbox>
                    </div>
                    <div class="btn">去支付</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.chongzhi {
    width: 100%;

    .edu {
        padding: 20px 16px;
        .flex-row;
        gap: 10px;
        align-items: flex-start;
        justify-content: flex-start;
        background-color: #fff;
    }

    .left-user-info {
        border-radius: 12px;
        background-color: #f7f7f7;
        padding: 40px;
        min-width: 434px;
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
        width: 100%;

        .title {
            padding: 10px 10px 0;
            .flex-row;

            justify-content: flex-start;
            background-color: #eef3f8;
            border: none;

            .cate-item {
                padding: 16px 20px;

                &.active {
                    background-color: #fff;
                    border-radius: 6px 6px 0 0;
                    color: #9a0000;
                    font-weight: 700;
                }
            }
        }

        .element {
            .flex-col;
            align-items: flex-start;
            padding: 40px;
            gap: 20px;

            input {
                width: 300px;
                height: 40px;
                border-radius: 12px;
                border: 1px solid #dae1e8;
            }

            textarea {
                width: 400px;
                padding: 20px;
                height: 100px;
                border-radius: 12px;
                border: 1px solid #dae1e8;
            }

            .btn {
                padding: 20px 50px;
                background-color: #9a0000;
                color: #fff;
            }
        }

        .card-list {
            margin-top: 30px;
            .flex-row;
            gap: 20px;

            .card-item {
                border-radius: 6px;
                flex: 1;
                .flex-col;
                gap: 10px;
                padding: 20px;
                background-color: #fdf1dd;

                img {
                    width: 40px;
                    height: 40px;
                }

                color: #ebba87;
                font-weight: 700;
            }
        }
    }
}
</style>
