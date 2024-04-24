<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Title from '../item/Title.vue';
import LeftMenu from '../item/LeftMenu.vue';
import RightList from '../item/RightList.vue';
import { goodsListAPi } from '@/request/jingmai';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const postParams = ref({});
const formState = ref({});
const getGoodsList = async () => {
    try {
        let res = await goodsListAPi(postParams.value);
        formState.value = res.Data;
    } catch (error) {
        info('error', error);
    }
};

const changeFormState = async (query, paginations) => {
    if (!postParams.value) {
        postParams.value = {};
    }
    if (query) {
        Object.assign(postParams.value, query);
    }
    if (paginations) {
        Object.assign(postParams.value, paginations);
    } else {
        Object.assign(postParams.value, {
            PageSize: 10,
            PageIndex: 1
        });
    }
    if (!route.query.Id) {
        return;
    }
    getGoodsList();
};
</script>

<template>
    <div class="wrap">
        <Title :SpecialInfo="formState?.SpecialInfo"></Title>
        <div class="con-wrap">
            <LeftMenu
                :RatingCompanyType="formState?.RatingCompanyType"
                :BidderType="formState?.BidderType"
                @changeFormState="changeFormState"
            ></LeftMenu>
            <RightList
                @changeFormState="changeFormState"
                :goodsList="formState?.GoodsList"
            ></RightList>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    padding-bottom: 40px;
    .con-wrap {
        display: flex;
        flex-direction: row;
        gap: 15px;
        margin-top: 20px;
    }
}
</style>
