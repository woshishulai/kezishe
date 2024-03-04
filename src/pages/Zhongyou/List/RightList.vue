<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const state = reactive({
    one: true,
    two: false,
    there: false,
    four: false
});
const list = computed(() => [
    {
        title: '上架时间',
        right: state.one
    },
    {
        title: '销量',
        right: state.two
    },
    {
        title: '价格',
        right: state.there
    }
]);
const changeState = (index) => {
    const key = Object.keys(state)[index];
    if (key) {
        // 取反状态
        state[key] = !state[key];

        console.log(state[key]);
    }
};
</script>

<template>
    <div class="right-list">
        <div class="title">
            <span>综合</span>
            <p
                :class="item.right ? 'active' : ''"
                v-for="(item, index) in list"
                :key="index"
                @click="changeState(index)"
            >
                {{ item.title }}
                <i
                    :class="item.right ? 'icon-arrow-top' : ' icon-arrowbottom'"
                    class="iconfont"
                ></i>
            </p>
            <p @click="changeState(3)">
                <a-checkbox v-model:checked="state.four">仅显示成交记录</a-checkbox>
            </p>
        </div>
        <div class="goods-list">
            <div
                class="goods-item"
                @click="router.push('/zhongyou/details')"
                v-for="(item, index) in 20"
                :key="index"
            >
                <div class="top-img">
                    <img :src="getImageUrl('chengjiao/list1.png')" alt="" />
                </div>
                <p class="info">蓝颜 纯手工主人杯 升级版</p>
                <p class="price">¥ 299</p>
                <p class="add">
                    <span>已收藏 <i class="iconfont icon-star"></i></span>
                    <span class="card">
                        <i class="iconfont icon-cc-cart"></i>
                    </span>
                </p>
            </div>
        </div>
        <CatePage></CatePage>
    </div>
</template>

<style scoped lang="less">
.right-list {
    flex: 1;
    .title {
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 20px 40px;
        background-color: #eeeeee;
        font-size: 16px;
        p {
            cursor: pointer;
            &.active {
                color: #9a0000;
            }
            i {
                margin-left: 5px;
            }
            :deep(.ant-checkbox-wrapper) {
                font-size: 16px;
                color: #000;
            }
        }
    }
    .goods-list {
        display: flex;
        flex-direction: row;
        gap: 8px;
        flex-wrap: wrap;
        padding: 20px 0;
        .goods-item {
            min-width: 23%;
            flex: 1;
            padding: 20px 10px;
            background-color: #f8f8f8;
            cursor: pointer;
            .top-img {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 227px;
                background-color: #fff;
            }
            p {
                margin-top: 10px;
                &.info {
                    margin-top: 25px;
                    font-size: 18px;
                }
                &.price {
                    color: #9a0000;
                    font-size: 20px;
                }
                &.add {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .card {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 26px;
                        height: 26px;
                        border-radius: 50%;
                        background-color: #9a0000;
                        color: #fff;
                        font-weight: 600;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
