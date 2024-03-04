<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getOssALiBaBaApi } from '@/request/api';
import { message } from 'ant-design-vue';
import axios from 'axios';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    fileModule: {
        type: Number,
        default: 3
    }
});
let imageUrl = ref('');
onMounted(() => {});
const chooseImageUrl = async (e) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
        console.error('File size exceeds the maximum limit.');
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e?.target.files[0]);
    reader.onload = function () {
        imageUrl.value = reader.result;
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
        console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
</script>

<template>
    <div class="upload-wrap">
        <img
            class="preview"
            v-if="props.fileModule == 3"
            :class="imageUrl ? 'active' : ''"
            :src="imageUrl"
            alt=""
        />
        <div class="upload">
            <input class="ipt" @change="chooseImageUrl" type="file" />
            <div class="upload-btn">
                <span>+</span>
                <h5>上传</h5>
            </div>
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
    justify-content: flex-start;
    gap: 5px;
    .upload {
        position: relative;
        width: 200px;
        .ipt {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        .upload-btn {
            .flex-col;
            padding: 20px 80px;
            background-color: #f1f5f8;
            color: #6d6d6d;

            span {
                font-size: 30px;
            }

            h5 {
                font-size: 20px;
                width: 40px;
            }
        }
    }
    .preview {
        display: none;
        width: 150px;
        height: 118px;
        &.active {
            display: block;
        }
    }
}
.message {
    display: none;
    color: #9a0000;
    font-size: 16px;
    margin: 20px 0;
    &.active {
        display: block;
    }
}
</style>
