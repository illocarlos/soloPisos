import { ref } from 'vue'

export default function useLocationMap() {

    const zoom = ref(8)
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