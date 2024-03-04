import { ref } from 'vue';
import { defineStore } from 'pinia';
const getStoreUserInfo = () => {
    const storeUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    return storeUserInfo === null || storeUserInfo === undefined ? {} : storeUserInfo;
};
export const useUserInfo = defineStore(
    'userInfos',
    () => {
        const userInfo = ref(getStoreUserInfo());
        //资料填写的
        const userTranslate = ref({});
        //昵称
        const userNickName = ref({});
        const changeUserInfo = async (params) => {
            userInfo.value = Object.assign({}, userInfo.value, params);
            console.log('更新的用户个人信息', userInfo.value);
        };
        const changeUserTranslate = async (params) => {
            userTranslate.value = Object.assign({}, userTranslate.value, params);
            console.log('更新的用户资料信息', userTranslate.value);
        };
        const changeUserNickName = async (params) => {
            userNickName.value = params;
            console.log('更新的用户昵称信息', userNickName.value);
        };
        const removeUserInfo = async () => {
            userInfo.value = {};
        };
        const removeUserTranslate = async () => {
            userTranslate.value = {};
        };
        const removeUserNickName = async () => {
            userNickName.value = {};
        };
        return {
            userInfo,
            userTranslate,
            userNickName,
            changeUserInfo,
            changeUserTranslate,
            changeUserNickName,
            removeUserInfo,
            removeUserTranslate,
            removeUserNickName
        };
    },
    {
        persist: {
            enabled: true // true 表示开启持久化保存
        }
    }
);
