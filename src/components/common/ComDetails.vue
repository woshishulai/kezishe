<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Swiper from '@/pages/Chengjiao/details/Swiper.vue';
import Fixed from '@/pages/Chengjiao/details/Fixed.vue';
import Item from '@/pages/Chengjiao/details/Item.vue';
import FooterSwiper from '@/pages/Chengjiao/details/FooterSwiper.vue';
const props = defineProps({
    query: {
        type: Object,
        default: {
            addPrice: true
        }
    }
});
const columns = [
    {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '出价',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
    {
        title: '地区',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
    }
];
const data = [
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    },
    {
        name: '张三',
        price: '150',
        time: '2023-10-44 09:10:22',
        address: '河南'
    }
];
onMounted(() => {});
const value = ref(2055);
const modal1Visible = ref(false);
const setModal1Visible = (open) => {
    modal1Visible.value = open;
};
</script>

<template>
    <div class="chengjiao-details">
        <div class="left-wrap">
            <div class="show-img">
                <a-image
                    :width="400"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </div>
            <div class="switch-img">
                <img class="nav" :src="getImageUrl('chengjiao/icon1.svg')" alt="" />
                <div class="img-list">
                    <div class="img-item" v-for="(item, index) in 5" :key="index">
                        <img :src="getImageUrl('chengjiao/list1.png')" alt="" />
                    </div>
                </div>
                <img class="nav" :src="getImageUrl('chengjiao/icon2.svg')" alt="" />
            </div>
        </div>
        <div class="right-wrap">
            <div class="top">
                <div class="title">
                    <p class="label"> 成交#{{ 622616001 }} </p>
                    <div class="right-time">
                        <img :src="getImageUrl('chengjiao/icon5.png')" alt="" />
                        <p>2023-09-25</p>
                        <p>19:00:20</p>
                    </div>
                </div>
                <div class="center">
                    <h5>纪72全运会总t公司首日实寄美国，加盖首日戳、纪念戳 </h5>
                    <div class="element-list">
                        <div v-if="props.query.addPrice">
                            <p class="element-item"
                                >品级: {{ '全品' }}
                                <a-tooltip color="#9a0000">
                                    <template #title>我是提示文本</template>
                                    <img :src="getImageUrl('chengjiao/icon6.png')" alt="" />
                                </a-tooltip>
                            </p>
                            <p class="element-item">
                                品相描述：{{
                                    '真的很不错这个古董快来买啊 青青子衿悠悠我心纵我不往子宁不嗣音'
                                }}
                            </p></div
                        >
                        <div v-else>
                            <p class="element-item">评级公司: {{ '中邮' }} </p>
                            <p class="element-item"
                                >分数: {{ '100' }}分
                                <a-tooltip color="#9a0000">
                                    <template #title>我是提示文本</template>
                                    <img :src="getImageUrl('chengjiao/icon6.png')" alt="" />
                                </a-tooltip>
                            </p>
                            <p class="element-item">
                                品相描述：{{
                                    '真的很不错这个古董快来买啊 青青子衿悠悠我心纵我不往子宁不嗣音'
                                }}
                            </p></div
                        >
                    </div>
                </div>
            </div>
            <div class="price" v-if="props.query.addPrice">
                成交价格
                <p>¥{{ '2,050' }}</p>
            </div>
            <div class="prices" v-if="!props.query.addPrice">
                <p class="num">¥ {{ value }}</p>
                <div class="add-price">
                    <div class="change-price">
                        <a-button>-</a-button>
                        <a-input v-model:value="value"></a-input>
                        <a-button>+</a-button>
                    </div>
                    <a-button class="add">出价</a-button>
                </div>
                <p class="label">¥ 2,100(成交价)</p>
                <p class="label">¥ 2,100(服务费11%)</p>
                <p class="label">配送至：上海 ¥12.00 (本商品由壳子社北京仓库为您发货)</p>
            </div>
            <div class="record">
                <div class="title-price">
                    出价记录(45)
                    <span class="more" @click="modal1Visible = true"> 更多 </span>
                </div>
                <Swiper></Swiper>
                <a-modal
                    :footer="null"
                    v-model:open="modal1Visible"
                    title="出价记录"
                    class="com-details-modal"
                    style="top: 0; right: 0px; position: absolute; width: 700px; padding: 20px 0"
                    @ok="setModal1Visible(false)"
                >
                    <a-table
                        :scroll="{ x: 700, y: 600 }"
                        :pagination="false"
                        :dataSource="data"
                        :columns="columns"
                    />
                </a-modal>
            </div>
        </div>
    </div>
    <Item v-if="query.addPrice"></Item>
    <FooterSwiper></FooterSwiper>
    <Fixed></Fixed>
</template>

<style scoped lang="less">
.chengjiao-details {
    display: flex;
    flex-direction: row;
    gap: 15px;
    .left-wrap {
        width: 500px;
        .show-img {
            .flex-row;
            height: 500px;
            border: 1px solid #dadada;
            :deep(.ant-image) {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .switch-img {
            display: flex;
            flex-direction: row;
            gap: 10px;
            padding: 20px 0 0;
            .nav {
                width: 30px;
                cursor: pointer;
            }
            .img-list {
                flex: 1;
                .flex-row;
                gap: 10px;
                .img-item {
                    flex: 1;
                    .flex-row;
                    width: 60px;
                    height: 60px;
                    padding: 10px;
                    border: 2px solid #9a0000;
                    cursor: pointer;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
    .right-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
            .flex-row;
            justify-content: space-between;
            padding: 15px 15px 15px 40px;
            color: #fff;
            background: url('@/assets/img/weituo/menu-title.png');
            background-size: 100% 100%;
            .label {
                font-size: 18px;
                font-weight: 600;
            }
            .right-time {
                .flex-row;
                gap: 10px;
            }
        }
        .center {
            h5 {
                padding: 20px 40px;
                font-size: 20px;
            }
            .element-list {
                padding: 0 40px 10px;
                border-bottom: 1px solid #e4e4e4;
                .element-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #101010;
                    margin: 10px 0;

                    img {
                        cursor: pointer;
                    }
                }
            }
        }
        .price {
            padding: 0 40px;
            color: #ff2e00;
            font-size: 20px;
            font-weight: 600;
            p {
                margin-top: 20px;
            }
        }
        .prices {
            padding: 0 40px;
            .num {
                color: #ff2e00;
                font-size: 20px;
                font-weight: 600;
            }
            .add-price {
                margin-top: 20px;
                .flex-row;
                justify-content: flex-start;
                gap: 20px;
                .change-price {
                    .flex-row;
                    .ant-btn {
                        background-color: #e8e8e8;
                        width: 60px;
                        font-size: 16px;
                        border: none;
                    }
                    .ant-input {
                        height: 54px;
                        width: 100px;
                        border: none;
                    }
                }
                .ant-btn {
                    &.add {
                        background-color: #fe2e00;
                        color: #fff;
                        width: 120px;
                    }
                }
            }
            .label {
                color: #101010;
                margin-top: 20px;
            }
        }
        .record {
            background-color: #f8f8f8;
            .title-price {
                .flex-row;
                justify-content: space-between;
                padding: 15px 40px;
                font-size: 16px;
                border-bottom: 1px solid #e4e4e4;
                .more {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
