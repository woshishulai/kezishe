<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getMenuListAPi } from '@/request/weituo/index';
const route = useRoute();
onMounted(async () => {
    let params = {
        id: route.query.id,
        coltype: 'single'
    };
    let res = await getMenuListAPi(params);
    document.title = res.Data.seoData.seoTitle;
    console.log(res);
});
const list = [
    {
        boderImg: 'weituo/red-border1.png',
        icon: 'weituo/icon1.png',
        label: '联系我们',
        label1: '填写委托单',
        label2: '',
        rightImg: 'weituo/red-right.png'
    },
    {
        boderImg: 'weituo/red-border2.png',
        icon: 'weituo/icon2.png',
        label: '确认后寄送',
        label1: '藏品给我们',
        label2: '',
        rightImg: 'weituo/red-right.png'
    },
    {
        boderImg: 'weituo/red-border2.png',
        icon: 'weituo/icon3.png',
        label: '经鉴定',
        label1: '审核双方',
        label2: '确认委托清单',
        rightImg: 'weituo/red-right.png'
    },
    {
        boderImg: 'weituo/red-border2.png',
        icon: 'weituo/icon4.png',
        label: '预展竟买',
        rightImg: 'weituo/red-right.png'
    },
    {
        boderImg: 'weituo/red-border3.png',
        icon: 'weituo/icon5.png',
        label: '结算',
        label1: '',
        label2: ''
    }
];
</script>

<template>
    <div class="delegation-process">
        <div class="title"> 委托说明 </div>
        <div class="cen-box">
            <p class="label">
                文献类藏品在委托、邮寄前需先与我司联系，并提供藏品图片、清单以及每件藏品的保险金额（保险金额可根据藏品价值设定），待我司初步判断藏品是否合适后再寄送至我司。对于未经确认自行寄达的藏品，若不合适，则机会的物流费用🈶由委托人自行承担。
            </p>
            <div class="img-list">
                <div
                    class="img-item"
                    v-for="(item, index) in list"
                    :key="index"
                    :style="{
                        background: 'url(' + getImageUrl(item.boderImg) + ')',
                        backgroundSize: '100% 100%'
                    }"
                >
                    <img :src="getImageUrl(item.icon)" alt="" />
                    <div class="round-wrap">
                        <span v-for="(i, iIndex) in index + 1" class="round"></span>
                    </div>
                    <div class="text">
                        <p class="liucheng">{{ item.label }}</p>
                        <p class="liucheng">{{ item.label1 }}</p>
                        <p class="liucheng">{{ item.label2 }}</p>
                    </div>
                    <img class="right-nav" :src="getImageUrl(item.rightImg)" alt="" />
                    <div class="process-wrap">
                        <span class="process"> 0{{ index + 1 }} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.delegation-process {
    background-color: #fff;
    height: 100%;

    .cen-box {
        .label {
            font-size: 18px;
            line-height: 30px;
            color: #101010;
        }
        .img-list {
            .flex-row;
            gap: 40px;
            margin: 100px 0 0;
            .img-item {
                flex: 1;
                .flex-col;
                gap: 20px;
                position: relative;
                height: 275px;
                .round-wrap {
                    .flex-row;
                    gap: 5px;
                    .round {
                        display: block;
                        width: 8px;
                        height: 8px;
                        background-color: #ff2e00;
                        border-radius: 50%;
                    }
                }
                .liucheng {
                    text-align: center;
                    color: #b15858;
                    height: 24px;
                    font-size: 18px;
                }
                .right-nav {
                    position: absolute;
                    right: -31.5px;
                    top: 43%;
                }
                .process-wrap {
                    position: absolute;
                    top: -17px;
                    right: -13px;
                    padding: 14px 11px;
                    background-color: #9a0000;
                    border-radius: 50%;
                    color: #fff;
                }
            }
        }
    }
}
</style>
