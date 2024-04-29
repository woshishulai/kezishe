<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="qujian">
        <div class="titles">
            <h5>现款取货预约单 #2432984 </h5>
            <div class="status"> 未处理 </div>
        </div>
        <div class="details">
            <div>时间: <p class="label">2024.02.2.26（星期三）上午9：00至17：00</p></div>
            <div>两个: <p class="label">两个</p></div>
            <div>金额: <p class="label">24435.元</p></div>
            <div>备注: <p class="label"></p></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.qujian {
    padding: 30px 50px;
    .titles {
        .flex-row;
        justify-content: flex-start;
        gap: 20px;
        font-size: 20px;
        h5 {
            color: #9a0000;
        }
    }
    .details {
        margin-top: 30px;
        div {
            .flex-row;
            justify-content: flex-start;
            gap: 20px;
            margin: 20px 0;
        }
    }
}
</style>
