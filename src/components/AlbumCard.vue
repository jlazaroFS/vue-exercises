<template>
  <div @mouseenter="hover = true" @mouseleave="hover = false" @click="showAlbumDialog(album)" class="album-button">
    <img :src="album.imageDataUrl ? album.imageDataUrl : require(`../assets/albums/${album.cover}`)" :alt="album.title"
      class="album-cover">
    <p :class="{ 'album-title': true, 'album-title-hover': hover }">{{ album.title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    album: {
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
    showAlbumDialog(album) {
      this.$emit('show-album-dialog', album);
    }
  }
}
</script>

<style scoped>
.album-button img {
  max-width: 200px;
  max-height: 200px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.album-button:hover img {
  filter: grayscale(0%);
}

.album-button {
  margin: 8px;
  width: auto;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}

.album-title {
  text-align: center;
  background-color: #008F7A;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.album-title-hover {
  color: black;
  background-color: #ccc;
}
</style>
