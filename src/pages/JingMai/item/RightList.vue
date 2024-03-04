<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const showList = ref(4);
const changeShowList = (index) => {
    showList.value = index;
};
</script>

<template>
    <div class="right-list">
        <div class="title">
            <span></span>
            <h5>全部藏品列表</h5>
            <div class="right-icon">
                <i
                    :class="{ active: showList === 4 }"
                    @click="changeShowList(4)"
                    class="iconfont icon-menu"
                ></i>
                <i
                    @click="changeShowList(2)"
                    :class="{ active: showList !== 4 }"
                    class="iconfont cu icon-menu1"
                ></i>
            </div>
        </div>
        <div :class="showList === 4 ? 'goods-list' : 'flex-list'">
            <div
                class="goods-item"
                @click="router.push('/jingmai/goods-details')"
                v-for="(item, index) in 28"
                :key="index"
            >
                <div class="top-img">
                    <img :src="getImageUrl('jingmai/list/list2.png')" alt="" />
                </div>
                <div class="text-wrap">
                    <h5>{{ '蓝颜 纯手工主人杯 升级版' }}</h5>
                    <p class="price">¥{{ 299 }}</p>
                    <p class="time">{{ '2023-10-23 10:23:20' }}</p>
                    <p v-if="showList === 2">评级公司: PMG</p>
                    <div v-if="showList === 4" class="info"
                        ><span>分数: {{ 100 }} 分</span>
                        <p>
                            <span class="add">已收藏</span> <i class="iconfont icon-star active"></i
                        ></p>
                    </div>
                    <p v-if="showList === 2" class="label"
                        >品相描述：
                        锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示
                    </p>
                    <p v-if="showList === 2" class="add"
                        >已收藏 <i class="iconfont icon-star active"></i
                    ></p>
                </div>
            </div>
        </div>
        <CatePage></CatePage>
    </div>
</template>

<style scoped lang="less">
.right-list {
    flex: 1;
    font-size: 16px;
    // background-color: #fff;
    i {
        font-size: 24px;
        cursor: pointer;
        &.cu {
            font-weight: 600;
        }
        &.active {
            color: #fc3530;
        }
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #f4f4f4;
        h5 {
            font-size: 20px;
        }
        .right-icon {
            display: flex;
            gap: 20px;
        }
    }
    .goods-list {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px 8px;
        .goods-item {
            flex: 1;
            min-width: 23%;
            background-color: #f4f4f4;
            padding: 20px 16px;
            cursor: pointer;
            .top-img {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 228px;
                padding: 20px;
                background-color: #fff;
                img {
                    width: 100%;
                }
            }
            h5 {
                font-size: 18px;
                margin-top: 20px;
                .ellipsis;
            }
            .price {
                margin-top: 10px;
                font-weight: 600;
                font-size: 20px;
                color: #9a0000;
            }
            .time {
                margin-top: 10px;
            }
            .info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 10px;
                p {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
            }
        }
    }
    .flex-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px 16px;
        padding: 20px 0;
        .goods-item {
            min-width: 48%;
            flex: 1;
            display: flex;
            flex-direction: row;
            gap: 20px;
            background-color: #f4f4f4;
            padding: 20px 30px 20px 20px;
            cursor: pointer;
            .top-img {
                display: flex;
                flex-direction: row;
                align-items: center;
                min-width: 225px;
                height: 225px;
                background-color: #fff;
                padding: 20px;
                img {
                    width: 100%;
                }
            }
            .text-wrap {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                h5 {
                    font-size: 18px;
                    .ellipsis;
                }
                .price {
                    font-weight: 600;
                    font-size: 20px;
                    color: #9a0000;
                }
                .label {
                    line-height: 20px;
                }
                .add {
                    text-align: right;
                }
            }
        }
    }
}
</style>
