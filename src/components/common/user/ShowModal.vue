<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const props = defineProps({
    titleList: {
        type: Array,
        default: null
    },
    statusList: {
        type: Array,
        default: null
    }
});
const showModals = route.query.titleCate || '';
const params = reactive({});
watchEffect(() => {
    params.statusCate = props?.statusList ? props?.statusList[0]?.Key : '';
    if (props?.titleList && props?.titleList.length >= 1) {
        const some = props?.titleList.some((item) => item.cate == showModals);
        if (some) {
            params.titleCate = showModals;
            return;
        } else {
        }
    }
    params.titleCate = props?.titleList ? props?.titleList[0]?.cate : '';
});
const changeTitleCate = (item) => {
    if (params.titleCate == item.cate) {
        params.reload = 1;
        params.reload += 1;
    } else {
        delete params.reload;
    }
    params.titleCate = item.cate;
};
const changeStatusCate = (item) => {
    params.statusCate = item.Key;
};
defineExpose({
    params
});
</script>

<template>
    <div class="show-modal">
        <slot name="active1"></slot>
        <div
            class="title-cate"
            :class="props.titleList?.length > 5 ? 'active' : ''"
            v-if="props.titleList"
        >
            <p
                class="cate-item"
                @click="changeTitleCate(item)"
                :class="item.cate == params.titleCate ? 'active' : ''"
                v-for="item in titleList"
                :key="item.cate"
            >
                <span>{{ item.cate }}</span>
                <span v-if="item.num">({{ item.showText }}{{ item.num }})</span>
            </p>
        </div>
        <slot name="active2"></slot>
        <div
            class="status-cate"
            :class="props?.statusList.length < 6 ? 'active' : ''"
            v-if="props?.statusList"
        >
            <p
                v-for="item in props?.statusList"
                :key="item.Key"
                @click="changeStatusCate(item)"
                :class="item.Key == params.statusCate ? 'active' : ''"
            >
                {{ item.Value }} ({{ item.Count }})
            </p>
        </div>

        <slot name="active3"></slot>
        <slot name="active4"></slot>
    </div>
</template>

<style scoped lang="less">
.show-modal {
    .title-cate {
        padding: 10px 20px 0;
        .flex-row;
        justify-content: flex-start;
        gap: 30px;
        background-color: #eef3f8;
        border: none;
        border-radius: 4px;
        &.active {
            gap: 0;
        }

        .cate-item {
            padding: 16px 0;
            flex: 1;
            text-align: center;
            max-width: 200px;
            font-size: 16px;
            cursor: pointer;
            // font-weight: 600;

            &.active {
                background-color: #fff;
                border-radius: 6px 6px 0 0;
                color: #9a0000;
            }
        }
    }

    :deep(.status-cate) {
        .flex-row;
        justify-content: space-between;
        padding: 30px 20px 10px;
        &.active {
            justify-content: flex-start;
            gap: 30px;
        }
        p {
            cursor: pointer;
            height: 17px;
            font-size: 14px;

            &.active {
                color: #9a0000;
                border-bottom: 1px solid #9a0000;
            }
        }
    }

    :deep(.ant-input) {
        border-radius: 6px;
    }

    :deep(.search-cate) {
        .flex-row;
        justify-content: flex-start;
        gap: 10px;
        padding: 20px 0;

        .item {
            flex: 1;
        }

        .item-input {
            flex: 1.2;
        }
    }

    :deep(.ant-select-selector) {
        border-radius: 6px;
    }
    :deep(.ant-btn) {
        border-radius: 6px;
        width: 100px;
        .flex-row;
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        // background-color: #566777;
        color: #fff;
        .anticon svg {
            color: #fff;
            font-size: 16px;
        }
    }
    :deep(.table-wrap) {
        width: 1070px;
        margin: 0 auto;
    }
}
</style>
