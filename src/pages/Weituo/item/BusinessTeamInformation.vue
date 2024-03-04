<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute, routerKey } from 'vue-router';
import { getMenuListAPi } from '@/request/weituo/index';
const route = useRoute();
const router = useRouter();
const imgList = ref([]);
onMounted(async () => {
    let params = {
        id: route.query.id,
        coltype: 'list'
    };
    let res = await getMenuListAPi(params);
    imgList.value = res.Data.articledatas;
    document.title = res.Data.seoData.seoTitle;
    console.log(res);
});
const showDetails = (item) => {
    router.push('/weituo/details?id=' + item.id);
};
</script>

<template>
    <div class="business">
        <div class="title"> 业务团队信息 </div>
        <div class="img-list">
            <div
                class="img-item"
                @click="showDetails(item)"
                v-for="(item, index) in imgList"
                :key="index"
            >
                <img :src="item.imgurl" alt="" />
                <div class="name">{{ item.title }}</div>
                <p class="label"></p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.business {
    background-color: #fff;
    min-height: 100%;
    .img-list {
        padding: 40px;
        .flex-row;
        gap: 80px;
        .img-item {
            flex: 1;
            .flex-col;
            gap: 20px;
            padding: 20px;
            background-color: #f0f0f0;
            &:hover {
                background-color: #f8f5ea;
            }
            img {
                width: 221px;
                height: 295px;
            }
            .name {
                font-size: 20px;
            }
        }
    }
}
</style>
