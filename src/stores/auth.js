import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    //  Este hook probablemente encapsula la lógica para interactuar con el sistema de autenticación de Firebase.
    //es decir autenticar los usuarios que tenemos en la base de fireabse
    const auth = useFirebaseAuth()
    // este dato reactivo lo usamos para saber si tenemos un usuario dentro de la web ya que firebase se esta fuera lo define como null
    // por eso lo predeterminamos como null y si hay alguien dentro lo llenamos
    const loggedInUser = ref(null)
    const errroMssg = ref("")
    const router = useRouter()
    const errorCodes = {
        'auth/invalid-credential': 'Email or password invalid. Please try again.',
        'auth/too-many-requests': 'Too many attempts. Please wait 5 minutes.'
    }

    // onmounted monta al usuario que este logeado cuando un usuario inicia sesion se actualiza el objeto del usuario
    //asegurando que loggedInUser refleje al usuario en copncreto 
    onMounted(() => {
        // Este método se utiliza para escuchar cambios en el estado de autenticación del usuario. es un metodo de firebase
        //observa cuando un usuario inicia o cierra sesion
        // le pasamos a firebase el auth como primer argumento 
        // y user es un parámetro que contiene la información sobre el usuario actual si está autenticado, o null si no lo está.
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // si user que vendra de firebase es true es decir contiene el  usuario  lo pasamos a nuestro valor reactivo loggedInUser
                //sabiendo que null es falso es decir no entraria en la condicion por lo tanto no le pasamos el usuario y no esta logeado
                loggedInUser.value = user

            }
        })
    })

    // funcion que previamente creamos un formulario para rellenar valores en este caso email y password
    //para que nos llegue la informacion del formulario que son las credentials

    function login(credentials) {

        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                loggedInUser.value = user
                // si entramos en la promesa y todo va ok nos manda a esta ruta 
                router.push({ name: 'admin-properties' })
            })
            .catch(error => {
                errroMssg.value = errorCodes[error.code]
            });
    }

    // en esta funcion cerramos session  y tenemos la palabra reservada signOut que es de firebase creamos una promesa 
    //y pasamos el loggedinuser a null para utilizarlo por ejemplo en la barrra de navegacion que no se vea rutas al no estar logeado
    //es decir signOut cierra sesion en firebase y loggedinuser cierra sesion en la parte visual
    //y mandamos al usuario a la pagina de login con router.push
    function logOut() {
        signOut(auth).then(() => {
            loggedInUser.value = null
            router.push({ name: 'login' })
        }).catch(error => {
            console.log(error)
        })
    }
    const hasError = computed(() => {
        return errroMssg.value !== ""
    })
    // este computed lo usamos para visualizar la reactividad de loggedInUser 
    // (computed se suele usar para observar una reactividad concreta) en este caso es ver si el usuario esta logeado o no(true or false)
    const isAuth = computed(() => {
        return loggedInUser.value
    })

    return {
        login,
        hasError,
        errroMssg,
        loggedInUser,
        isAuth,
        logOut
    }
})
