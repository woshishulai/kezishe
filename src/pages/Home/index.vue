<script setup>
import Banner from './item/Banner.vue';
import Cate from './item/Cate.vue';
import Activity from './item/Activity.vue';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="wrap">
        <Banner></Banner>
        <Cate></Cate>
        <Activity></Activity>
        <img class="guanggao" :src="getImageUrl('home/guanggaode.jpg')" alt="" />
        <!-- <div class="guanggao">
            <img :src="getImageUrl('global/logo1.png')" alt="" />
            <span></span>
            <div class="text-wrap">
                <p class="title">您身边藏品保护专家</p>
                <p class="details">新人见面礼注册即送288元的大礼包</p>
            </div>
        </div> -->
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.wrap {
    background: url('@/assets/img/home/bg.png');

    .guanggao {
        width: 100%;
    }
}

// .guanggao {
//     .flex-row;
//     padding: 37px;
//     background: red;
//     gap: 40px;

//     span {
//         width: 3px;
//         height: 100px;
//         background: #e4cb82;
//     }

//     .text-wrap {
//         color: #e4cb82;
//         gap: 25px;

//         .title {
//             font-size: 30px;
//             font-weight: 600;
//         }

//         .details {
//             margin-top: 25px;
//             font-size: 22px;
//         }
//     }
// }
</style>
