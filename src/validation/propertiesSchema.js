export const validationSchema = {

    title(value) {
        // el titulo valida que tiene que tener min 6 caractere 
        if (value?.length >= 6) return true
        'The property title is mandatory or very short'
    },
    price(value) {
        /*
            ^ - Representa el inicio de la cadena.
            [0-9]+ - Representa cualquier número del 0 al 9. El + indica que debe haber al menos un dígito, pero puede haber más.
            $ - Representa el final de la cadena.
        */
        if (/^[0-9]+$/.test(value)) return true
        'Price should only be numbers'
    },
    phone(value) {
        // en este caso debe ser numerico si no te genera el mensaje
        if (/^[0-9\s]+$/.test(value)) return true
        'Should only be numbers'
    },
    // voy a resumir todo los validadores de abajo quiere decir que contenga un valor y si no genera el mensaje todo son iguales 
    // ya que simplemente tienen un valor simple boleano o un numero 
    prefixed(value) {
        if (value) return true
        'select a prefixed'
    },
    rooms(value) {
        if (value) return true
        'Select a Quantity'
    },
    wc(value) {
        if (value) return true
        'Select a Quantity'
    },
    description(value) {
        if (value) return true
        'Add a description'
    }
}

export const imageSchema = {
    photo(value) {
        if (value) return true
        'the image is mandatory'
    },
}