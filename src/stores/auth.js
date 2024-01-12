import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                loggedInUser.value = user

            }
        })
    })

    function login(credentials) {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                loggedInUser.value = user
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
