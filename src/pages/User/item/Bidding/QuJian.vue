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
            <div class="status">
                <img :src="getImageUrl('user/jingmai/icon1.png')" alt="" />
                未处理
            </div>
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
    padding: 60px 50px;
    .titles {
        .flex-row;
        justify-content: flex-start;
        gap: 20px;
        h5 {
            color: #b11503;
            font-size: 22px;
            font-weight: 600;
        }
        .status {
            .flex-row;
            gap: 10px;
            height: 37px;
            width: 140px;
            background: url('@/assets/img/user/jingmai/weizhifu.png');
            background-size: 100% 100%;
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            img {
                height: 22px;
            }
        }
    }
    .details {
        margin-top: 30px;
        div {
            .flex-row;
            justify-content: flex-start;
            gap: 20px;
            margin: 20px 0;
            color: #8c8c8c;
            p {
                color: #333;
            }
        }
    }
}
</style>
