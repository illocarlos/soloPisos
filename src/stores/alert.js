import { ref, watchEffect } from "vue"
import { defineStore } from "pinia"


export const useStoreAlert = defineStore('alert', () => {
    const text = ref('')
    const error = ref(false)
    const show = ref(false)

    // funcion reset para restablecer valores en este caso del texto y show error no lo vamos a usar
    function $reset() {
        text.value = ''
        error.value = false
        show.value = false
    }


    // watcheffect es muy similar a watch la diferencia que watcheffect se usa para observar efecto secundarios 
    // simples como es este Caso ya que solo es una alerta y queremos ver si show es true watcheffect te permite rastrear toda las dependencias
    //por lo tanto puede interferir en el rendimiento si hay muchos efectos en el 
    //  en caso de watch te permite optimizar mejor el rendimiento ya que es mas concreto sobre cuando debe ejecutarse
    //es resumen watch se usa cuando necesitas mas control y un codigo mas amplio 
    // y watcheffect abarca toda las dependencias pero necesita un codigo mas simple y que procese menos efectos 
    watchEffect(() => {
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