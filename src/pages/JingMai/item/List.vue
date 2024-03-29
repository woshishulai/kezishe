<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const router = useRouter();
const props = defineProps({
    SpecialList: {
        type: Array,
        default: []
    }
});
const value1 = ref(['1', '2']); //筛选条件
//筛选后的数组
const list = ref([]);
const paginations = ref({
    pageSize: 5, //每页展示多少个
    total: list.length //总共多少
});
const cateList = [
    {
        value: '1',
        label: '预展'
    },
    {
        value: '2',
        label: '竞拍'
    }
];
watch(
    () => props.SpecialList,
    (newVal) => {
        list.value = newVal;
        paginations.value.total = newVal.length;
    }
);
//筛选发生变化
const onCheckAllChange = () => {
    list.value = props.SpecialList.filter((item) => {
        return value1.value.includes(item.SType);
    });
    paginations.value.total = list.value.length;
    console.log(list.value); //3
};
//查看专场详情
const showGoods = (item) => {
    console.log(item);
    router.push({
        path: '/jingmai/show-goods',
        query: {}
    });
};
</script>

<template>
    <div class="jinmai-list">
        <div class="cate-item">
            <h5 class="cate-title"> 类型: </h5>
            <a-checkbox-group
                v-model:value="value1"
                name="checkboxgrosssfffup"
                :options="cateList"
                @change="onCheckAllChange"
            />
        </div>
        <h3>开售</h3>
        <div class="goods-list">
            <div
                class="goods-item"
                v-for="(item, index) in list"
                :key="item.Id"
                @click="showGoods(item)"
            >
                <img :src="item.Img" :alt="item.Title" />
                <div class="right-text">
                    <h5>{{ item.Title }}</h5>
                    <p class="time">时间：{{ item.Starttime }}- {{ item.Ontime }}</p>
                    <p class="details">
                        {{ item.SubTitle }}
                    </p>
                    <div class="btn">
                        <span>查看详情</span>
                    </div>
                </div>
            </div>
        </div>
        <cate-page :paginations="paginations"></cate-page>
    </div>
</template>
<style lang="less">
.jinmai-list {
    margin: 0 0 30px;
    .cate-item {
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 20px 0 14px;
        border-bottom: 1px solid #dbdbdb;
    }
    h3 {
        margin-top: 30px;
        text-align: center;
        font-size: 24px;
        color: #000;
        font-weight: 600;
    }
    .goods-list {
        .flex-col;
        gap: 30px;
        align-items: flex-start;
        padding: 40px 0;
        .goods-item {
            .flex-row;
            justify-content: flex-start;
            gap: 40px;
            width: 100%;
            padding: 20px 16px;
            background: #f8f8f8;
            border-radius: 10px;
            box-shadow: 0 1px 18px 0 #f3f3f3;
            img {
                width: 350px;
                height: 256px;
            }
            .right-text {
                flex: 1;
                h5 {
                    font-size: 20px;
                    font-weight: 600;
                }
                p {
                    font-size: 16px;
                    font-weight: 500;
                    margin: 20px 0;
                }
                .btn {
                    padding: 0 30px;
                    margin-top: 30px;
                    .flex-row;
                    justify-content: flex-end;
                    span {
                        padding: 6px 8px;
                        cursor: pointer;
                        border-bottom: 1px solid #666;
                    }
                }
            }
        }
        .goods-item:hover {
            h5 {
                color: #9a0000;
            }
            .btn {
                span {
                    // border: 1px solid #9a0000;
                    border-bottom: 1px solid #9a0000;
                    color: #9a0000;
                    font-weight: 600;
                }
            }
        }
    }
    .pagination-wrap {
        .flex-row;
        padding: 20px 0 40px;
    }
}
</style>
