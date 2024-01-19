import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStoreButtom = defineStore('buttom', () => {
    const buttonLeng = ref(false)

    // aqui aplicamos la logica de traduccion realmente es true o false si es true que sea español y false ingles
    const buttonChange = () => {
        buttonLeng.value = !buttonLeng.value;
        return buttonLeng.value;
    };

    // este computed es simplemente para usarlo en la barra de navegacion que cambie el interior del boton si esta en ingles o en español
    const reactiveFavBotton = computed(() => {
        return buttonLeng.value ? 'EN' : 'ES';
    });

    return {
        buttonLeng,
        reactiveFavBotton,
        buttonChange
    }
})