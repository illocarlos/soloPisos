import { defineStore } from 'pinia';
import useImage from '@/composables/useImage'
import { addDoc, collection, doc } from 'firebase/firestore'; // Asegúrate de importar los métodos correctos de Firebase Firestore
import { useDocument, useFirestore } from 'vuefire'; // Si usas vuefire para Firebase
import { useRouter } from 'vue-router'; // Importa el enrutador si estás usando Vue Router

export const usePropertiesStore = defineStore('properties', () => {
    const { imageUrls } = useImage()
    const db = useFirestore(); // Inicializa Firestore usando vuefire
    const router = useRouter(); // Inicializa el enrutador si estás usando Vue Router



    async function createProperties(values, imageUrls, center) {
        const { photo, ...properties } = values;
        try {
            // mandamos a firebase el objeto creado del formulario
            const docRef = await addDoc(collection(db, 'properties'), {
                ...properties,
                photo: imageUrls.value,
                ubication: center.value
            });
            // y si tenemos objeto creado nos redirecciona 
            if (docRef.id) {
                router.push({ name: 'admin-properties' });
            }
        } catch (error) {
            console.error('Error creating property:', error);
            // Trata el error de acuerdo a tu lógica de manejo de errores
        }
    }




    return {
        createProperties,
        imageUrls

    };
});
