<template>
  <div class="pokemon pa-8">
    <h1>Under construction</h1>
  </div>
</template>

<script>
  export default {
    name: 'Pokémon',
    mounted() {
        this.$emit('updateTitle', this.$options.name);
    }
  }

</script>
