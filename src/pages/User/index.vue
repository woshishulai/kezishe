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
            <div style="padding-left: 14px"><BreadCrumbs></BreadCrumbs></div>
            <div class="cen-wrap">
                <UserMenu paths="/user"></UserMenu>
                <div class="user-item">
                    <RouterView></RouterView>
                    <!-- <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view> -->
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
    :deep(.ant-select-selector) {
        border-width: 1px;
        border-color: rgb(218, 225, 232);
        border-style: solid;
        border-radius: 4px;
        height: 43px;
        background-color: rgb(255, 255, 255);
    }
    :deep(.ant-radio-wrapper) {
        .ant-radio-inner::after {
            background-color: #6d6d6d;
        }
        .ant-radio-checked .ant-radio-inner {
            background-color: #f4f4f4;
            border-color: #d9d9d9;
            border-width: 2px;
        }
    }
    :deep(.ant-form) {
        .ant-input-affix-wrapper,
        .ant-picker,
        .ant-select-selector {
            border-width: 1px;
            border-color: rgb(218, 225, 232);
            border-style: solid;
            border-radius: 4px;
            height: 43px;
            background-color: rgb(255, 255, 255);
        }
        .ant-select-selection-item {
            line-height: 43px;
        }

        // .ant-input {
        //     border-width: 1px;
        //     border-style: solid;
        //     border-radius: 4px;
        //     height: 43px;
        //     background-color: rgb(255, 255, 255);
        // }
    }

    .con-main-wrap {
        .cen-wrap {
            display: flex;
            flex-direction: row;
            gap: 20px;
            padding-bottom: 40px;

            .user-item {
                flex: 1;
                width: 0;
            }
            :deep(.ant-form) {
                .ant-form-item-label > label {
                    font-size: 14px;
                }
                .ant-input {
                    font-size: 14px;
                }
                .ant-radio-wrapper span.ant-radio + * {
                    font-size: 14px;
                }
                .ant-picker .ant-picker-input > input {
                    font-size: 14px;
                }
                .ant-select-selection-item,
                .ant-btn {
                    font-size: 14px;
                }
            }
            :deep(.ant-btn-default) {
                background-color: #85909b;
            }

            :deep(.ant-table-tbody) {
                .ant-table-cell {
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
