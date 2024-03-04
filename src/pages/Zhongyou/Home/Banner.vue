<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const swiperList = [
    {
        img: 'home/banner1.jpg'
    },
    {
        img: 'home/banner2.jpg'
    }
];
const activeKey = ref(['1']);
const list = [
    {
        value: '邮品'
    },
    {
        value: '钱币'
    },
    {
        value: '磁卡'
    },
    {
        value: '集藏用品'
    },
    {
        value: '书画'
    },
    {
        value: '当代艺术'
    },
    {
        value: '综合其他'
    }
];
const cateList = [
    {
        title: '中国现代银币',
        list: [
            {
                details: '全集年票'
            },
            {
                details: '纪特邮票'
            },
            {
                details: 'JT邮票'
            },
            {
                details: '“文”字头邮票'
            },
            {
                details: '编年新邮'
            },
            {
                details: '小本票'
            },
            {
                details: '编号邮票'
            },
            {
                details: '普改航欠军'
            }
        ]
    },
    {
        title: '中国流通纪念币',
        list: [
            {
                details: '民国邮票'
            },
            {
                details: '解放区邮票'
            }
        ]
    },
    {
        title: '封片间',
        list: [
            {
                details: '中国现代金银币'
            },
            {
                details: '中国流通纪念币'
            },
            {
                details: '中国近代机制币'
            },
            {
                details: '外国金银币'
            },
            {
                details: '新中国纸钞'
            },
            {
                details: '明清纸钞'
            },
            {
                details: '民国纸钞'
            },
            {
                details: '香港纸钞'
            },
            {
                details: '澳门纸钞'
            }
        ]
    },
    {
        title: '港澳台邮票',
        list: [
            {
                details: '清代封片间'
            },
            {
                details: '纪特邮票'
            },
            {
                details: '新中国纸钞'
            },
            {
                details: '明清纸钞'
            },
            {
                details: '民国纸钞'
            },
            {
                details: '香港纸钞'
            },
            {
                details: '澳门纸钞'
            }
        ]
    },
    {
        title: '中国现代银币',
        list: [
            {
                details: '全集年票'
            },
            {
                details: '纪特邮票'
            },
            {
                details: 'JT邮票'
            },
            {
                details: '“文”字头邮票'
            },
            {
                details: '编年新邮'
            },
            {
                details: '小本票'
            },
            {
                details: '编号邮票'
            },
            {
                details: '普改航欠军'
            }
        ]
    },
    {
        title: '中国流通纪念币',
        list: [
            {
                details: '民国邮票'
            },
            {
                details: '解放区邮票'
            }
        ]
    },
    {
        title: '封片间',
        list: [
            {
                details: '中国现代金银币'
            },
            {
                details: '中国流通纪念币'
            },
            {
                details: '中国近代机制币'
            },
            {
                details: '外国金银币'
            },
            {
                details: '新中国纸钞'
            },
            {
                details: '明清纸钞'
            },
            {
                details: '民国纸钞'
            },
            {
                details: '香港纸钞'
            },
            {
                details: '澳门纸钞'
            }
        ]
    }
];
const active = ref('');
const changeActive = (index) => {
    console.log(index);
    active.value = index;
};
const removeActive = () => {
    active.value = '';
};
</script>

<template>
    <div class="banner">
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="全部商品">
                <p
                    class="show-menu"
                    v-for="(item, index) in list"
                    :class="{ active: active === index }"
                    :key="index"
                    @mouseover="changeActive(index)"
                    >{{ item.value }}
                    <i class="iconfont icon-right"></i>
                </p>
                <div
                    class="menu-details"
                    @mouseleave="removeActive()"
                    :class="{ active: active !== '' }"
                >
                    <div class="menu-item" v-for="(item, index) in cateList" :key="index">
                        <span class="details-title">
                            <i class="iconfont icon-right"></i> {{ item.title }}</span
                        >
                        |
                        <p class="details">
                            <span
                                v-for="(i, iIndex) in item.list"
                                :key="iIndex"
                                @click="router.push('/zhongyou/list')"
                            >
                                <i class="iconfont icon-right"></i>
                                {{ i.details }}</span
                            >
                        </p>
                    </div>
                </div>
            </a-collapse-panel>
        </a-collapse>
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
</template>

<style scoped lang="less">
.banner {
    display: flex;
    flex-direction: row;
    gap: 15px;
    :deep(.ant-collapse) {
        width: 300px;
        position: relative;
        background-color: #fffaeb;

        .ant-collapse-header {
            background-color: #9a0000;
            color: #fff;
            .ant-collapse-arrow svg {
                color: #fff;
            }
        }
        .ant-collapse-item {
            margin-bottom: 0;
            .ant-collapse-content-box {
                padding: 5px 0 10px;
                background-color: #fffaeb;
                .show-menu {
                    padding: 8px 20px 8px 40px;
                    margin-bottom: 2px;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                    color: #9a0000;
                    background-size: 100% 100%;
                    &.active,
                    &:hover {
                        background: url('@/assets/img/weituo/menu-title.png');
                        color: #fff;
                    }
                }
                .menu-details {
                    position: absolute;
                    left: 300px;
                    top: 0;
                    z-index: -10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 1100px;
                    background-color: #fffaec;
                    height: 367px;
                    &.active {
                        z-index: 100;
                        border: 2px solid #a71d13;
                    }
                    .menu-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        cursor: pointer;
                        padding: 0 20px;
                        .details-title {
                            width: 130px;
                            color: #9a0000;
                        }
                        .details {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            span {
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                &:hover {
                                    color: #9a0000;
                                    i {
                                        color: #9a0000;
                                    }
                                }
                                i {
                                    font-size: 14px;
                                    color: #fffaec;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .swiper-wrap {
        flex: 1;
        min-width: 950px;
        .swiper-img {
            height: 361px;
        }
    }
}
</style>
