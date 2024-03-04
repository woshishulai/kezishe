<script setup>
import { getImageUrl } from '@/utils/index';
const textList = [
    {
        label: '《方寸乾坤-7月邮品精品专场》于7.29-31日与大家预期而约。'
    },
    {
        label: '首届2023涌藏收藏卡博览会于11月3-5日举行！'
    },

    {
        label: '源泰金标信销（旧票）邮票特场（3期）'
    }
];
const swiperList = [
    {
        img: 'home/banner1.jpg'
    },
    {
        img: 'home/banner2.jpg'
    }
];
const liuchengList = [
    {
        num: '01',
        text1: '填写申请',
        text2: '提交委托'
    },
    {
        num: '02',
        text1: '委托确认',
        text2: '寄送藏品'
    },
    {
        num: '03',
        text1: '专家鉴定',
        text2: '双方确认'
    },
    {
        num: '04',
        text1: '参加',
        text2: '预展竞买'
    },
    {
        num: '05',
        text1: '等待',
        text2: '卖家支付'
    },
    {
        num: '06',
        text1: '结算',
        text2: ''
    }
];
const infoList = [
    {
        text: '十万全球高净值用户',
        shu: '|'
    },
    {
        text: '短至十天回款',
        shu: '|'
    },
    {
        text: '年交易60万件,成交率96%',
        shu: '|'
    },
    {
        text: '服务网点全覆盖',
        shu: '|'
    },
    {
        text: '低收费高回报',
        shu: '|'
    },
    {
        text: '免费估值',
        shu: ''
    }
];
const onChange = (current) => {
    console.log(current);
};
</script>

<template>
    <div class="home-banner">
        <div class="con-main-wrap">
            <div class="show-banner">
                <div class="dynamic-wrap">
                    <div class="new-wrap">
                        <h2>欢迎登录壳子社</h2>
                        <div class="login-wrap">
                            <a-button>
                                <img :src="getImageUrl('home/icon1.jpg')" alt="注册" />
                                <span>注册</span>
                            </a-button>
                            <a-button>
                                <img :src="getImageUrl('home/icon2.png')" alt="登录" />
                                <span>登录</span>
                            </a-button>
                        </div>
                        <div class="card-wrap">
                            <div class="top-info">
                                <h5>最新动态 <span> > </span></h5>
                                <span>更多</span>
                            </div>
                            <div class="text-list">
                                <p
                                    class="text-item"
                                    @click="$router.push('/shougou')"
                                    v-for="item in textList"
                                    :key="item.label"
                                >
                                    {{ item.label }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-wrap">
                    <a-carousel autoplay>
                        <img
                            class="swiper-img"
                            v-for="item in swiperList"
                            :key="item.img"
                            :src="getImageUrl(item.img)"
                            alt="img"
                        />
                    </a-carousel>
                </div>
            </div>

            <div class="liucheng-nav">
                <div class="left-wrap">
                    <div class="text-wrap">
                        <h5>委托出售</h5>
                        <span>ENTRUSTED SALE</span>
                    </div>
                    <img :src="getImageUrl('home/xian1.jpg')" alt="" />
                </div>
                <div class="cen-wrap">
                    <div class="text-item" v-for="item in liuchengList" :key="item.text">
                        <div class="text-info">
                            <span class="num">{{ item.num }}</span>
                            <p>{{ item.text1 }}</p>
                            <p>{{ item.text2 }}</p>
                        </div>
                        <img :src="getImageUrl('home/jiantou-right.png')" alt="" />
                    </div>
                </div>
                <div class="submit-wrap" @click="$router.push('/weituo')">
                    <img :src="getImageUrl('home/icon3.png')" alt="" />
                    <p>立即委托</p>
                </div>
            </div>
            <div class="info-me">
                我们的优势：
                <p v-for="item in infoList" :key="item.text">
                    <span>{{ item.text }}</span>
                    <span>{{ item.shu }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.home-banner {
    .show-banner {
        padding: 36px 0;
        display: flex;
        flex-direction: row;
        gap: 26px;

        .dynamic-wrap {
            padding: 44px 20px 24px 20px;
            background: #c83327;

            .new-wrap {
                h2 {
                    text-align: center;
                    font-size: 22px;
                    color: #fcdca5;
                }

                .login-wrap {
                    padding: 0 12px;
                    margin-top: 22px;
                    .flex-row;
                    justify-content: space-between;

                    .ant-btn-default {
                        .flex-row;
                        background: #fcdca5;
                        border: none;
                        padding: 20px 40px;
                        gap: 14px;
                        font-size: 22px;
                        color: #c83327;
                        font-weight: 600;
                    }
                }
            }

            .card-wrap {
                margin-top: 20px;
                background: #fff;
                border-radius: 12px;
                padding-bottom: 20px;

                .top-info {
                    .flex-row;
                    padding: 20px;
                    justify-content: space-between;

                    h5 {
                        font-size: 20px;
                        font-weight: 600;
                    }

                    span {
                        font-size: 16px;
                        color: #3f3f3f;
                        cursor: pointer;
                    }
                }

                .text-list {
                    .flex-col;

                    .text-item {
                        width: 360px;
                        padding: 12px;
                        border-top: 1px dotted #ebebeb;
                        line-height: 24px;
                        cursor: pointer;
                    }
                }
            }
        }

        .swiper-wrap {
            flex: 1;
            min-width: 950px;

            .swiper-img {
                height: 457px;
            }
        }
    }

    .liucheng-nav {
        padding: 20px;
        .flex-row;
        justify-content: space-between;
        background: #fff;

        // box-shadow: 5px 5px 5px 5px #e9ebee;
        .left-wrap {
            .flex-row;
            gap: 10px;

            .text-wrap {
                .flex-col;
                gap: 10px;

                h5 {
                    color: #ae3333;
                    font-weight: 600;
                    font-size: 20px;
                }

                span {
                    background: #f6f6f6;
                    padding: 5px 10px;
                    font-size: 14px;
                }
            }
        }

        .cen-wrap {
            .flex-row;
            align-items: flex-start;
            gap: 40px;

            .text-item {
                .flex-row;
                gap: 40px;

                .text-info {
                    .flex-col;

                    .num {
                        .flex-col;
                        width: 46px;
                        height: 46px;
                        border-radius: 50%;
                        font-size: 20px;
                        color: #ae3333;
                        font-weight: 600;
                        background: #f4f0f0;
                        margin-bottom: 10px;
                    }

                    p {
                        line-height: 20px;
                        font-size: 14px;
                    }
                }
            }
        }

        .submit-wrap {
            height: 100px;
            width: 130px;
            background: url('@/assets/img/home/submit.png');
            background-size: 100% 100%;
            .flex-col;
            color: #fff;
            gap: 10px;
            cursor: pointer;
        }
    }

    .info-me {
        padding: 40px 0 0 40px;
        .flex-row;
        justify-content: flex-start;
        gap: 10px;
        color: #ae3333;
        font-weight: 600;

        p {
            font-weight: 600;
            .flex-row;
            gap: 25px;
        }
    }
}
</style>
