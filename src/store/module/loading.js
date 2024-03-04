import { ref } from 'vue';
import { defineStore } from 'pinia';
export const useLoading = defineStore('loadings', () => {
    const spinning = ref(false);
    const changeSpinning = (params) => {
        spinning.value = params;
    };
    return {
        spinning,
        changeSpinning
    };
});
