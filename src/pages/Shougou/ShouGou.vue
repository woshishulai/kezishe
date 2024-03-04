<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const showDetails = (item) => {
    router.push('/shougou/details');
};
</script>

<template>
    <div class="shou-gou">
        <div class="title">收购资讯</div>
        <div class="con-wrap">
            <div
                class="info-item"
                v-for="(item, index) in 8"
                :key="index"
                @click="showDetails(item)"
            >
                <div class="left-time">
                    <p class="mounth-day">09.03</p>
                    <p class="year">-2023-</p>
                </div>
                <div class="right-text">
                    <h5>回顾：超48亿收购正式宣布成交，大陆资产被迫转让</h5>
                    <p class="label"
                        >科技领域的竞争力特别大，不仅要有最先进的科技，还要能够抢占市场份额，这样才能够生存下去。在竞争过程中有的企业越做越大，而有的企科技领域的竞争力特别大，不仅要有最先进的科技，还要能够抢占市场份额，这样才能够生存下去。在竞争过程中有的企业越做越大，而有的企科技领域的竞争力特别大，不仅要有最先进的科技，还要能够抢占市场份额，这样才能够生存下去。在竞争过程中有的企业越做越大，而有的企科技领域的竞争力特别大，不仅要有最先进的科技，还要能够抢占市场份额，这样才能够生存下去。在竞争过程中有的企业越做越大，而有的企</p
                    >
                    <p class="more">详细》</p>
                </div>
            </div>
        </div>
        <CatePage></CatePage>
    </div>
</template>

<style scoped lang="less">
.shou-gou {
    flex: 1;
    background-color: #fafafa;
    .title {
        height: 110px;
        line-height: 110px;
        padding: 0 40px;
        font-size: 18px;
    }
    .con-wrap {
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .info-item {
            display: flex;
            flex-direction: row;
            gap: 30px;
            padding: 20px;
            background-color: #f8f8f8;
            cursor: pointer;
            &:hover {
                background-color: #fcf7e9;
            }
            .left-time {
                padding: 40px;
                background-color: #fff;
                text-align: center;
                .mounth-day {
                    font-size: 36px;
                }
                .year {
                    margin-top: 10px;
                    font-size: 16px;
                }
            }
            .right-text {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                h5 {
                    .ellipsis;
                    font-size: 18px;
                    font-weight: 600;
                }
                .label {
                    .ellipsis2;
                    color: #6a6a6a;
                    line-height: 20px;
                }
                .more {
                    display: flex;
                    flex-direction: row-reverse;
                }
            }
        }
    }
}
</style>
