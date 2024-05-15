<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { handleFinishFailed } from '@/utils/form/rules';
import { createRecordRemittance, bankList } from '@/request/user/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps(['orderId', 'allPrice']);
const bankDataList = ref([]);
const formState = reactive({});
const formRef = ref();
onMounted(async () => {
    try {
        let res = await bankList();
        bankDataList.value = res.Data;
        console.log(res, '银行信息');
    } catch (error) {
        info('error', error);
    }
});
watchEffect(() => {
    formState.OrderNo = props?.orderId;
});
watchEffect(() => {
    formState.Prices = props?.allPrice;
});
const resetForm = () => {
    formRef.value.resetFields();
    emits('close');
};
const handleChange = (value, option) => {
    let type = formState.Types;
    formRef.value.resetFields();
    formState.Types = type;
};
const handleChanges = (value, option) => {
    console.log(value);
};
const emits = defineEmits(['close']);

const handleFinish = async () => {
    try {
        let res = await createRecordRemittance(formState);
        if (res.Tag == 1) {
            for (let i in formState) {
                formState[i] = '';
            }
            emits('close');
        }
    } catch (error) {
        info('error', error);
    }
};
</script>

<template>
    <div class="tables">
        <div class="titles-info">
            <p class="title-info"> 填写汇款告知单 </p>
            <p class="red">*为必填项</p>
        </div>
        <a-form
            labelAlign="left"
            :model="formState"
            ref="formRef"
            name="basicsss"
            autocomplete="off"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item :rules="[{ required: true, message: '请选择汇款方式' }]" name="Types">
                <a-select
                    :field-names="{
                        label: 'Typename',
                        value: 'Types'
                    }"
                    v-model:value="formState.Types"
                    show-search
                    placeholder="请选择汇款方式"
                    :options="bankDataList.DataType"
                    @change="handleChange"
                ></a-select>
                <span class="red">*</span>
            </a-form-item>
            <a-form-item
                v-if="formState.Types == 2"
                :rules="[{ required: true, message: '请选择银行' }]"
                name="BankName"
            >
                <a-select
                    :field-names="{
                        label: 'BankName',
                        value: 'BankName'
                    }"
                    v-model:value="formState.BankName"
                    show-search
                    placeholder="请选择银行"
                    :options="bankDataList.BankInfo"
                    @change="handleChanges"
                ></a-select>
                <span class="red">*</span>
            </a-form-item>
            <a-form-item
                v-if="formState.Types == 1"
                :rules="[{ required: true, message: '请输入邮局信息' }]"
                name="BankInfo"
            >
                <a-input placeholder="请输入邮局信息" v-model:value.trim="formState.BankInfo" />
                <span class="red">*</span>
            </a-form-item>
            <a-form-item
                v-if="formState.Types == 2"
                :rules="[{ required: true, message: '银行信息不能为空' }]"
                name="BankInfo"
            >
                <a-input placeholder="请输入银行信息" v-model:value.trim="formState.BankInfo" />
                <span class="red">*</span>
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: '汇款金额不能为空' }]" name="Prices">
                <a-input
                    placeholder="汇款金额RMB(不含手续费)"
                    v-model:value.trim="formState.Prices"
                    type="number"
                />
                <span class="red">*</span>
            </a-form-item>

            <a-form-item :rules="[{ required: true, message: '汇款日期不能为空' }]" name="Dates">
                <a-date-picker
                    placeholder="请选择汇款日期"
                    value-format="YYYY-MM-DD"
                    v-model:value="formState.Dates"
                    style="width: 100%"
                />
                <span class="red">*</span>
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: '汇款人不能为空' }]" name="UName">
                <a-input placeholder="请输入汇款人姓名" v-model:value.trim="formState.UName" />
                <span class="red">*</span>
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: '关联单号不能为空' }]" name="OrderNo">
                <a-input
                    placeholder="请输入关联单号"
                    type="number"
                    v-model:value.trim="formState.OrderNo"
                />
                <span class="red">*</span>
            </a-form-item>
            <a-form-item :rules="[{ required: true, message: '备注不能为空' }]" name="Remark">
                <a-input placeholder="汇款目的" v-model:value.trim="formState.Remark" />
                <span class="red">*</span>
            </a-form-item>
            <a-form-item>
                <a-row>
                    <a-col :span="8">
                        <a-button type="primary" html-type="submit">确定</a-button></a-col
                    >
                    <a-col :span="2"> </a-col>
                    <a-col :span="8"
                        ><a-button type="primary" @click="resetForm">取消 </a-button></a-col
                    >
                </a-row>
            </a-form-item>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.tables {
    padding: 20px 20px;
    .titles-info {
        .flex-row;
        justify-content: space-between;
        padding: 0px 0 30px;
        .title-info {
            font-size: 20px;
            font-weight: 600;
        }
    }
    .red {
        color: #ff4d4f;
    }
    :deep(.ant-form-item) {
        position: relative;
        .red {
            position: absolute;
            top: 17px;
            right: -16px;
        }
    }
}
</style>
