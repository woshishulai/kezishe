<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import UserMenu from '@/components/common/UserMenu.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <Header></Header>
    <div class="wrap">
        <div class="con-main-wrap">
            <BreadCrumbs></BreadCrumbs>
            <div class="cen-wrap">
                <UserMenu paths="/user"></UserMenu>
                <div class="user-item">
                    <RouterView></RouterView>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.wrap {
    background: #eef3f8;

    .con-main-wrap {
        .cen-wrap {
            display: flex;
            flex-direction: row;
            gap: 30px;
            padding-bottom: 40px;

            .user-item {
                flex: 1;
            }
        }
    }
}
</style>
