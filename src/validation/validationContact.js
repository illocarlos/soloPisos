export const ContactSchema = {

    name(value) {
        if (value?.length >= 6) return true
        return 'The property title is mandatory or very short'
    },
    phone(value) {
        if (/^[0-9\s]+$/.test(value)) {
            return true;
        }
        return 'Should only be numbers ';
    },
    description(value) {
        if (value) return true
        return 'Add a description'
    }
}
