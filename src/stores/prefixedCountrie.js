import { defineStore } from 'pinia';
import ApiService from '@/service/ApiService.js'
import { onMounted, ref } from 'vue';

export const useCountriesStore = defineStore('countries', () => {
    // creamos estos dos array para llenarlos con llos objetos de la api y asi usarlos dentro
    const allCountries = ref([]); //este lo usamos para recoger toda la informacion de la api
    const prefixed = ref([])  // y este para pasarle la informacion filtrada

    // creamos una funcion async para generar una peticion a la api  que en este caso es de tipo get ya que vamos a recibir el objeto 
    onMounted(async function () {
        // lo pasamos a un data la peticion
        const { data } = await ApiService.getPrefixed()
        allCountries.value = data   // y despues ese data lo pasamos a allcountries

        allCountries.value.forEach(each => {  // y aqui generamos el filtro
            if (typeof each.idd.root !== "undefined" && typeof each.idd.suffixes !== "undefined") { // generamos esta condicion que excluya estos objetos 
                prefixed.value.push(`${each.flag} ${each.idd.root}${each.idd.suffixes[0]}`);
            }
        })

    })
    return {
        prefixed,
    }
})