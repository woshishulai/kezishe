<script setup>
import { getImageUrl } from '@/utils';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const list = [
    {
        img: 'home/activity/list1.jpg'
    },
    {
        img: 'home/activity/list2.jpg'
    },
    {
        img: 'home/activity/list3.jpg'
    },
    {
        img: 'home/activity/list3.jpg'
    },
    {
        img: 'home/activity/list3.jpg'
    }
];
</script>

<template>
    <div class="home-activity">
        <div class="title">
            <img :src="getImageUrl('home/activity/activity-left.png')" alt="活动" />
            <img :src="getImageUrl('home/activity/red-left-jiantou.png')" alt="活动" />
            <h5>活动专页</h5>
            <img :src="getImageUrl('home/activity/red-right-jiantou.png')" alt="活动" />
            <img :src="getImageUrl('home/activity/activity-right.png')" alt="活动" />
        </div>
        <div class="img-list" @click="router.push('/jingmai')">
            <div class="top-img">
                <img
                    v-for="item in list.slice(0, 2)"
                    :key="item.img"
                    :src="getImageUrl(item.img)"
                    alt="图片"
                />
            </div>
            <img
                v-for="item in list.slice(2, 5)"
                :key="item.img"
                :src="getImageUrl(item.img)"
                alt="图片"
            />
        </div>
    </div>
</template>
<style scoped lang="less">
.home-activity {
    width: 1400px;
    margin: 20px auto 0;

    .title {
        .flex-row;
        gap: 10px;
        font-size: 30px;
        font-weight: 600;
        color: #9a0000;
    }

    .img-list {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        padding: 60px 0 47px;
        cursor: pointer;

        .top-img {
            .flex-row;
            gap: 40px;

            img {
                width: 48%;
            }
        }

        img {
            width: 31%;
            flex: 1;
        }
    }
}
</style>
