<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { handleFinishFailed } from '@/utils/form/rules';
import { createRecordRemittance } from '@/request/user/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const emits = defineEmits(['close']);
const formState = reactive({});
const handleFinish = async () => {
    try {
        let res = await createRecordRemittance(formState);
        console.log(res);
        if (res.Tag == 1) {
            for (let i in formState) {
                formState[i] = '';
            }
            info('success', '保存成功');
            emits('close');
        }
    } catch (error) {
        info('error', error);
    }
};
</script>

<template>
    <a-form
        labelAlign="left"
        :model="formState"
        name="basicsss"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 19 }"
        autocomplete="off"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
    >
        <a-form-item
            :rules="[{ required: true, message: '银行名称不能为空' }]"
            label="银行名称"
            name="BankName"
        >
            <a-input v-model:value.trim="formState.BankName" />
        </a-form-item>
        <a-form-item
            :rules="[{ required: true, message: '银行信息不能为空' }]"
            label="银行信息"
            name="BankInfo"
        >
            <a-input v-model:value.trim="formState.BankInfo" />
        </a-form-item>
        <a-form-item
            :rules="[{ required: true, message: '汇款金额不能为空' }]"
            label="汇款金额"
            name="Prices"
        >
            <a-input v-model:value.trim="formState.Prices" type="number" />
        </a-form-item>

        <a-form-item
            :rules="[{ required: true, message: '汇款日期不能为空' }]"
            label="汇款日期"
            name="Dates"
        >
            <a-date-picker
                value-format="YYYY-MM-DD"
                v-model:value="formState.Dates"
                style="width: 100%"
            />
        </a-form-item>
        <a-form-item
            :rules="[{ required: true, message: '汇款人不能为空' }]"
            label="汇款人"
            name="qweqwe"
        >
            <a-input v-model:value.trim="formState.qweqwe" />
        </a-form-item>
        <a-form-item
            :rules="[{ required: true, message: '关联单号不能为空' }]"
            label="关联单号"
            name="OrderNo"
        >
            <a-input type="number" v-model:value.trim="formState.OrderNo" />
        </a-form-item>
        <a-form-item
            :rules="[{ required: true, message: '备注不能为空' }]"
            label="备注"
            name="Remark"
        >
            <a-input v-model:value.trim="formState.Remark" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 6, span: 19 }">
            <a-button type="primary" html-type="submit">保存</a-button>
        </a-form-item>
    </a-form>
</template>

<style scoped lang="less"></style>
