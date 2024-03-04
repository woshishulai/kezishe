<script setup>
import { ref, h, watch } from 'vue';
import { useRouter } from 'vue-router';
import { userRoutes } from '@/router/index.js';
const router = useRouter();
const selectRouter = router.currentRoute._rawValue.fullPath;
const segments = selectRouter.split('/');
let desiredPath = '';

if (segments.length >= 3) {
    desiredPath = `/${segments[1]}/${segments[2]}`;
}
const openKeys = ref([desiredPath]);

const selectedKeys = ref([selectRouter]);
watch(router.currentRoute, (to, from) => {
    selectedKeys.value = [router.currentRoute._rawValue.fullPath];
});
const generateMenuItems = (routes, parentRoutePath = '/user/') => {
    const userRoutes = routes.find((route) => route.path === '/user');
    const generateChildren = (children, parentPath) => {
        return children
            .map((childRoute, index) => {
                if (childRoute.path === 'userinfo') {
                    // 排除个人中心路由
                    return null;
                }

                const childMenuItem = {
                    key: parentPath + childRoute.path,
                    label: childRoute.meta.name,
                    router: childRoute.path,
                    icon: () => (childRoute.meta.icon ? h(childRoute.meta.icon) : null)
                };

                if (childRoute.children && childRoute.children.length > 0) {
                    childMenuItem.children = generateChildren(
                        childRoute.children,
                        parentPath + childRoute.path + '/'
                    );
                }

                return childMenuItem;
            })
            .filter(Boolean); // 过滤掉为null的项
    };

    if (userRoutes) {
        return generateChildren(userRoutes.children, parentRoutePath);
    }

    return [];
};

const menuItems = ref(generateMenuItems(userRoutes));

const handleClick = (e) => {
    const routePath = `${e.key}`;
    router.push(routePath);
};
</script>
<template>
    <div class="user-nav-list">
        <div class="nav-title" @click="router.push('/user/userinfo')"> 个人中心 </div>
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 260px"
            mode="inline"
            :items="menuItems"
            @click="handleClick"
        ></a-menu>
    </div>
</template>

<style scoped lang="less">
.user-nav-list {
    .nav-title {
        background: url('@/assets/img/user/menu-title-bg.png');
        background-size: 100% 100%;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        padding-left: 50px;
    }
}
</style>
