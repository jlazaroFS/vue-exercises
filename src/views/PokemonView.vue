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
                            imgurl: response.data.sprites.front_default,
                            artworkurl: response.data.sprites.other['official-artwork'].front_default,
                            id: response.data.id,
                            types: response.data.types.map(typeData => typeData.type.name),
                            cry: response.data.cries.latest
                        };

                        axios
                            .get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
                            .then(speciesResponse => {
                                const englishEntry = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === "en");
                                if (englishEntry) {
                                    pokemon.name = speciesResponse.data.names.find(name => name.language.name === "en").name;
                                    pokemon.genus = speciesResponse.data.genera.find(genus => genus.language.name === "en").genus;
                                    pokemon.desc = englishEntry.flavor_text
                                        .replace(/\f/g, "\n")
                                        .replace(/\u00ad\n/g, "")
                                        .replace(/\u00ad/g, "")
                                        .replace(/ -\n/g, " - ")
                                        .replace(/-\n/g, "-")
                                        .replace(/\n/g, " ");
                                } else {
                                    console.error("English flavor text entry not found for this Pokémon.");
                                }
                            })
                            .catch(speciesError => {
                                console.error('Error fetching species data:', speciesError);
                            })
                            .finally(() => {
                                this.loading = false;
                            })
                        this.pokedex.push(pokemon);
                        this.displayedPokedex.push(pokemon);
                    })
                    .catch(error => {
                        console.error(error);
                    })
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
