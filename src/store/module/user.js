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
        //记住我的手机号
        const userPhoneList = ref([]);
        //记住我的账号
        const userNameList = ref([]);
        const changeUserInfo = async (params) => {
            userInfo.value = Object.assign({}, userInfo.value, params);
            // console.log('更新的用户个人信息', userInfo.value);
        };
        const changeUserTranslate = async (params) => {
            userTranslate.value = Object.assign({}, userTranslate.value, params);
            // console.log('更新的用户资料信息', userTranslate.value);
        };
        const changeUserNickName = async (params) => {
            userNickName.value = params;
            // console.log('更新的用户昵称信息', userNickName.value);
        };
        const addPhoneList = async (params) => {
            let res = userPhoneList.value.includes(params);
            if (!res) {
                userPhoneList.value.push(params);
            }
        };
        const addUserNameList = async (params) => {
            let res = userNameList.value.includes(params);
            if (!res) {
                userNameList.value.push(params);
            }
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
        const removePhoneList = async (params) => {
            const index = userPhoneList.value.findIndex((item) => {
                item == params;
            });
            userPhoneList.value.splice(index, 1);
        };
        const removeUserNameList = async (params) => {
            const index = userNameList.value.findIndex((item) => {
                item == params;
            });
            userNameList.value.splice(index, 1);
        };
        return {
            userInfo,
            userTranslate,
            userNickName,
            userPhoneList,
            userNameList,
            changeUserInfo,
            changeUserTranslate,
            changeUserNickName,
            addPhoneList,
            addUserNameList,
            removeUserInfo,
            removeUserTranslate,
            removeUserNickName,
            removePhoneList,
            removeUserNameList
        };
    },
    {
        persist: {
            enabled: true, // true 表示开启持久化保存
            //配置存储在哪里
            strategies: [
                { storage: localStorage }
                // { storage: localStorage, },
                // { storage: localStorage, paths: ['userNickName'] }
            ]
        }
    }
);
