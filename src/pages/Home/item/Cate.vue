<script setup>
import GoodsList from '@/components/common/Goods-list.vue';
const list = [
    {
        img: 'home/goods/goods1.jpg',
        title: '蓝颜 纯手工主人杯 升级版',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods2.jpg',
        title: '景德镇的杯子',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods3.jpg',
        title: '这是一个不错的商品',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods4.jpg',
        title: '这是个不错的枕头',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods5.jpg',
        title: '大家好啊送我啥急啊都',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods6.jpg',
        title: '蓝颜 纯手工主人杯 升级版',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods7.jpg',
        title: '景德镇的杯子',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods8.jpg',
        title: '这是一个不错的商品',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods9.jpg',
        title: '这是个不错的枕头',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    },
    {
        img: 'home/goods/goods10.jpg',
        title: '大家好啊送我啥急啊都',
        rmb: '299',
        time: '2023-10-23 10:23:20'
    }
];
</script>

<template>
    <div class="home-cate">
        <div class="con-main-wrap">
            <GoodsList title="邮票" :list="list"></GoodsList>
            <GoodsList title="钱币" :list="list"></GoodsList>
            <GoodsList title="商城" :list="list"></GoodsList>
        </div>
    </div>
</template>
<style scoped lang="less"></style>
