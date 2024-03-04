<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import LeftHot from './LeftHot.vue';
import RightList from './RightList.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const list = [
    {
        title: '分类:',
        cate: [
            {
                item: '新中国邮票'
            },
            {
                item: '清代邮票'
            },
            {
                item: '民国邮票'
            },
            {
                item: '解放区邮票'
            },
            {
                item: '封片简'
            },
            {
                item: '港澳邮票'
            },
            {
                item: '外国邮票'
            },
            {
                item: '其他邮票'
            }
        ]
    },
    {
        title: '价格:',
        cate: [
            {
                item: '1000元以下'
            },
            {
                item: '1000-5000'
            },
            {
                item: '5001-10000'
            },
            {
                item: '10001-30000'
            },
            {
                item: '30001-50000'
            },
            {
                item: '50001-100000'
            },
            {
                item: '10万以上'
            }
        ]
    }
];
</script>

<template>
    <div class="wrap">
        <div class="cate-list">
            <div class="cate-item" v-for="(item, index) in list" :key="index">
                <span class="name">
                    {{ item.title }}
                </span>
                <p>
                    <span v-for="(i, iIndex) in item.cate" :key="iIndex" class="item">
                        {{ i.item }}
                    </span>
                </p>
            </div>
        </div>
        <div class="cen-wrap">
            <LeftHot></LeftHot>
            <RightList></RightList>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    .cate-list {
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid #eaeaea;
        .cate-item {
            display: flex;
            gap: 20px;
            border-bottom: 1px solid #eaeaea;
            .name {
                padding: 20px 30px;
                background-color: #f9f9f9;
            }
            p {
                .flex-row;
                gap: 20px;
                span {
                    cursor: pointer;
                    &:hover {
                        color: #9a0000;
                    }
                }
            }
        }
    }
    .cen-wrap {
        display: flex;
        gap: 20px;
        margin-top: 30px;
    }
}
</style>
