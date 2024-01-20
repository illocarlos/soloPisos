export const validationSchema = {

    title(value) {
        // el titulo valida que tiene que tener min 6 caractere 
        value?.length >= 6 ? true : 'The property title is mandatory or very short'
    },
    price(value) {
        /*
            ^ - Representa el inicio de la cadena.
            [0-9]+ - Representa cualquier número del 0 al 9. El + indica que debe haber al menos un dígito, pero puede haber más.
            $ - Representa el final de la cadena.
        */
        /^[0-9]+$/.test(value) ? true : 'Price should only be numbers'
    },
    phone(value) {
        // en este caso debe ser numerico si no te genera el mensaje
        /^[0-9\s]+$/.test(value) ? true : 'Should only be numbers '
    },
    // voy a resumir todo los validadores de abajo quiere decir que contenga un valor y si no genera el mensaje todo son iguales 
    // ya que simplemente tienen un valor simple boleano o un numero 
    prefixed(value) {
        value ? true : 'select a prefixed'
    },
    rooms(value) {
        value ? true : 'Select a Quantity'
    },
    wc(value) {
        value ? true : 'Select a Quantity'
    },
    description(value) {
        value ? true : 'Add a description'
    }
}

export const imageSchema = {
    photo(value) {
        value ? true : 'the image is mandatory'
    },
}