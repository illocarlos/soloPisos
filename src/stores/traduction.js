import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStoreButtom = defineStore('buttom', () => {
    const buttonLeng = ref(false)

    const buttonChange = () => {
        buttonLeng.value = !buttonLeng.value;
        return buttonLeng.value;
    };

    const reactiveFavBotton = computed(() => {
        return buttonLeng.value ? 'EN' : 'ES';
    });

    return {
        buttonLeng,
        reactiveFavBotton,
        buttonChange
    }
})