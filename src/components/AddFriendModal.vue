

<template>
    <div>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    text
                    v-bind="attrs"
                    v-on="on"
                >
                    Add Friend
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Add Friend
                </v-card-title>

                <v-card-text>
                    <v-autocomplete
                        :items="items"
                        :filter="customFilter"
                        label="Label"
                    ></v-autocomplete>

                </v-card-text>
            </v-card>
      </v-dialog>
    </div>
</template>

<script>
  export default {
    name: 'AddFriendModal',

    data: () => ({
        dialog: false,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),

    methods: {
        customFilter(item, queryText) {
            console.log(item)
            console.log(queryText)

            return item.toLowerCase().indexOf(queryText.toLowerCase()) > -1
            //do api call for user names based on queryText
        }
    }
  }
</script>

<style scoped>

</style>