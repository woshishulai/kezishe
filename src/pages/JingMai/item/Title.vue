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
        code: '623154001',
        name: '何红',
        address: '国宾礼艺术家',
        details: '国色天香'
    },
    {
        code: '623154038',
        name: '李学亮',
        address: '中国美协',
        details: '丘山高隐图'
    },
    {
        code: '623154052',
        name: '赵中月',
        address: '书画名家',
        details: '归图'
    },
    {
        code: '623154013',
        name: '孙宝山',
        address: '中国书协',
        details: '随缘自觉'
    },
    {
        code: '623154001',
        name: '何红',
        address: '国宾礼艺术家',
        details: '国色天香'
    },
    {
        code: '623154038',
        name: '李学亮',
        address: '中国美协',
        details: '丘山高隐图'
    },
    {
        code: '623154052',
        name: '赵中月',
        address: '书画名家',
        details: '归图'
    },
    {
        code: '623154013',
        name: '孙宝山',
        address: '中国书协',
        details: '随缘自觉'
    }
];
</script>

<template>
    <div class="top-title">
        <div class="title">
            <h5>南海画院院长、南海美协主席、广东省美术家协会会员 黎-明-晖 国画专场</h5>
            <p>时间 : 09.02 - 09.04</p>
        </div>
        <div class="show-goods-list">
            <img :src="getImageUrl('jingmai/list/list1.png')" alt="" />
            <div class="text-wrap">
                <p class="info-title">
                    锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示，敬请各位藏友喜欢！
                </p>
                <p class="welcome"> 在此推荐部分藏品与大家分享，欢迎</p>
                <div class="goods-list">
                    <p class="goods-item" v-for="(item, index) in list" :key="index">
                        藏品编号：{{ item.code }} {{ item.name }} ({{ item.address }})
                        {{ item.details }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.top-title {
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        background-color: #e8e8e8;
        h5 {
            font-size: 20px;
            color: #9a0000;
        }
        p {
            font-size: 16px;
        }
    }
    .show-goods-list {
        display: flex;
        flex-direction: row;
        gap: 30px;
        padding: 20px;
        background-color: #f8f8f8;
        img {
            width: 346px;
        }
        .text-wrap {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .goods-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .goods-item {
                    width: 40%;
                    margin: 10px 0;
                    color: #303030;
                }
            }
        }
    }
}
</style>
