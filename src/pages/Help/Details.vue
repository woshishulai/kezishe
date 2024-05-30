<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps(['tableList']);
onMounted(() => {});
</script>

<template>
    <div class="shougou-details">
        <div class="title">
            <h5>{{ props?.tableList?.Title }}</h5>
            <p>时间 : {{ props?.tableList?.AddTime }}</p>
        </div>
        <div class="element" v-html="props?.tableList?.Content"> </div>
    </div>
</template>

<style scoped lang="less">
.shougou-details {
    flex: 1;
    background-color: #fafafa;
    padding: 0 12px;
    .title {
        text-align: center;
        padding: 50px 0 30px;
        border-bottom: 1px solid #dbdbdb;
        h5 {
            font-size: 24px;
        }
        p {
            margin-top: 30px;
            font-size: 16px;
        }
    }
    .element {
        padding: 20px 40px;
        .label {
            font-size: 18px;
            text-indent: 2em;
            line-height: 30px;
            margin: 20px 0;
            color: #2c2c2c;
        }
        .img-p {
            text-align: center;
            img {
                width: 543px;
            }
        }
    }
}
</style>
