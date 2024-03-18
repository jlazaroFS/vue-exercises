<template>
  <div @click="showArtistDialog(artist)" class="artist-button">
    <img
      :src="artist.imageDataUrl ? artist.imageDataUrl : require(`../assets/artists/${artist.image}`)"
      :alt="artist.name"
      class="artist-image"
    >
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  methods: {
    showArtistDialog(artist) {
      this.$emit('show-artist-dialog', artist);
    }
  }
}
</script>

<style scoped>
  .artist-button img {
    max-width: 200px;
    max-height: 200px;
    filter: grayscale(100%); /* Convert image to black and white */
    transition: filter 0.3s ease; /* Add transition for smooth effect */
  }

  .artist-button:hover img {
    filter: grayscale(0%); /* Remove grayscale filter on hover */
  }
  .artist-button {
    margin: 8px;
    width: auto;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
  }
</style>
