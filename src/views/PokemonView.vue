<template>
    <div class="pokemon pa-8">
        <div class="pokemon-grid">
            <PokemonCard v-for="(pokemon, index) in displayedPokedex" :key="index" :pokemon="pokemon"
                @show-pokemon-dialog="showPokemonDialog" class="pokemon-card" />
            <div v-if="loading" class="loading-indicator">Loading...</div>
            <PokemonDialog :dialog="dialog" :selectedPokemon="selectedPokemon" @close-dialog="dialog = false" />
        </div>
    </div>
</template>

<script>
import PokemonCard from '../components/PokemonCard.vue';
import PokemonDialog from '../components/PokemonDialog.vue';
import axios from 'axios';

export default {
    name: 'Pokémon',
    components: {
        PokemonCard,
        PokemonDialog
    },
    data() {
        return {
            pokedex: [],
            displayedPokedex: [],
            loading: false,
            batchSize: 100,
            currentPage: 0,
            scrollThreshold: 1500,
            dialog: false,
            selectedPokemon: null
        };
    },
    methods: {
        fetchPokemonData() {
            const LAST_PKMN = 1025;
            const startIndex = this.currentPage * this.batchSize + 1;
            const endIndex = Math.min(startIndex + this.batchSize - 1, LAST_PKMN);

            for (let i = startIndex; i <= endIndex; i++) {
                this.loading = true;
                axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                    .then(response => {
                        const pokemon = {
                            name: response.data.species.name,
                            imgurl: response.data.sprites.front_default,
                            id: response.data.id,
                            types: response.data.types.map(typeData => typeData.type.name)
                        };
                        this.pokedex.push(pokemon);
                        this.displayedPokedex.push(pokemon);
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        showPokemonDialog(pokemon) {
            this.selectedPokemon = pokemon;
            this.dialog = true;
        },
        setupScrollListener() {
            window.addEventListener('scroll', this.handleScroll);
        },
        handleScroll() {
            const bottomDistance =
                document.documentElement.scrollHeight -
                (window.innerHeight + window.scrollY);

            if (bottomDistance < this.scrollThreshold) {
                this.currentPage++;
                this.fetchPokemonData();
            }
        }
    },
    mounted() {
        this.$emit('updateTitle', this.$options.name);
        this.fetchPokemonData();
        this.setupScrollListener();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style scoped>
.pokemon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.loading-indicator {
    text-align: center;
    margin-top: 20px;
}
</style>
