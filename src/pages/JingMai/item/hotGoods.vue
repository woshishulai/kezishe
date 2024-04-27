<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    goodsList: {
        type: Array,
        default: []
    }
});
onMounted(() => {});
</script>

<template>
    <div class="hot-goods">
        <div class="top-title"> 热门推荐 </div>
    </div>
</template>

<style scoped lang="less">
.hot-goods {
    width: 260px;
    //  fcdca5
    .top-title {
        color: #fff;
        font-size: 20px;
        padding: 20px;
        background-color: #c83327;
    }
}
</style>
