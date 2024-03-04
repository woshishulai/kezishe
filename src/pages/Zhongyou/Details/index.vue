<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    query: {
        type: Object,
        default: {
            addPrice: true
        }
    }
});
const menuItems = ['收藏商品', '微信分享', '咨询反馈', '购物车(2)'];
const actives = ref(3);

onMounted(() => {});
const value = ref(1);
const setActive = (index) => {
    actives.value = index;
};
</script>

<template>
    <div class="details">
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
            <div class="price">
                <div class="money">
                    ¥ 2，050
                    <p
                        >含服务费
                        <span>¥ 36.00</span>
                    </p>
                </div>
                <p>累计销售0件</p>
            </div>
            <div class="prices">
                <p class="label">配送：上海 ¥12.00 (本商品由壳子社北京仓库为您发货)</p>
                <div class="add-price">
                    <div class="change-price">
                        <span>数量：</span>
                        <a-button>-</a-button>
                        <a-input v-model:value="value"></a-input>
                        <a-button>+</a-button>
                    </div>
                    <span> 有货</span>
                </div>
            </div>
            <div class="btns">
                <a-button class="add">立即购买</a-button>
                <a-button class="add-cart">加入购物车</a-button>
            </div>
        </div>
    </div>
    <div class="right-nav">
        <div
            v-for="(item, index) in menuItems"
            :key="index"
            :class="{ active: actives === index }"
            class="share-item"
            @mouseover="setActive(index)"
            @click="router.push('/cart')"
        >
            {{ item }}
        </div>
    </div>
    <img class="liucheng" :src="getImageUrl('chengjiao/list6.png')" alt="" />
    <div class="cen-wrap">
        <div class="left-hot">
            <div class="title">热卖推荐</div>
            <div class="goods-list">
                <div class="goods-item" v-for="(item, index) in 3" :key="index">
                    <div class="top-img">
                        <img :src="getImageUrl('chengjiao/list2.png')" alt="" />
                    </div>
                    <p class="info">纪11鲁迅再版带厂铭直角边双连新全</p>
                    <p class="price">¥ 198</p>
                    <div class="time"
                        >2023-10-23 <p>( <span>69</span> 个人气 )</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="chengjiao-item">
            <div class="title">
                <h5>商品详情</h5>
                <span></span>
            </div>
            <p class="label">
                为增进中美两回人民的互相了解，特别是让美回人民了解改革开放中的中国，1980年9月13日至12月21日，中华人民共和国展览会先后赴美国的旧含山、芝
                加哥、很约3个城市舞出，介绍了我团的怪济，文化和历史的张况与成就，受到了所到之处关国人民的欢迎，增进了两国人民的友说，在展览会开幕之日，我
                国邮屯部发行了这套纪余邮票，
            </p>
            <div class="img-list">
                <img :src="getImageUrl('chengjiao/list7.png')" alt="" />
                <img :src="getImageUrl('chengjiao/list8.png')" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.details {
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
        .title {
            .flex-row;
            justify-content: space-between;
            padding: 15px 15px 15px 40px;
            color: #ff2e00;
            background-color: #f8f8f8;
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
            padding: 40px;
            border-bottom: 1px solid #e8e8e8;
            .money {
                display: flex;
                align-items: flex-end;
                gap: 20px;
                font-size: 30px;
                margin-bottom: 16px;
                color: #ff2e00;
                span {
                    color: #ff2e00;
                }
            }
            p {
                color: #909090;
                font-size: 16px;
                margin-bottom: 2px;
            }
        }
        .prices {
            padding: 40px;
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
                        text-align: center;
                    }
                }
            }
            .label {
                color: #101010;
            }
        }
        .btns {
            display: flex;
            flex-direction: row;
            gap: 30px;
            padding: 35px 40px 40px;
            .ant-btn {
                padding-left: 40px;
                padding-right: 40px;
                color: #fff;
                &.add {
                    background-color: #ff2e00;
                }
                &.add-cart {
                    background-color: #9a0000;
                }
            }
        }
    }
}
.right-nav {
    position: fixed;
    top: 50%;
    right: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
    width: 50px;
    .share-item {
        padding: 10px;
        line-height: 20px;
        border-bottom: 1px solid #dbdbdb;
        cursor: pointer;
        &:nth-child(5) {
            border: none;
        }
        &.active {
            background-color: #9a0000;
            color: #fff;
        }
    }
}
.liucheng {
    width: 100%;
    margin: 30px 0;
}
.cen-wrap {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-bottom: 40px;
    .left-hot {
        width: 270px;
        .title {
            background-color: #e6574f;
            color: #fff;
            padding: 20px;
            font-size: 18px;
        }
        .goods-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background-color: #fbf0d0;
            padding: 20px 10px;
            .goods-item {
                position: relative;
                background-color: #f8f8f8;
                cursor: pointer;
                .top-img {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    height: 231px;
                    background-color: #fff;
                    img {
                        width: 100%;
                    }
                }
                p {
                    .ellipsis;
                    padding: 0 20px;
                    &.info {
                        margin-top: 20px;
                        font-size: 20px;
                    }
                    &.price {
                        color: #9a0000;
                        font-size: 24px;
                        margin: 10px 0;
                    }
                }
                .time {
                    margin: 10px 0 15px;
                    padding: 0 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    span {
                        color: #9a0000;
                    }
                }
            }
        }
    }
    .chengjiao-item {
        .title {
            background: url('@/assets/img/home/lang-bg.jpg');
            .flex-col;

            h5 {
                color: #e5574f;
                margin: 20px 0 10px;
                font-size: 22px;
                font-weight: 600;
            }

            span {
                width: 160px;
                height: 5px;
                background: #eb655c;
            }
        }
        .label {
            padding: 40px 30px;
            line-height: 30px;
            font-size: 16px;
        }
        .img-list {
            display: flex !important;
            justify-content: center;
            gap: 40px;
            margin-bottom: 80px;
            img {
                width: 600px;
                height: 480px;
            }
        }
    }
}
</style>
