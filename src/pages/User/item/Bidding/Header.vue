<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    num: {
        type: String || Number,
        default: '1'
    }
});
onMounted(() => {});
</script>

<template>
    <div class="header-title">
        <div class="cen-wrap">
            <div class="icon-list">
                <img :src="getImageUrl('user/jingmai/icon2.png')" alt="" />
                <img v-if="props?.num != 1" :src="getImageUrl('user/jingmai/icon5.png')" alt="" />
                <img
                    v-if="props?.num != 1 && props?.num != 2"
                    :src="getImageUrl('user/jingmai/icon6.png')"
                    alt=""
                />
                <img
                    v-if="props?.num != 2 && props?.num != 3"
                    :src="getImageUrl('user/jingmai/icon3.png')"
                    alt=""
                />
                <img v-if="props?.num != 3" :src="getImageUrl('user/jingmai/icon4.png')" alt="" />
            </div>

            <div class="xian">
                <div class="zero active">
                    <img :src="getImageUrl('user/jingmai/icon7.svg')" alt="" />
                </div>
                <p class="active" :class="props?.num == 2 || props?.num == 3 ? 'active' : ''"></p>
                <div class="zero" :class="props?.num == 2 || props?.num == 3 ? 'active' : ''">
                    <img
                        v-if="props?.num == 2 || props?.num == 3"
                        :src="getImageUrl('user/jingmai/icon7.svg')"
                        alt=""
                /></div>
                <p :class="props?.num == 3 ? 'active' : ''"></p>
                <div class="zero" :class="props?.num == 3 ? 'active' : ''">
                    <img v-if="props?.num == 3" :src="getImageUrl('user/jingmai/icon7.svg')" alt=""
                /></div>
            </div>

            <div class="text-wrap">
                <span class="active">确认支付方式</span>
                <span :class="props?.num != 2 || props?.num != 3 ? 'active' : ''">支付确认</span>
                <span :class="props?.num != 3 ? 'active' : ''">支付结果</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.header-title {
    .flex-row;
    padding: 20px 40px 40px;
    .cen-wrap {
        width: 750px;
        font-size: 20px;
        .icon-list {
            .flex-row;
            justify-content: space-between;
            padding: 0 42px 0 52px;
            img {
                width: 30px;
            }
        }
        .xian {
            .flex-row;
            margin-top: 6px;
            padding: 0 47px 0 56px;
            .zero {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #c9c9c9;
                img {
                    width: 100%;
                }
            }
            p {
                flex: 1;
                height: 7px;
                background-color: #e8eaf0;
            }
            .active {
                background-color: #b11503;
            }
        }
        .text-wrap {
            .flex-row;
            justify-content: space-between;
            margin-top: 8px;
            .active {
                color: #b11503;
            }
            span {
                min-width: 110px;
                text-align: center;
            }
        }
    }
}
</style>
