import { ref, watch, watchEffect } from "vue"
import { defineStore } from "pinia"

export const useStoreAlert = defineStore('alert', () => {
    const text = ref('')
    const error = ref(false)
    const show = ref(false)

    function $reset() {
        text.value = ''
        error.value = false
        show.value = false
    }


    watch(show, () => {
        if (show.value) {
            setTimeout(() => {
                text.value = ''
                error.value = false
                show.value = false
            }, 3000)
        }
    })






    return {
        text,
        error,
        show,
        $reset,
    }
})