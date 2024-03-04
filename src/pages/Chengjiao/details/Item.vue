<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="chengjiao-item">
        <img class="liucheng" :src="getImageUrl('chengjiao/list6.png')" alt="" />
        <div class="title">
            <h5>商品详情</h5>
            <span></span>
        </div>
        <p class="label">
            为增进中美两回人民的互相了解，特别是让美回人民了解改革开放中的中国，1980年9月13日至12月21日，中华人民共和国展览会先后赴美国的旧含山、芝
            加哥、很约3个城市舞出，介绍了我团的怪济，文化和历史的张况与成就，受到了所到之处关国人民的欢迎，增进了两国人民的友说，在展览会开幕之日，我
            国邮屯部发行了这套纪余邮票，
        </p>
        <div class="img-list">
            <img :src="getImageUrl('chengjiao/list7.png')" alt="" />
            <img :src="getImageUrl('chengjiao/list8.png')" alt="" />
        </div>
    </div>
</template>

<style scoped lang="less">
.chengjiao-item {
    .liucheng {
        margin: 30px 0;
    }
    .title {
        background: url('@/assets/img/home/lang-bg.jpg');
        .flex-col;

        h5 {
            color: #e5574f;
            margin: 20px 0 10px;
            font-size: 22px;
            font-weight: 600;
        }

        span {
            width: 160px;
            height: 5px;
            background: #eb655c;
        }
    }
    .label {
        padding: 40px 30px;
        line-height: 30px;
        font-size: 16px;
    }
    .img-list {
        display: flex !important;
        justify-content: center;
        gap: 40px;
        margin-bottom: 80px;
        img {
            width: 600px;
            height: 480px;
        }
    }
}
</style>
