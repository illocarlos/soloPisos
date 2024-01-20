import { defineStore } from 'pinia';
import { addDoc, collection } from 'firebase/firestore'; // Asegúrate de importar los métodos correctos de Firebase Firestore
import { useFirestore } from 'vuefire'; // Si usas vuefire para Firebase
import { useRouter } from 'vue-router'; // Importa el enrutador si estás usando Vue Router
import { useStoreAlert } from '@/stores/alert'
import { useStoreButtom } from '@/stores/traduction.js'


export const useContactStore = defineStore('Contact', () => {
    const alert = useStoreAlert()  // llamamos a alert que se generara si la peticion es ok y se monstrara
    const db = useFirestore(); // Inicializa Firestore usando vuefire
    const router = useRouter(); // Inicializa el enrutador si estás usando Vue Router
    const storeButtom = useStoreButtom()



    async function createContact(values) {

        const { ...contact } = values;

        alert.show = true
        storeButtom.buttonLeng ?
            alert.text = 'se envio correctamente' :
            alert.text = 'was sent correctly'



        setTimeout(() => {
            alert.$reset()
        }, 3000)


        try {
            // mandamos a firebase el objeto creado del formulario
            const docRef = await addDoc(collection(db, 'contact'), contact);
            // y si tenemos objeto creado nos redirecciona 
            if (docRef.id) {
                router.push({ name: 'home' });
            }
            // si de error enseñas ese mensaje 
        } catch (error) {
            console.error('Error creating property:', error);
            alert.show = true
            alert.text = 'wasn,t sent '

            // Trata el error de acuerdo a tu lógica de manejo de errores
        }
    }

    return {
        createContact
    };
});
