<template>
  <div @mouseenter="hover = true" @mouseleave="hover = false" @click="showPokemonDialog(pokemon)"
    class="pokemon-button">
    <img :src="pokemon.imgurl" :alt="pokemon.name" class="pokemon-sprite" :class="{ 'sprite-hover': hover }">
    <div class="pokemon-info">
      <div class="pokemon-number" v-if="!hover">#{{ formatPokemonNumber(pokemon.id) }}</div>
      <div class="pokemon-name" v-if="hover">{{ pokemon.name }}</div>
    </div>
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
  data() {
    return {
      hover: false
    };
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

.pokemon-sprite {
  width: 100%;
  height: auto;
  max-height: 200px;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.sprite-hover {
  transform: translateY(20px);
}

.pokemon-info {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1;
}

.pokemon-number,
.pokemon-name {
  color: rgba(0, 0, 0, 0.5);
  padding: 4px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid #000;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: color 0.3s ease;
}

.pokemon-button:hover .pokemon-name {
  display: block;
  background-color: black;
  color: whitesmoke
}

.pokemon-name {
  display: none;
}
</style>
