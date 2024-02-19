import { computed, ref } from "vue"
// collection hace referencia a las propiedades que tienes en fireabse 
import { collection, deleteDoc, doc } from "firebase/firestore"
// useFirestorese usa para utilizar la base de dato de firestore
//useCollection lo que hace es colocarlo en nuestro state la base de dato de firestore
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"

import { ref as storageRef, deleteObject } from "firebase/storage"
export default function useProperties() {
    const filterPropertie = ref([])


    const storage = useFirebaseStorage()
    // este db hace la peticion al servicio de firebase para identificarlo
    const db = useFirestore()
    // y aqui creamos la variable en la que accedemos a la informacion de la coleccion de firebase (no hace falta usar reactividad )
    //esto siempre es asi usamos useCollection conectandolo a la base dd dato y con copllection hacemos la peticion a la base de datos con
    //db y llamamo a la coleccion como la llamamos en firebase en este caso es properties
    const propertiesCollection = useCollection(collection(db, 'properties'))


    async function deleteItem(id, urlImage) {
        console.log(urlImage)
        if (confirm('do you want deleted this propertie? ')) {
            const docRef = doc(db, 'properties', id)
            const imageRef = storageRef(storage, urlImage)
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)

            ])

        }
    }
    const filterclick = (value) => {
        // propertiesCollection es una variable reactiva que contiene la colección de propiedades
        const filteredProperties = propertiesCollection.value.filter((property) => {



            if (value.pool === true && value.yard === true) {

                // Filtrar propiedades que tienen tanto piscina como patio
                return property.pool === value.pool && property.yard === value.yard;

            } else if (value.pool === false && value.yard === false) {

                // Filtrar propiedades que tienen tanto piscina como patio

                return property.pool === value.pool && property.yard === value.yard;

            } else if (value.pool === true && value.yard === false) {

                // Filtrar propiedades que solo tienen piscina
                return property.pool === true && property.yard === false;

            } else if (value.pool === false && value.yard === true) {

                // Filtrar propiedades que solo tienen patio
                return property.yard === true && property.pool === false;

            } else {
                // Si no se especifican criterios de filtro, devolver todas las propiedades
                return property;
            }
        });

        // filterPropertie es una variable reactiva que se actualiza con las propiedades filtradas
        filterPropertie.value = filteredProperties;
    };

    const filterproperties = computed(() => {
        if (filterPropertie.value === 0) {

        }


        return filterPropertie.value.length > 0 ?
            filterPropertie.value :
            propertiesCollection.value
    })


    return {
        propertiesCollection,
        deleteItem,
        filterclick,
        filterPropertie,
        filterproperties

    }
}