<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { footerInfoList } from '../data';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    bg: {
        type: String,
        default: '#fff'
    },
    pdTop: {
        type: String,
        default: '26px'
    },
    pdBom: {
        type: String,
        default: '16px'
    }
});

onMounted(() => {});
</script>

<template>
    <div
        class="footer-tabbar"
        :style="{ backgroundColor: bg, paddingTop: pdTop, paddingBottom: pdBom }"
    >
        <div class="nav-list">
            <li class="nav-item" v-for="item in footerInfoList" :key="item.title">
                <span>{{ item.title }}</span>
                <span>{{ item.shu }}</span>
            </li>
        </div>
        <p>
            京公网安备 11000002000088号 | 京ICP备11041704号 | Copyright © 2004 - 2023壳子社
            版权所有
        </p>
    </div>
</template>

<style lang="less">
.footer-tabbar {
    .nav-list {
        .flex-row;
        gap: 30px;

        .nav-item {
            .flex-row;
            gap: 30px;
            cursor: pointer;

            span {
                font-weight: 600;
            }
        }
    }

    p {
        text-align: center;
        margin-top: 16px;
        font-weight: 600;
        cursor: pointer;
    }
}
</style>
