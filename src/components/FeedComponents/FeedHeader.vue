<template>
    <div>
        <!-- TODO: change text-color of chosen -->
        <v-toolbar 
            class="d-flex justify-center"
            color="green"
            dark
        >
            <v-toolbar-items>
                <v-btn 
                    text
                    @click="$emit('your-feed-clicked')"
                >
                   Your Feed
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items>
                <v-btn
                    text
                    @click="$emit('your-post-clicked')"
                >
                   Your Posts
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>  
</template>

<script>
    export default {
        name: 'FeedHeader'
    }
</script>

<style scoped>

</style>