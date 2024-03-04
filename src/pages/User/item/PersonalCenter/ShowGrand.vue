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
        title: '竞买',
        num: 5,
        label: '五钻会员',
        chengzhang: '成长值',
        chengzhang1: '9266',
        baoji: '',
        baoji1: '6184',
        time: '',
        image: 'user/zuanshi.png'
    },
    {
        title: '委托',
        num: 3,
        label: '',
        chengzhang: '',
        baoji: '',
        time: '',
        image: 'user/wjx.png'
    }
];
</script>

<template>
    <div class="show-grand">
        <div
            class="card-box"
            v-for="item in list"
            :key="item.title"
            :style="{ backgroundImage: 'url(' + getImageUrl(item.image) + ')' }"
            :class="item.title == '委托' ? 'active' : ''"
        >
            <h5>{{ item.title }}</h5>
            <div class="icons">
                <img
                    v-for="i in item.num"
                    :key="i"
                    :src="getImageUrl(item.title === '委托' ? 'user/xing.jpg' : 'user/zuan.jpg')"
                    alt=""
                />
            </div>
            <div class="info"> 五星会员 </div>
            <div class="text">
                <p>成长值: 9266</p>
                <p>保级还需: 6184</p>
                <p>晋级还需: 6184</p>
            </div>
            <div class="time"> 会员有效期至 2024.02.09 </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.show-grand {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 80px 60px;
    background-color: #fff;
    .card-box {
        width: 471px;
        height: 253px;
        background-size: 100% 100%;
        padding: 32px 60px 35px;
        cursor: pointer;
        &.active {
            color: #634020;
        }
        h5 {
            font-size: 22px;
        }
        .icons {
            margin: 7px 0;
            img {
                width: 20px;
                height: 17px;
            }
        }
        .info {
            font-size: 16px;
        }
        .text {
            margin-top: 18px;
            p {
                margin-bottom: 6px;
            }
        }
        .time {
            margin-top: 29px;
        }
    }
}
</style>
