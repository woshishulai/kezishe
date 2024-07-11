<script setup>
import Goods from './Goods.vue';
import Title from './Title.vue';
import LeftSelect from './LeftSeleft.vue';
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { goodsListAPi } from '@/request/chengjiao/api';
import { searchValue } from '@/request/api';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const formState = ref({});
const postParams = ref({});
const getGoodsList = async () => {
    let res;
    try {
        if (route.query.KeyWd) {
            res = await searchValue(postParams.value);
        } else {
            res = await goodsListAPi(postParams.value);
        }
        formState.value = res.Data;
        console.log(formState.value, '成交');
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
    if (!route.query.Id && !route.query.KeyWd) {
        return;
    }
    getGoodsList();
};
</script>

<template>
    <div class="wrap">
        <Title :SpecialInfo="formState?.SpecialInfo"></Title>
        <div class="con-wrap">
            <LeftSelect
                :RatingCompanyType="formState?.RatingCompanyType"
                :BidderType="formState?.BidderType"
                @changeFormState="changeFormState"
            ></LeftSelect>
            <Goods @changeFormState="changeFormState" :goodsList="formState?.GoodsList"></Goods>
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
    :deep(.goods-item:hover) {
        border-color: transparent;
        box-shadow:
            0 1px 2px -2px rgba(0, 0, 0, 0.16),
            0 3px 6px 0 rgba(0, 0, 0, 0.12),
            0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }
}
</style>
