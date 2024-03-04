<script setup>
import { reactive } from 'vue';
import { handleFinishFailed } from '@/utils/form/rules';
const formState = reactive({});

const props = defineProps({
    params: {
        type: Object,
        default: {}
    },
    changeParams: {
        type: Object,
        default: {}
    }
});

const emits = defineEmits(['closeModel', 'postApi', 'changeApi']);
const close = () => {
    emits('closeModel');
};
const handleOk = () => {
    emits('postApi');
    console.log('触发了');
};

const changeHandleOk = () => {
    emits('changeApi', formState);
};
</script>
<template>
    <a-modal
        v-model:open="props.params.open"
        :title="props.params.title"
        @cancel="close"
        @ok="handleOk"
    >
    </a-modal>
    <a-modal
        v-model:open="props.changeParams.open"
        :title="props.changeParams.title"
        :footer="null"
        @cancel="close"
        @ok="changeHandleOk"
    >
        <a-form
            labelAlign="left"
            :model="formState"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 20 }"
            autocomplete="off"
            @finish="changeHandleOk"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.one"
                name="username"
            >
                <a-input v-model:value.trim="formState.username" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.two"
                name="country"
            >
                <a-input v-model:value.trim="formState.country" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.there"
                v-if="props.changeParams.labels.there"
                name="status"
            >
                <a-input v-model:value.trim="formState.status" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.four"
                v-if="props.changeParams.labels.four"
                name="shi"
            >
                <a-input v-model:value.trim="formState.shi" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.five"
                v-if="props.changeParams.labels.five"
            >
                <a-textarea
                    v-model:value="formState.text"
                    :auto-size="{ minRows: 2, maxRows: 5 }"
                />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.six"
                v-if="props.changeParams.labels.six"
                name="postal"
            >
                <a-input v-model:value.trim="formState.postal" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.senven"
                v-if="props.changeParams.labels.senven"
                name="tel"
            >
                <a-input v-model:value.trim="formState.tel" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '不能为空' }]"
                :label="props.changeParams.labels.enigh"
                v-if="props.changeParams.labels.enigh"
                name="phone"
            >
                <a-input v-model:value.trim="formState.phone" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<style scoped lang="less"></style>
