<script setup>
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { ref } from 'vue';
const props = defineProps({
    query: {
        type: Object,
        default: {}
    }
});
const router = useRouter();
const route = useRoute();
const list = [
    {
        img: 'jingmai/list/list1.png',
        title: '南海画院院长、南海美协主席、广东省美术家协会会员 黎-明-晖 国画专场',
        time: '时间：09.02 - 09.04',
        details:
            '锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示，敬请各位藏友喜欢！',
        btn: '查看详情'
    },
    {
        img: 'jingmai/list/list2.png',
        title: '郎窑红瓷器专场，一色写尽天下风光',
        time: '时间：09.02 - 09.04',
        details:
            '锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示，敬请各位藏友喜欢！',
        btn: '查看详情'
    },
    {
        img: 'jingmai/list/list3.png',
        title: '郎窑红瓷器专场，一色写尽天下风光',
        time: '时间：09.02 - 09.04',
        details:
            '锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示，敬请各位藏友喜欢！',
        btn: '查看详情'
    },
    {
        img: 'jingmai/list/list2.png',
        title: '郎窑红瓷器专场，一色写尽天下风光',
        time: '时间：09.02 - 09.04',
        details:
            '锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示，敬请各位藏友喜欢！',
        btn: '查看详情'
    },
    {
        img: 'jingmai/list/list1.png',
        title: '郎窑红瓷器专场，一色写尽天下风光',
        time: '时间：09.02 - 09.04',
        details:
            '锦上添花书画专场共120余件拍品，作品类别丰富，题材多样，适合收藏和展示，敬请各位藏友喜欢！',
        btn: '查看详情'
    }
];
</script>

<template>
    <div class="jinmai-list">
        <h3>开售</h3>
        <div class="goods-list">
            <div
                class="goods-item"
                v-for="(item, index) in list"
                :key="index"
                @click="router.push(props.query.path)"
            >
                <img :src="getImageUrl(item.img)" alt="商品" />
                <div class="right-text">
                    <h5>{{ item.title }}</h5>
                    <p class="time">{{ item.time }}</p>
                    <p class="details">
                        {{ item.details }}
                    </p>
                    <div class="btn">
                        <span>{{ item.btn }}</span>
                    </div>
                </div>
            </div>
        </div>
        <cate-page></cate-page>
    </div>
</template>
<style lang="less">
.jinmai-list {
    margin: 30px 0;
    h3 {
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
