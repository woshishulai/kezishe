<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const list = ref([]);
const props = defineProps({
    swiperList: {
        type: Object,
        default: []
    }
});
onMounted(() => {});
watchEffect(() => {
    list.value = props?.swiperList;
});
</script>

<template>
    <a-carousel
        v-if="list.length"
        autoplay
        :slides-to-scroll="2"
        :slides-to-show="2"
        dot-position="left"
    >
        <div class="item" v-for="item in list" :key="item.Uid">
            <p>
                <span>{{ item.Unick }}</span>
                <span>¥{{ item.MPrice }}</span>
                <span>{{ item.CreateTime }}</span>
                <span>{{ item.IpAddr }}</span>
            </p>
        </div>
    </a-carousel>
</template>
<script setup></script>
<style scoped lang="less">
:deep(.slick-slide) {
    overflow: hidden;
}
:deep(.slick-list) {
    margin: 5px 0;
}
.item {
    padding: 5px 40px;
    p {
        display: flex;
        justify-content: space-between;
        // line-height: 30px;
        color: #777;
    }
}
</style>
