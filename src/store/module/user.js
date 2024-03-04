// import { ref } from 'vue'
// import { defineStore } from 'pinia'
// const getStoreUserInfo = () => {
//     const storedUserInfo = JSON.parse(localStorage.getItem('userInfos'));
//     console.log(storedUserInfo);

//     // if (storedUserInfo === null || storedUserInfo === undefined) {
//     //     return [];
//     // }
//     // return storedUserInfo
//     return storedUserInfo === null || storedUserInfo === undefined ? [] : storedUserInfo
//     // return storedUserInfo.length === 0 ? [] : storedUserInfo;
// };

// export const useUserInfo = defineStore('userInfos', () => {
//     //定义state的数据
//     const userInfos = ref(getStoredUserInfo())
//     console.log(userInfos);
//     //action
//     const changeUserInfo = async (params) => {
//         console.log('修改用户的基本信息,我是store里面的user.js');
//         // if (params.name) {
//         //     userInfo.value.name = params.name;
//         // }
//         // if (params.phone) {
//         //     userInfo.value.phone = params.phone;
//         // }
//         // if (params.gender) {
//         //     userInfo.value.gender = params.gender;
//         // }
//         //这个是对象用的
//         // userInfos.value = Object.assign([], userInfos.value, params);
//         userInfos.value = { ...userInfos.value, ...params };
//         //储存到本地
//         localStorage.setItem('userInfos', JSON.stringify(userInfos.value));
//         console.log('已经修改完了', params, userInfos);
//     }
//     //gertters
//     return {
//         userInfos,
//         changeUserInfo
//     }
// })
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
