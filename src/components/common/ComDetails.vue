<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute, routerKey } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getAddress, addPriceApi, removePriceApi } from '@/request/jingmai/index';
import Swiper from '@/pages/Chengjiao/details/Swiper.vue';
import TimtClock from '@/pages/JingMai/item/TimeClock.vue';
import Fixed from '@/pages/Chengjiao/details/Fixed.vue';
import Item from '@/pages/Chengjiao/details/Item.vue';
import FooterSwiper from '@/pages/Chengjiao/details/FooterSwiper.vue';
import { info } from '@/hooks/antd/message';
import { watch } from 'vue';
import { useUserInfo } from '@/store/store';
const user = useUserInfo();
const route = useRoute();
const router = useRouter();
const props = defineProps({
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
//出价 代理价
const isFirstPrice = ref(false);
//更新 代理价
const newFirstPrice = ref(false);
const emits = defineEmits(['getGoodsDetailsFn']);
const fetchDataList = () => {
    emits('getGoodsDetailsFn');
};
//最低出价的范围
const startPrice = ref(0);
//出价的价格
const value = ref(0);
const modal1Visible = ref(false);
const setModal1Visible = (open) => {
    modal1Visible.value = open;
};
//减去价格
const reducePrice = () => {
    //每次操作 重新赋值加价格的范围
    const priceAllList = props.goodsDtails?.offerData?.Jiajia;
    const getItem = priceAllList.find((item) => Number(item.Mmax) > value.value);
    startPrice.value = Number(getItem.Jiajia);
    if (value.value - startPrice.value <= props.goodsDtails?.offerData?.MakePrice) {
        value.value = props.goodsDtails?.offerData?.MakePrice + startPrice.value;
    } else {
        value.value = value.value - startPrice.value;
    }
};
//加价格
const addPrice = () => {
    const priceAllList = props.goodsDtails?.offerData?.Jiajia;
    const getItem = priceAllList.find((item) => Number(item.Mmax) > value.value);
    startPrice.value = Number(getItem.Jiajia);
    value.value = Number(value.value) + startPrice.value;
};
//输入价格
const changePrice = () => {
    if (value.value < props.goodsDtails?.offerData?.MakePrice + Number(startPrice.value)) {
        value.value = props.goodsDtails?.offerData?.MakePrice + Number(startPrice.value);
    }
    console.log(value.value);
};
//出价
const addPriceBtn = async () => {
    const query = {
        Gid: route.query.id,
        Unick: user.userNickName.NickName,
        MPrice: value.value,
        MType: isFirstPrice.value ? '1' : '0'
    };
    try {
        let res = await addPriceApi(query);
        if (res.Tag == 1) {
            info('success', res.Message);
            emits('getGoodsDetailsFn');
        }
    } catch (error) {
        info('error', error);
    }
};
//取消价格
const removeDaiLiPrice = async () => {
    const query = {
        Gid: route.query.id,
        ProxyId: props.goodsDtails?.offerData?.DaiLiInfo?.Id
    };
    try {
        let res = await removePriceApi(query);
        if (res.Tag == 1) {
            info('success', res.Message);
            emits('getGoodsDetailsFn');
        }
    } catch (error) {
        info('error', error);
    }
};
//修改地址
const changeAddress = (value, selectAddress) => {
    console.log(value, selectAddress);
    userPriceInfo.addressPrice = selectAddress[1].ExpressPrice;
};

//切换预览图片
const visible = ref(false);
//选中的图片
const active = ref(0);
//轮播图实例
const carousel = ref(null);
//点击切换轮播图
const changeSwiperItem = (index) => {
    active.value = index;
};
//轮播图下标记
const handleAfterChange = (index) => {
    active.value = index;
};
//成交价格
const transactionPrice = computed(
    () => value.value + (value.value * Number(props.goodsDtails?.offerData?.TipsRate)) / 100
);
//服务费
const service = computed(
    () => (value.value * Number(props.goodsDtails?.offerData?.TipsRate)) / 100
);
//获取最低出价和是否时代理价格
watch(
    () => props.goodsDtails,
    (newParams, oldParams) => {
        if (
            props.goodsDtails?.BaseData?.Status != 1 &&
            props.goodsDtails?.BaseData?.Status != 2 &&
            props.goodsDtails?.BaseData?.Status != 3 &&
            props.goodsDtails?.BaseData?.Status != 7 &&
            props.goodsDtails?.BaseData?.Status != 8
        ) {
            info('error', '页面发生错误，将回到首页');
            let timer = setTimeout(() => {
                router.push('/');
                clearTimeout(timer);
            }, 2000);
            return;
        }

        const priceAllList = props.goodsDtails?.offerData?.Jiajia;
        const nowNewPrice = props.goodsDtails?.offerData?.DaiLiInfo?.MPrice
            ? props.goodsDtails?.offerData?.DaiLiInfo?.MPrice
            : props.goodsDtails?.offerData?.MPrice
              ? props.goodsDtails?.offerData?.MPrice
              : props.goodsDtails?.BaseData?.BasePrice;
        if (!priceAllList || !priceAllList.length) {
            return;
        }
        if (nowNewPrice !== 0 && !nowNewPrice) {
            console.warn('nowNewPrice 是 falsy 值，无法进行比较');
            return;
        }
        const getItem = priceAllList.find((item) => Number(item.Mmax) > nowNewPrice);
        startPrice.value = Number(getItem.Jiajia);
        value.value = Number(nowNewPrice) + Number(startPrice.value);
        if (!props.goodsDtails?.recomData?.length) {
            return;
        }
        //设置出价还是代理
        const id = props.goodsDtails?.recomData[0].Uid;
        const userId = user.userInfo.UserId;
        if (id != userId) {
            isFirstPrice.value = false;
        } else {
            isFirstPrice.value = true;
        }
        //判断是不是已经存在代理价
        const arr = Object.keys(props.goodsDtails?.offerData?.DaiLiInfo);
        if (arr.length) {
            newFirstPrice.value = true;
        } else {
            newFirstPrice.value = false;
        }
    },
    { deep: true }
);
</script>

<template>
    <div class="chengjiao-details">
        <div class="left-wrap">
            <div class="show-img" v-if="props.goodsDtails?.BaseData?.Atlas">
                <a-image
                    :preview="{ visible: false }"
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
            <div class="swiper-img">
                <a-carousel
                    ref="carousel"
                    :after-change="handleAfterChange"
                    :autoplay="!visible"
                    arrows
                    :dots="false"
                    :slides-to-show="
                        props.goodsDtails?.BaseData?.Atlas.split(';').length > 4
                            ? 4
                            : props.goodsDtails?.BaseData?.Atlas.split(';').length > 1
                              ? props.goodsDtails?.BaseData?.Atlas.split(';').length - 1
                              : 1
                    "
                    :slides-to-scroll="1"
                >
                    <template #prevArrow>
                        <div class="custom-slick-arrow" style="left: -2px; z-index: 1">
                            <img
                                class="swiper-nav"
                                :src="getImageUrl('chengjiao/icon1.svg')"
                                alt=""
                            />
                        </div>
                    </template>
                    <template #nextArrow>
                        <div class="custom-slick-arrow" style="right: 0px">
                            <img
                                class="swiper-nav"
                                :src="getImageUrl('chengjiao/icon2.svg')"
                                alt=""
                            />
                        </div>
                    </template>
                    <div
                        class="img-item"
                        v-if="props.goodsDtails?.BaseData?.Atlas.split(';').length - 1 <= 1"
                        :key="props.goodsDtails?.BaseData?.Atlas"
                        @click="changeSwiperItem(0)"
                    >
                        <div class="imgs" :class="active == 0 ? 'active' : ''">
                            <img :src="props.goodsDtails?.BaseData?.Atlas.split(';')[0]" alt="" />
                        </div>
                    </div>
                    <div
                        class="img-item"
                        v-else
                        v-for="(item, index) in (props.goodsDtails?.BaseData?.Atlas || '').split(
                            ';'
                        )"
                        :key="index"
                        @click="changeSwiperItem(index)"
                    >
                        <div class="imgs" :class="active == index ? 'active' : ''">
                            <img :src="item" alt="" />
                        </div>
                    </div>
                </a-carousel>
            </div>
        </div>
        <div
            class="right-wrap"
            :class="[
                props.goodsDtails?.recomData?.length ? '' : 'active',
                props.goodsDtails?.BaseData?.Status == 3 ? 'right-active' : ''
            ]"
        >
            <div class="top">
                <div class="title">
                    <p class="label">
                        {{
                            props.goodsDtails?.BaseData?.Status == 1
                                ? '预展中'
                                : props.goodsDtails?.BaseData?.Status == 2
                                  ? '竞买中'
                                  : props.goodsDtails?.BaseData?.Status == 3
                                    ? '已成交'
                                    : props.goodsDtails?.BaseData?.Status == 7
                                      ? '未成交'
                                      : props.goodsDtails?.BaseData?.Status == 8
                                        ? '已下架'
                                        : '未知状态'
                        }}#{{ props.goodsDtails?.BaseData?.Bn }}
                    </p>
                    <div class="right-time" v-if="props.goodsDtails?.BaseData?.Status == 2">
                        <img :src="getImageUrl('chengjiao/icon5.png')" alt="" />
                        <p>{{ props.goodsDtails?.BaseData?.Ontime }}</p>
                        <TimtClock
                            :time="props.goodsDtails?.BaseData?.Ontime"
                            :TimeNow="props.goodsDtails?.BaseData?.TimeNow"
                            @fetchDataList="fetchDataList"
                        ></TimtClock>
                    </div>
                </div>
                <div class="center">
                    <h5> {{ props.goodsDtails?.BaseData?.Title }} </h5>
                    <div class="element-list">
                        <div class="left-element" v-if="props.goodsDtails?.BaseData?.IsRating == 1">
                            <p class="element-item"
                                >品级: {{ props.goodsDtails?.BaseData?.Official }}
                                <a-tooltip color="#9a0000">
                                    <template #title>我是提示文本</template>
                                    <img :src="getImageUrl('chengjiao/icon6.png')" alt="" />
                                </a-tooltip>
                            </p>
                            <p class="element-item">
                                品相描述：{{ props.goodsDtails?.BaseData?.BDescriptionn }}
                            </p>
                        </div>
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
            <div class="statuss" v-if="props.goodsDtails?.BaseData?.Status == 3">
                <div class="end-time">
                    <p>成交时间:{{ props.goodsDtails?.BaseData?.Ontime }}</p>
                    <!-- <img :src="getImageUrl('chengjiao/icon5.png')" alt="" /> -->
                </div>
                <p class="price">成交价格:¥{{ props.goodsDtails?.offerData?.MakePrice }}</p>
            </div>
            <div
                class="statuss"
                v-if="
                    props.goodsDtails?.BaseData?.Status == 7 ||
                    props.goodsDtails?.BaseData?.Status == 8
                "
            >
                <div class="end-time">
                    <p>{{ props.goodsDtails?.BaseData?.Ontime }}</p>
                    <!-- <img :src="getImageUrl('chengjiao/icon5.png')" alt="" /> -->
                </div>
            </div>

            <div
                class="prices"
                v-if="
                    props.goodsDtails?.BaseData?.Status != 3 &&
                    props.goodsDtails?.BaseData?.Status != 7 &&
                    props.goodsDtails?.BaseData?.Status != 8
                "
            >
                <p class="num"
                    >¥
                    {{
                        props.goodsDtails?.offerData?.MPrice ||
                        props.goodsDtails?.BaseData?.BasePrice
                    }}</p
                >
                <div class="add-price">
                    <div class="change-price">
                        <a-button @click="reducePrice">-</a-button>
                        <a-input @blur="changePrice" v-model:value="value"></a-input>
                        <a-button @click="addPrice">+</a-button>
                    </div>
                    <a-button
                        v-if="!newFirstPrice"
                        :class="isFirstPrice ? 'active' : 'add'"
                        @click="addPriceBtn"
                        >{{ isFirstPrice ? '代理价' : '出价' }}</a-button
                    >
                    <a-button
                        v-if="newFirstPrice"
                        :class="newFirstPrice ? 'active' : 'add'"
                        @click="addPriceBtn"
                    >
                        更新代理价
                    </a-button>
                    <a-button v-if="newFirstPrice" @click="removeDaiLiPrice"> 取消代理 </a-button>
                </div>
                <p class="label">¥ {{ transactionPrice }}(成交价)</p>
                <div class="info">
                    <p> ¥ {{ service }}(服务费率 {{ props.goodsDtails?.offerData?.TipsRate }}%) </p>
                    <a-tooltip color="#9a0000">
                        <template #title>
                            <div class="info-fuwu">
                                <p>服务费基础服务费{{ props.goodsDtails?.offerData?.Tips }}</p>
                                <p>服务费百分比{{ props.goodsDtails?.offerData?.TipsRate }}</p>
                                <p>服务费起征点{{ props.goodsDtails?.offerData?.TipsLevel }}</p>
                                <p>服务费提示信息{{ props.goodsDtails?.offerData?.TipsDes }}</p>
                            </div>
                        </template>
                        <img
                            style="cursor: pointer"
                            :src="getImageUrl('chengjiao/icon6.png')"
                            alt=""
                        /> </a-tooltip
                ></div>
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
            <div class="record" :class="props.goodsDtails?.recomData?.length ? '' : 'active'">
                <div class="title-price">
                    出价记录({{ props.goodsDtails?.recomData?.length }})
                    <span class="more" @click="modal1Visible = true"> 更多 </span>
                </div>
                <Swiper
                    :swiperList="props.goodsDtails?.recomData"
                    :userId="user.userInfo.UserId"
                ></Swiper>
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
                    >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'Unick'">
                                <span :class="record.Uid == user.userInfo.UserId ? 'active' : ''">{{
                                    record.Unick
                                }}</span>
                            </template>
                            <template v-if="column.key === 'MPrice'">
                                <span :class="record.Uid == user.userInfo.UserId ? 'active' : ''"
                                    >¥{{ record.MPrice }}</span
                                >
                            </template>
                            <template v-if="column.key === 'CreateTime'">
                                <span :class="record.Uid == user.userInfo.UserId ? 'active' : ''">{{
                                    record.CreateTime
                                }}</span>
                            </template>
                            <template v-if="column.key === 'IpAddr'">
                                <span :class="record.Uid == user.userInfo.UserId ? 'active' : ''">{{
                                    record.IpAddr
                                }}</span>
                            </template>
                        </template>
                    </a-table>
                </a-modal>
            </div>
        </div>
    </div>

    <div
        class="liucheng"
        :style="{ backgroundImage: `url(${getImageUrl('chengjiao/list6.png')})` }"
    >
        <button class="show-details" @click="router.push('/weituo/online-commission')"
            >查看详细</button
        >
    </div>
    <Item v-if="route.query.show == true"></Item>
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
        .swiper-img {
            margin-top: 20px;
            :deep(.slick-list) {
                width: 86%;
                margin: 0 auto;
            }
            .swiper-nav {
                width: 40px;
            }
            .img-item {
                display: flex !important;
                align-items: center;
                justify-content: center;
                .imgs {
                    padding: 5px;
                    // width: 84px;
                    height: 60px;
                    border: 1px solid transparent;
                    &.active {
                        border-color: #9a0000;
                    }
                    img {
                        height: 50px;
                        margin: 0 auto;
                    }
                }
            }
        }
    }
    .right-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        &.right-active {
            justify-content: space-between;
        }

        &.active {
            gap: 40px;
            justify-content: space-between;
        }
        .title {
            .flex-row;
            justify-content: space-between;
            padding: 15px 15px 15px 40px;
            color: #fff;
            background: url('@/assets/img/weituo/menu-title.png');
            background-size: 100% 100%;
            .label {
                font-size: 20px;
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
                display: flex;
                gap: 50px;
                padding: 0 40px 15px;
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
        .statuss {
            padding: 0 40px;
            .price {
                color: #ff2e00;
                font-size: 20px;
                font-weight: 600;
            }
            p {
                margin-bottom: 20px;
            }
        }
        .prices {
            flex: 1;
            .flex-col;
            justify-content: space-around;
            align-items: flex-start;
            padding: 10px 40px 0;
            .num {
                color: #ff2e00;
                font-size: 26px;
                font-weight: 600;
            }
            .add-price {
                .flex-row;
                justify-content: flex-start;
                gap: 20px;
                .change-price {
                    .flex-row;
                    height: 52px;
                    background-color: #f4f4f4;
                    gap: 2px;
                    .ant-btn {
                        background-color: #e8e8e8;
                        width: 60px;
                        font-size: 16px;
                        border: none;
                    }
                    .ant-input {
                        min-width: 100px;
                        height: 52px;
                        flex: 1;
                        text-align: center;
                        border: none;
                    }
                }
                .ant-btn {
                    width: 120px;
                    &.add {
                        background-color: #fe2e00;
                        color: #fff;
                    }
                    &.active {
                        background-color: #9a0000;
                        color: #fff;
                    }
                }
            }
            .label {
                color: #101010;
            }
            .info {
                .flex-row;
                justify-content: flex-start;
                gap: 10px;
            }
        }
        .record {
            background-color: #f8f8f8;
            &.active {
                opacity: 0;
            }

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
.liucheng {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 22px;
    height: 150px;
    background-size: 100% 100%;
    margin: 30px 0;
    &:hover {
        .show-details {
            background-color: #9a0000;
        }
    }
    .show-details {
        height: 43px;
        border-radius: 10px;
        background-color: #333;
        color: #fff;
        width: 120px;
        border: none;
        margin-top: 1px;
        cursor: pointer;
    }
}
:deep(.ant-table-cell) {
    .active {
        color: #9a0000;
    }
}
</style>
