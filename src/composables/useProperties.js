import { computed } from "vue"
// collection hace referencia a las propiedades que tienes en fireabse 
import { collection } from "firebase/firestore"
// useFirestorese usa para utilizar la base de dato de firestore
//useCollection lo que hace es colocarlo en nuestro state la base de dato de firestore
import { useFirestore, useCollection } from "vuefire"
export default function useProperties() {

    // este db hace la peticion al servicio de firebase para identificarlo
    const db = useFirestore()
    // y aqui creamos la variable en la que accedemos a la informacion de la coleccion de firebase (no hace falta usar reactividad )
    //esto siempre es asi usamos useCollection conectandolo a la base dd dato y con copllection hacemos la peticion a la base de datos con
    //db y llamamo a la coleccion como la llamamos en firebase en este caso es properties
    const propertiesCollection = useCollection(collection(db, 'properties'))


    return {
        propertiesCollection,
    }
}