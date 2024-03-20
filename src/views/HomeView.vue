<template>
  <div class="home pa-8">
    <h1>Home</h1>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    mounted() {
      this.$emit('updateTitle', this.$options.name);
    }
  }
</script>
