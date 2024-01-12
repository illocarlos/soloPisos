import { defineStore } from 'pinia';
import ApiService from '@/service/ApiService.js'
import { onMounted, ref } from 'vue';

export const useCountriesStore = defineStore('countries', () => {

    const allCountries = ref([]);
    const prefixed = ref([])



    onMounted(async function () {


        const { data } = await ApiService.getPrefixed()
        allCountries.value = data
        allCountries.value.forEach(each => {
            if (typeof each.idd.root !== "undefined" && typeof each.idd.suffixes !== "undefined") {
                prefixed.value.push(`${each.flag} ${each.idd.root}${each.idd.suffixes[0]}`);
            }
        })

    })




    return {
        prefixed,
    }
})