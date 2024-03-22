<template>
  <div @click="showPokemonDialog(pokemon)" class="pokemon-button">
    <img :src="pokemon.imgurl" :alt="pokemon.name" class="pokemon-sprite">
    <div class="pokemon-number">#{{ formatPokemonNumber(pokemon.id) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  methods: {
    showPokemonDialog(pokemon) {
      this.$emit('show-pokemon-dialog', pokemon);
    },
    formatPokemonNumber(number) {
      return String(number).padStart(4, '0');
    },
  }
}
</script>

<style scoped>
.pokemon-button {
  margin: 8px;
  width: 100px;
  height: 150px;
  position: relative;
  overflow: hidden;
}

.pokemon-button img {
  max-width: 200px;
  max-height: 200px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.pokemon-button:hover img {
  filter: grayscale(0%);
}

.pokemon-number {
  position: absolute;
  top: 5px;
  left: 5px;
  color: rgba(0, 0, 0, 0.5);
  padding: 4px;
  border-radius: 5px;
  z-index: 0;
  font-size: 17px;
  font-weight: bold;
  border: 2px solid #000;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.pokemon-sprite {
  width: 100%;
  height: auto;
  max-height: 200px;
  position: relative;
  z-index: 1;
}
</style>
