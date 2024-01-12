export const validationSchema = {
    title(value) {
        if (value?.length >= 6) return true
        return 'The property title is mandatory or very short'
    },
    price(value) {
        /*
            ^ - Representa el inicio de la cadena.
            [0-9]+ - Representa cualquier número del 0 al 9. El + indica que debe haber al menos un dígito, pero puede haber más.
            $ - Representa el final de la cadena.
        */
        if (/^[0-9]+$/.test(value)) return true
        return 'Price should only be numbers'
    },
    phone(value) {
        if (/^[0-9\s]+$/.test(value)) {
            return true;
        }
        return 'Should only be numbers ';
    },
    prefixed(value) {
        if (value) return true
        return 'select a prefixed'
    },
    rooms(value) {
        if (value) return true
        return 'Select a Quantity'
    },
    wc(value) {
        if (value) return true
        return 'Select a Quantity'
    },
    description(value) {
        if (value) return true
        return 'Add a description'
    }
}

export const imageSchema = {
    photo(value) {
        if (value) return true
        return 'the image is mandatory'
    },
}