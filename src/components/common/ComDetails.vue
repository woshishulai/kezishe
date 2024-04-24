<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getAddress, addPriceApi } from '@/request/jingmai/index';
import Swiper from '@/pages/Chengjiao/details/Swiper.vue';
import Fixed from '@/pages/Chengjiao/details/Fixed.vue';
import Item from '@/pages/Chengjiao/details/Item.vue';
import FooterSwiper from '@/pages/Chengjiao/details/FooterSwiper.vue';
import { info } from '@/hooks/antd/message';
const props = defineProps({
    query: {
        type: Object,
        default: {
            addPrice: true
        }
    },
    goodsDtails: {
        type: Object,
        default: () => ({})
    }
});
const columns = [
    {
        title: '昵称',
        dataIndex: 'Unick',
        key: 'Unick',
        align: 'center'
    },
    {
        title: '出价',
        dataIndex: 'MPrice',
        key: 'MPrice',
        align: 'center'
    },
    {
        title: '出价时间',
        dataIndex: 'CreateTime',
        key: 'CreateTime',
        align: 'center'
    },
    {
        title: '地区',
        dataIndex: 'IpAddr',
        key: 'IpAddr',
        align: 'center'
    }
];
const userPriceInfo = reactive({
    address: '请选择地址',
    addressPrice: '0.00'
});
const addressList = ref([]);
onMounted(async () => {
    try {
        let res = await getAddress();
        addressList.value = res.Data;
    } catch (error) {
        info('error', error);
    }
});
const value = ref(2055);
const modal1Visible = ref(false);
const setModal1Visible = (open) => {
    modal1Visible.value = open;
};
const changeAddress = (value, selectAddress) => {
    console.log(value, selectAddress);
    userPriceInfo.addressPrice = selectAddress[1].ExpressPrice;
};
const addPriceBtn = async () => {
    const query = {
        Gid: '698192644647424000',
        Unick: '小金',
        MPrice: '400',
        MType: '0'
    };
    try {
        let res = await addPriceApi(query);
        console.log(res, '出价格');
    } catch (error) {
        info('error', error);
    }
};
//切换预览图片
const visible = ref(false);
//选中的图片
const active = ref(0);
const changeActive = (index) => {
    active.value = index;
};
</script>

