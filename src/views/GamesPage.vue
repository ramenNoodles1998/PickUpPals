<template>
    <div>
        <v-card
            class="mx-auto my-3"
            width="800"
            height="810"
            color="#d3d3d3"
            tile
        >
            <!-- Header about games info -->
            
            <v-list
                max-height="650"
                class="overflow-y-auto"
                color="#d3d3d3"
            >
                <div 
                    v-for="game in games"
                    :key="game._id"
                >
                    <Game 
                        :game="game" 
                        directions
                    />
                </div>
            </v-list>
            
        </v-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Game from '../components/GamesComponents/Game.vue'


    export default {
        name: 'GamesPage',

        components: {
            Game
        },

        computed: {
            ...mapState(['games'])
        }
    }
</script>

<style scoped>

</style>