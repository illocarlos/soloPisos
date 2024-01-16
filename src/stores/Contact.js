import { defineStore } from 'pinia';
import { addDoc, collection } from 'firebase/firestore'; // Asegúrate de importar los métodos correctos de Firebase Firestore
import { useFirestore } from 'vuefire'; // Si usas vuefire para Firebase
import { useRouter } from 'vue-router'; // Importa el enrutador si estás usando Vue Router

export const useContactStore = defineStore('Contact', () => {

    const db = useFirestore(); // Inicializa Firestore usando vuefire
    const router = useRouter(); // Inicializa el enrutador si estás usando Vue Router



    async function createContact(values) {

        const { ...contact } = values;
        console.log(contact)
        try {
            // mandamos a firebase el objeto creado del formulario
            const docRef = await addDoc(collection(db, 'contact'), contact);
            // y si tenemos objeto creado nos redirecciona 
            if (docRef.id) {
                router.push({ name: 'home' });
            }
        } catch (error) {
            console.error('Error creating property:', error);
            // Trata el error de acuerdo a tu lógica de manejo de errores
        }
    }




    return {
        createContact


    };
});
