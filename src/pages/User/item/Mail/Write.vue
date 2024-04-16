<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import WangEdior from '@/components/WangEdior/WangEdior.vue';
import { handleFinishFailed } from '@/utils/form/rules';
import { addMailTo } from '@/request/api';
import { notification } from 'ant-design-vue';
import { watchEffect } from 'vue';
const [api, contextHolder] = notification.useNotification();
const router = useRouter();
const route = useRoute();
const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
});
watchEffect(() => {
    if (props.params.ReplayId) {
        let str = '<br/>';
        formState.value.Contents = str + str + str + props.params.Contents;
    }
});
const formState = ref({
    Types: '3', //2草稿，3发件(写信和回复用)
    Id: '', //邮件id 草稿箱编辑邮件ID不为0，其他回复和写信默认0即可
    Title: '', //标题
    Contents: '', //内容
    ReplayId: '0', //回复原邮件Id,草稿和写信默认0即可
    MsgTab: '1' //1意见反馈 2藏品咨询 3品相咨询
});
onMounted(() => {});
const emits = defineEmits(['changePage']);
const handleFinish = async (bool) => {
    //如果是草稿
    if (bool) {
        if (
            formState.value.Title == '' ||
            formState.value.Contents == '' ||
            formState.value.MsgTab == ''
        ) {
            api.info({
                message: '请填写完整信息'
            });
            return;
        }
    }
    //如果是回复信件
    if (props.params.ReplayId) {
        //回信需要带上回信的id
        formState.value.ReplayId = props.params.ReplayId;
        //是存草稿吗 是就是2
        formState.value.Types = bool == true ? 2 : props.params.Types;
        //回复写信时0
        formState.value.Id = props.params.Id || 0;
        // formState.value.Title = props.params.Title || '';
        // formState.value.Contents = props.params.Contents || '';
    } else {
        formState.value.ReplayId = 0;
        formState.value.Types = bool == true ? 2 : 3;
        //传递什么
        formState.value.Id = 0;
        // formState.value.MsgTab = formState.value.MsgTab;
    }
    let res = await addMailTo(formState.value);
    if (res.Tag == 1) {
        formState.value = {};
        formState.value.MsgTab = '1';
        const query = {
            page: '写信',
            ReplayId: 0
        };
        emits('changePage', query);
    }
    api.info({
        message: res.Message
    });
    console.log(res);
};
</script>

<template>
    <div class="write">
        <a-form
            labelAlign="left"
            :model="formState"
            name="basicsss"
            :label-col="{ span: 3 }"
            :wrapper-col="{ span: 17 }"
            autocomplete="off"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item
                :rules="[{ required: true, message: '标题不能为空' }]"
                label="标题"
                name="Title"
            >
                <a-input v-model:value.trim="formState.Title" />
            </a-form-item>
            <a-form-item
                :rules="[{ required: true, message: '内容不能为空' }]"
                label="信件内容"
                name="Contents"
            >
                <WangEdior v-model="formState.Contents"></WangEdior>
            </a-form-item>
            <a-form-item
                :rules="[
                    {
                        required: true,
                        message: '请选择问题类型'
                    }
                ]"
                label="问题类型"
                name="MsgTab"
            >
                <a-radio-group v-model:value="formState.MsgTab" name="radioGroup">
                    <a-radio value="1">意见反馈</a-radio>
                    <a-radio value="2">藏品咨询</a-radio>
                    <a-radio value="3">品相咨询</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                :wrapper-col="{
                    offset: 3,
                    span: 17
                }"
            >
                <a-row :gutter="16">
                    <a-col class="gutter-row" :span="5">
                        <a-button type="primary" html-type="submit">提交</a-button>
                    </a-col>
                    <a-col class="gutter-row" :span="5">
                        <a-button type="primary" @click="handleFinish(true)">存草稿</a-button>
                    </a-col>
                </a-row>
            </a-form-item>
        </a-form>
        <contextHolder />
    </div>
</template>

<style scoped lang="less">
.write {
    padding-bottom: 40px;
    padding-left: 100px;
    min-height: 600px;
    padding-top: 40px;
}
</style>
