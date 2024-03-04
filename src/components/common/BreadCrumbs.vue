<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const nameList = ref(route.matched.map((routeRecord) => routeRecord.meta.name));
watch(
    () => route.matched.map((routeRecord) => routeRecord.meta.name),
    (newNames) => {
        nameList.value = newNames;
    }
);

const handleBreadcrumbClick = (index) => {
    const routeTo = route.matched[index];
    if (routeTo && routeTo.path) {
        router.push(routeTo.path);
    }
};
</script>

<template>
    <div class="bread-crumbs">
        <p>您当前的位置:</p>
        <p
            v-for="(item, index) in nameList"
            :key="item"
            @click="() => handleBreadcrumbClick(index)"
            class="breadcrumb-item"
        >
            {{ item }} <span class="nav">></span>
        </p>
    </div>
</template>

<style lang="less">
.bread-crumbs {
    .flex-row;
    justify-content: flex-start;
    gap: 20px;
    padding: 30px 0 30px 0;
    width: 1400px;
    font-size: 16px;
    margin: 0 auto;

    p {
        .flex-row;
        gap: 10px;
        cursor: pointer;
        color: #94979a;

        &:last-child {
            .nav {
                display: none;
            }
        }
    }
}
</style>
