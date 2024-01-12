
// es la logica para mandar mensajes de error a v-validate retornamos el string que queremos mandar y automaticamente procesa 
//el mimso paquete de formulaerio (podemos usar toda las condiciones que queramos)
export const loginSchema = {
    email(value) {
        if (!value) {
            return 'required field';
        }
        // si es un email válido
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regex.test(value)) {
            return 'Invalid email';
        }
        return true;
    },
    password(value) {
        if (value) return true
        return 'Password is required'
    }
}