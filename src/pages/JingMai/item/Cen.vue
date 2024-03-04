<script setup>
import { ref } from 'vue';
import { getImageUrl } from '@/utils/index';
const swiperList = [
    {
        img: 'home/banner1.jpg'
    },
    {
        img: 'home/banner2.jpg'
    }
];
const value1 = ref([]);
// const checkboxList = [
//     // {
//     //   title: "类别 ：",
//     //   details: [
//     //     {
//     //       text: "邮品",
//     //     },
//     //     {
//     //       text: "艺术",
//     //     },
//     //     {
//     //       text: "钱币",
//     //     },
//     //     {
//     //       text: "文献",
//     //     },
//     //     {
//     //       text: "书画",
//     //     },
//     //   ],
//     // },
//     // {
//     //   title: "状态 ：",
//     //   details: [
//     //     {
//     //       text: "预展",
//     //     },
//     //     {
//     //       text: "竞买中",
//     //     },
//     //   ],
//     // },
//     {
//         title: '类型 ：',
//         details: [
//             {
//                 text: '竞买'
//             },
//             {
//                 text: '一口价'
//             }
//         ]
//     }
// ];
const cateList = [
    {
        value: '竞买',
        label: '竞买'
    },
    {
        value: '一口价',
        label: '一口价'
    }
];
</script>

<template>
    <div class="jinmai-banner">
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
        <div class="cate-item">
            <h5 class="cate-title"> 类型: </h5>
            <a-checkbox-group
                v-model:value="value1"
                name="checkboxgrosssfffup"
                :options="cateList"
            />
        </div>
    </div>
</template>
<style lang="less">
.jinmai-banner {
    .swiper-wrap {
        height: 315px;
        .swiper-img {
            height: 315px;
        }
    }
    .cate-item {
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 20px 0 14px;
        border-bottom: 1px solid #dbdbdb;
    }
}
</style>
