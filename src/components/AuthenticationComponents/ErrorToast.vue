<template>
    <v-snackbar
        v-bind="$attrs"
    >
        {{ text }}

    </v-snackbar>
</template>

<script>
    export default {
        name: 'ErrorToast',

        props: {
            text: {
                type: String,
                default: 'An Error Has Occured.'
            }
        }
    }
</script>
