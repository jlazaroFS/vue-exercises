<template>
  <div @mouseenter="hover = true" @mouseleave="hover = false" @click="showArtistDialog(artist)" class="artist-button">
    <img :src="artist.imageDataUrl ? artist.imageDataUrl : require(`../assets/artists/${artist.image}`)"
      :alt="artist.name" class="artist-image">
    <p :class="{ 'artist-name': true, 'artist-name-hover': hover }">{{ artist.name }}</p>
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
  data() {
    return {
      hover: false
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
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.artist-button:hover img {
  filter: grayscale(0%);
}

.artist-button {
  margin: 8px;
  width: auto;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}

.artist-name {
  text-align: center;
  background-color: #7170E6;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.artist-name-hover {
  color: black;
  background-color: #ccc
}
</style>
