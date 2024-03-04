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
    <div class="hot-cate">
        <div class="top-title">
            <p class="icon">
                <span class="duan"></span>
                <span class="chang"></span>
            </p>
            <h5>热门成交板块</h5>
            <p class="icon">
                <span class="chang"></span>
                <span class="duan"></span>
            </p>
        </div>
        <div class="card-list">
            <div class="card-item" v-for="(item, index) in 6" :key="index">
                <div class="title">
                    <p>
                        <img :src="getImageUrl('chengjiao/icon4.png')" alt="" />
                        现代金银币( 446756 )
                    </p>
                    <span class="more">更多></span>
                </div>
                <div class="center">
                    <div class="label-item" v-for="(i, iIndex) in 5" :key="iIndex">
                        <p class="info"
                            >2023年大熊猫国家公园精制金银币二枚2023年大熊猫国家公园精制金银币二枚</p
                        >
                        <span class="time">2023-09-04</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hot-cate {
    margin: 20px 0 50px 0;
    background: url('@/assets/img/chengjiao/bg.png');
    background-size: 100% 100%;
    padding: 0 30px 30px;
    .top-title {
        .flex-row;
        gap: 20px;
        padding: 30px 0;
        h5 {
            font-size: 20px;
            color: #000;
            font-weight: 600;
        }
        .icon {
            .flex-col;
            align-items: flex-end;
            gap: 10px;

            &:nth-child(3) {
                align-items: flex-start;
            }
            .duan {
                width: 30px;
                height: 5px;
                background-color: #000;
            }
            .chang {
                width: 60px;
                height: 5px;
                background-color: #000;
            }
        }
    }
    .card-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 15px;
        .card-item {
            width: 32%;
            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #fef4d3;
                padding: 10px 20px 10px 5px;
                color: #9a7105;
                font-size: 16px;
                font-weight: 600;
                p {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .more {
                    cursor: pointer;
                }
            }
            .center {
                padding: 20px 20px;
                background-color: #fff;
                .label-item {
                    .flex-row;
                    justify-content: space-between;
                    padding: 15px 10px;
                    cursor: pointer;
                    border-bottom: 1px solid #efefef;
                    &:hover {
                        background-color: #ebebeb;
                        color: #9a0000;
                    }
                    p {
                        width: 270px;
                        .ellipsis;
                    }
                }
            }
        }
    }
}
</style>
