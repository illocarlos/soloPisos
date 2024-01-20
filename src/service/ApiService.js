import api from "@/lib/axios"
// importamos la parte superior de la api realmente podemos colocar la url completa aqui pero como buena practica y escalabilidad  la separamos 
// para un posible uso multiple
const getPrefixed = () => api.get('/all')
export default {
    getPrefixed

}