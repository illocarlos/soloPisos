import { ref } from 'vue'
// este composable se usa para ajustar el mapa que tenemos tanto en el formulario como en otro lugar que queramos usarlo
//lo subiumos a un composable para poder usar el codigo en varios componentes
export default function useLocationMap() {
    // esta  constante la usamos para llamarla en el mapa ya que podemos realizar un zoom y asi no hardcodeamos el codigo 
    const zoom = ref(8)
    // center lo usamos como cordenadas para el marcador del mapa lo que se vera en el mapa igualmente no hardcodeamos esta info
    const center = ref([40.3450, -3.7132])


    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}