<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getOssALiBaBaApi } from '@/request/api';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { info } from '@/hooks/antd/message';
import { watch } from 'vue';
import { watchEffect } from 'vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    fileModule: {
        type: Number,
        default: 3
    },
    title: {
        type: String,
        default: '文档'
    },
    userImageUrl: {
        type: String,
        default: ''
    }
});
let imageUrl = ref([]);
let urls = ref([]);
watchEffect(() => {
    if (props?.userImageUrl) {
        imageUrl.value = props?.userImageUrl.split(';');
        urls.value = props?.userImageUrl.split(';');
    }
});

onMounted(() => {});
const emits = defineEmits(['getFiles']);
const chooseImageUrl = async (e) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
        info('error', '文件大小不可大于5MB');
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e?.target.files[0]);
    reader.onload = function () {
        imageUrl.value.push(reader.result);
    };
    let params = {
        fileModule: props.fileModule,
        fileName: e.target.files[0].name
    };
    let res = await getOssALiBaBaApi(params);
    let { accessid, policy, signature, key } = res.Data;
    const formData = new FormData();
    formData.append('OSSAccessKeyId', accessid);
    formData.append('policy', policy);
    formData.append('signature', signature);
    formData.append('key', key);
    formData.append('success_action_status', '200');
    formData.append('file', file);
    try {
        const response = await axios.post('https://kezishe.oss-cn-beijing.aliyuncs.com', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        urls.value.push(res.Data.fullpath);
        let url = urls.value.join(';');
        emits('getFiles', url);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
const removes = (index) => {
    imageUrl.value.splice(index, 1);
    urls.value.splice(index, 1);
    let url = urls.value.join(';');
    emits('getFiles', url);
};
</script>

<template>
    <div class="upload-wrap">
        <div
            class="preview"
            v-if="props.fileModule == 3"
            v-for="(item, index) in imageUrl"
            :key="index"
            :class="imageUrl.length ? 'active' : ''"
        >
            <a-image class="show-img" style="max-width: 200px" :src="item" />
            <img
                class="remove"
                :src="getImageUrl('user/info/error.jpg')"
                alt=""
                @click="removes(index)"
            />
        </div>

        <div class="upload">
            <input class="ipt" @change="chooseImageUrl" type="file" />
        </div>
    </div>
    <p class="message" v-if="props.fileModule == 3" :class="imageUrl ? 'active' : ''"
        >点击右侧加号可重新上传证件图片</p
    >
    <p class="message" :class="props.fileModule == 4 ? 'active' : ''">点击加号可重新上传文档</p>
</template>

<style scoped lang="less">
.upload-wrap {
    .flex-row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 16px;
    .upload {
        position: relative;
        background: url('@/assets/img/user/info/addimg.png');
        background-size: 100% 100%;
        width: 176px;
        height: 115px;
        .ipt {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }
    .preview {
        position: relative;
        display: none;
        .remove {
            cursor: pointer;
            position: absolute;
            right: 5px;
            top: 5px;
            width: 13px;
        }
        &.active {
            display: block;
        }
    }
}
.message {
    display: none;
    color: #9a0000;
    font-size: 14px;
    margin: 20px 0;
    &.active {
        display: block;
    }
}
</style>
