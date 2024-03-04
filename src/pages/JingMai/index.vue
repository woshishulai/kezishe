<script setup>
import BreadCrumbs from '@/components/common/BreadCrumbs.vue';
</script>

<template>
    <div class="wrap">
        <div class="con-main-wrap">
            <BreadCrumbs></BreadCrumbs>
            <RouterView></RouterView>
        </div>
    </div>
</template>
