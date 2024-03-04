<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const props = defineProps({});
onMounted(() => {});
const inputValue = ref('');
const active = ref(0);
const showLoading = ref(false);
const list = [
    {
        cate: '竞买'
    },
    {
        cate: '购买 '
    },
    {
        cate: '成交'
    }
];
const onSearch = (searchValue) => {
    showLoading.value = true;
    console.log('use value', searchValue);
    console.log('or use this.value', inputValue.value);
};
const cateInfo = (index) => {
    active.value = index;
};
</script>

<template>
    <div class="header-input">
        <div class="cate-list">
            <div
                class="cate-item"
                @click="cateInfo(index)"
                :class="index == active ? 'active' : ''"
                v-for="(item, index) in list"
                :key="index"
            >
                <span>{{ item.cate }}</span>
                <img :src="getImageUrl('login/red-down.png')" alt="" />
            </div>
        </div>
        <a-input-search
            v-model:value="inputValue"
            placeholder="请输入藏品名称和编号"
            :loading="showLoading"
            id="toubusousuo"
            enter-button="搜索"
            size="large"
            @search="onSearch"
        />
    </div>
</template>

<style scoped lang="less">
.header-input {
    .flex-col;
    gap: 5px;
    align-items: flex-start;

    .cate-list {
        .flex-row;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 20px;

        .cate-item {
            .flex-col;
            cursor: pointer;

            span {
                padding: 12px 30px;
                color: #fff;
                border-radius: 8px;
                color: #333;
                font-size: 18px;
            }

            img {
                display: none;
            }

            &.active {
                span {
                    color: #fff;
                    background-color: #9a0000;
                }

                img {
                    display: block;
                }
            }
        }
    }

    :deep(.ant-input-group-wrapper .ant-input-group) {
        border: 2px solid #9a0000;
        border-radius: 6px;

        .ant-input {
            height: 52px;
            border-radius: 4px 0 0 4px;
        }

        .ant-btn.ant-btn-lg {
            height: 52px;
            width: 100px;

            .anticon svg {
                color: #fff;
            }
        }
    }
}
</style>
