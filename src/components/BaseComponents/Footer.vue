<template>
    <v-footer
        color="green"
        padless
    >
        <v-container fluid>
            <div class="d-flex flex-row-reverse">
                <FriendList />
            </div>

            <div class="d-flex justify-center ma-3">
                <div class="white--text">
                    2021 — <strong>PickUpPals</strong>
                </div>
            </div>
        </v-container>
    </v-footer>
</template>

<script>
import FriendList from '../FriendComponents/FriendList.vue'

  export default {
    name: 'Footer',

    components: {
        FriendList
    }
  }
</script>

<style scoped>

</style>