<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const props = defineProps({});
const router = useRouter();
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
const onSearch = () => {
    console.log(active.value);
    if (active.value == 0) {
        router.push({
            path: '/jingmai/show-stamp-goods',
            query: {
                SType: active.value + 1,
                show: false,
                KeyWd: inputValue.value
            }
        });
    } else if (active.value == 2) {
        router.push({
            path: '/chengjiao/transaction-goods',
            query: {
                SType: active.value + 1,
                show: false,
                KeyWd: inputValue.value
            }
        });
    }
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
        <!-- @keydown.enter="onSearch" -->
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
                font-size: 18px;
                color: rgb(97, 97, 97);
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
        border: 3px solid #9a0000;
        border-radius: 5px;

        .ant-input {
            height: 43px;
            border-radius: 4px 0 0 4px;
            font-size: 16px;
            &::placeholder {
                color: rgb(169, 169, 169);
            }
        }

        .ant-btn.ant-btn-lg {
            height: 43px;
            width: 100px;
            font-size: 20px;
            color: rgb(255, 255, 255);
            .anticon svg {
                color: #fff;
            }
        }
    }
}
</style>
