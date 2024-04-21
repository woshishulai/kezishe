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
// const formState = ref({});
const getGoodsList = async (query) => {
    try {
        let res = await goodsListAPi(query);
        console.log(res);
    } catch (error) {
        info('error', error);
    }
};

const changeFormState = async (query) => {
    // formState.value = query;
    getGoodsList(query);
};
</script>

<template>
    <div class="wrap">
        <Title></Title>
        <div class="con-wrap">
            <LeftMenu @changeFormState="changeFormState"></LeftMenu>
            <RightList :goodsList="goodsList"></RightList>
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
