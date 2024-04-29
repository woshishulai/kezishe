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
    <div class="result">
        <div class="box-wrap">
            <img :src="getImageUrl('chengjiao/icon1.png')" alt="" />
            <h5>感谢您，已成功预约柜台现付业务</h5>
            <div class="element">
                <p>预约时间:</p>
                <span>2024.02.08</span>
            </div>
            <div class="element">
                <p>支付金额：</p>
                <span>2484.00元(藏品费)</span>
            </div>
            <div class="element">
                <p>预约地点:</p>
                <span>北京市西城区明湖大厦A523</span>
            </div>
            <a-button type="primary">查看预约信息</a-button>
        </div>
    </div>
</template>

<style scoped lang="less">
.result {
    .flex-row;
    padding: 20px 16px;
    min-height: 600px;
    background-color: #fff;
    .box-wrap {
        width: 700px;
        padding: 40px;
        background-color: #eef3f8;
    }
}
</style>
