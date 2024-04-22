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
const goodsList = ref([]);
const props = defineProps({});
const formState = ref({});
const getGoodsList = async (query) => {
    try {
        let res = await goodsListAPi(query);
        formState.value = res.Data;
        console.log(formState.value, '藏品列表页');
    } catch (error) {
        info('error', error);
    }
};

const changeFormState = async (query) => {
    getGoodsList(query);
};
</script>

<template>
    <div class="wrap">
        <Title :SpecialInfo="formState.SpecialInfo"></Title>
        <div class="con-wrap">
            <LeftMenu
                :RatingCompanyType="formState.RatingCompanyType"
                :BidderType="formState.BidderType"
                @changeFormState="changeFormState"
            ></LeftMenu>
            <RightList :goodsList="formState.GoodsList"></RightList>
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
