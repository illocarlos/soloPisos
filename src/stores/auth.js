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