<template>
    <div class="chengjiao-details">
        <div class="left-wrap">
            <div class="show-img" v-if="props.goodsDtails?.BaseData?.Atlas">
                <a-image
                    :preview="{ visible: false }"
                    :width="400"
                    @click="visible = true"
                    :src="props.goodsDtails?.BaseData?.Atlas.split(';')[active]"
                />
            </div>
            <div style="display: none">
                <a-image-preview-group
                    :preview="{ visible, onVisibleChange: (vis) => (visible = vis) }"
                >
                    <a-image
                        v-for="(item, index) in props.goodsDtails?.BaseData?.Atlas.split(';')"
                        :key="index"
                        :src="item"
                    />
                </a-image-preview-group>
            </div>
            <div class="switch-img">
                <a-carousel arrows>
                    <template #prevArrow>
                        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                            <left-circle-outlined />
                        </div>
                    </template>
                    <template #nextArrow>
                        <div class="custom-slick-arrow" style="right: 10px">
                            <right-circle-outlined />
                        </div>
                    </template>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </a-carousel>
            </div>
        </div>
        <div class="right-wrap">
            <div class="top">
                <div class="title">
                    <p class="label"> 成交#{{ props.goodsDtails?.BaseData?.Bn }} </p>
                    <div class="right-time">
                        <img :src="getImageUrl('chengjiao/icon5.png')" alt="" />
                        <p>{{ props.goodsDtails?.offerData?.Ontime }}</p>
                    </div>
                </div>

                <div class="center">
                    <h5> {{ props.goodsDtails?.BaseData?.Title }} </h5>
                    <div class="element-list">
                        <div v-if="props.goodsDtails?.BaseData?.IsRating != 1">
                            <p class="element-item"
                                >品级: {{ props.goodsDtails?.BaseData?.Official }}
                                <a-tooltip color="#9a0000">
                                    <template #title>我是提示文本</template>
                                    <img :src="getImageUrl('chengjiao/icon6.png')" alt="" />
                                </a-tooltip>
                            </p>
                            <p class="element-item">
                                品相描述：{{ props.goodsDtails?.BaseData?.BDescriptionn }}
                            </p></div
                        >
                        <div v-else>
                            <p class="element-item"
                                >评级公司: {{ props.goodsDtails?.BaseData?.Ratings }}
                            </p>
                            <p class="element-item"
                                >分数: {{ props.goodsDtails?.BaseData?.RatingScore }}分
                                <a-tooltip color="#9a0000">
                                    <template #title>我是提示文本</template>
                                    <img :src="getImageUrl('chengjiao/icon6.png')" alt="" />
                                </a-tooltip>
                            </p>
                            <p class="element-item">
                                品相描述：{{ props.goodsDtails?.BaseData?.BDescriptionn }}
                            </p></div
                        >
                    </div>
                </div>
            </div>
            <div class="price" v-if="props.query.addPrice">
                成交价格
                <p>¥{{ props.goodsDtails?.offerData?.MakePrice }}</p>
            </div>
            <div class="prices" v-if="!props.query.addPrice">
                <p class="num">¥ {{ props.goodsDtails?.offerData?.MakePrice }}</p>
                <div class="add-price">
                    <div class="change-price">
                        <a-button>-</a-button>
                        <a-input v-model:value="value"></a-input>
                        <a-button>+</a-button>
                    </div>
                    <a-button class="add" @click="addPriceBtn">出价</a-button>
                </div>
                <p class="label">¥ {{ props.goodsDtails?.offerData?.MPrice || 3000 }}(当前出价)</p>
                <div class="info">
                    <p> ¥ {{ props.goodsDtails?.offerData?.MTips || 300 }}(当前出价服务费 ) </p>
                    <a-tooltip color="#9a0000">
                        <template #title>
                            <div class="info-fuwu">
                                <p
                                    >服务费基础服务费{{
                                        props.goodsDtails?.offerData?.Tips || 300
                                    }}</p
                                >
                                <p
                                    >服务费百分比{{
                                        props.goodsDtails?.offerData?.TipsRate || 300
                                    }}</p
                                >
                                <p
                                    >服务费起征点{{
                                        props.goodsDtails?.offerData?.TipsLevel || 300
                                    }}</p
                                >
                                <p
                                    >服务费提示信息{{
                                        props.goodsDtails?.offerData?.TipsDes || 300
                                    }}</p
                                >
                            </div>
                        </template>
                        <img
                            style="cursor: pointer"
                            :src="getImageUrl('chengjiao/icon6.png')"
                            alt=""
                        /> </a-tooltip
                ></div>

                {{ props.goodsDtails?.offerData?.TipsRate }}
                <div class="info"
                    >配送至:
                    <a-dropdown :trigger="['click']">
                        <a-cascader
                            :field-names="{
                                label: 'AreaName',
                                value: 'AreaName',
                                children: 'ChildList'
                            }"
                            @change="changeAddress"
                            expand-trigger="hover"
                            v-model:value="userPriceInfo.address"
                            :options="addressList"
                        />
                    </a-dropdown>
                    ¥{{ userPriceInfo.addressPrice }} (本商品由壳子社北京仓库为您发货)</div
                >
            </div>
            <div class="record">
                <div class="title-price">
                    出价记录({{ props.goodsDtails?.recomData?.length }})
                    <span class="more" @click="modal1Visible = true"> 更多 </span>
                </div>
                <Swiper :swiperList="props.goodsDtails?.recomData"></Swiper>
                <a-modal
                    :footer="null"
                    v-model:open="modal1Visible"
                    title="出价记录"
                    class="com-details-modal"
                    style="top: 0; right: 0px; position: absolute; width: 700px; padding: 20px 0"
                    @ok="setModal1Visible(false)"
                >
                    <a-table
                        :pagination="false"
                        :dataSource="props.goodsDtails?.recomData"
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
            padding: 20px 0 0;
            :deep(.ant-carousel) {
                width: 100%;
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
                    gap: 2px;
                    .ant-btn {
                        background-color: #e8e8e8;
                        width: 60px;
                        font-size: 16px;
                        border: none;
                    }
                    .ant-input {
                        width: 100px;
                        text-align: center;
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
            .info {
                .flex-row;
                justify-content: flex-start;
                gap: 10px;
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
