<template>
    <div class="pokemon pa-8">
    </div>
</template>

<style scoped>
.pokemon-grid {
    display: flex;
    flex-wrap: wrap;
}
</style>

<script>
import axios from 'axios';

export default {
    name: 'Pokemon',
    data() {
        return {
            pokemon: {
                name: "",
                imgurl: ""
            },
            pokedex: []
        };
    },
    created() {
        let instance = this;
        let LAST_PKMN = 1025
        for (let i = 1; i <= LAST_PKMN; i++) {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => {
                    let pokemon = {
                        name: response.data.name,
                        imgurl: response.data.sprites.front_default
                    }
                    instance.pokedex.push(pokemon);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    mounted() {
        this.$emit('updateTitle', this.$options.name);
    }
};
</script>
