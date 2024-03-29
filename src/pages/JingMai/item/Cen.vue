<script setup>
import { ref } from 'vue';
import { getImageUrl } from '@/utils/index';
const props = defineProps({
    banner: {
        type: Array,
        default: []
    }
});
</script>

<template>
    <div class="jinmai-banner">
        <div class="swiper-wrap">
            <a-carousel autoplay>
                <img
                    class="swiper-img"
                    v-for="item in props.banner"
                    :key="item.Id"
                    :src="item.FilePath"
                    alt="img"
                />
            </a-carousel>
        </div>
    </div>
</template>
<style lang="less">
.jinmai-banner {
    .swiper-wrap {
        height: 315px;
        .swiper-img {
            height: 315px;
        }
    }
}
</style>
