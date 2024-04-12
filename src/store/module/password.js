import { ref } from 'vue';
import { defineStore } from 'pinia';
export const usePassword = defineStore(
    'codePassword',
    () => {
        const codePasswords = ref({});
        const changeCodePasswords = (params) => {
            codePasswords.value = params;
        };
        return {
            codePasswords,
            changeCodePasswords
        };
    },
    {
        persist: {
            enabled: true, // true 表示开启持久化保存
            //配置存储在哪里
            strategies: [{ storage: localStorage, paths: ['codePasswords'] }]
        }
    }
);
