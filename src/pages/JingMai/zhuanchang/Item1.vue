<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Title from '../item/Title.vue';
import LeftMenu from '../item/LeftMenu.vue';
import HotGoods from '../item/HotGoods.vue';
import NewGoods from '../item/NewGoods.vue';
import RightList from '../item/RightList.vue';
import { goodsListAPi } from '@/request/jingmai';
import { searchValue } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const postParams = ref({});
const formState = ref({});
const getGoodsList = async () => {
    let res;
    try {
        if (route.query.KeyWd) {
            res = await searchValue(postParams.value);
        } else {
            res = await goodsListAPi(postParams.value);
        }
        formState.value = res.Data;
        console.log(formState.value, '专场item1');
    } catch (error) {}
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
            <LeftMenu
                :RatingCompanyType="formState?.RatingCompanyType"
                :BidderType="formState?.BidderType"
                @changeFormState="changeFormState"
            ></LeftMenu>
            <RightList
                @changeFormState="changeFormState"
                :goodsList="formState?.GoodsList"
            ></RightList>
            <div v-if="route.query.show" class="right-component">
                <HotGoods title="热门推荐" :goodsList="formState?.GoodsList"></HotGoods>
                <NewGoods title="邮票最新成交" :goodsList="formState?.GoodsList"></NewGoods>
            </div>
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
