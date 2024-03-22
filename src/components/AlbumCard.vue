<template>
  <div @click="showAlbumDialog(album)" class="album-button">
    <img :src="album.imageDataUrl ? album.imageDataUrl : require(`../assets/albums/${album.cover}`)" :alt="album.title"
      class="album-cover">
    <p class="album-title">{{ album.title }}</p>
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
  /* Convert image to black and white */
  transition: filter 0.3s ease;
  /* Add transition for smooth effect */
}

.album-button:hover img {
  filter: grayscale(0%);
  /* Remove grayscale filter on hover */
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
}
</style>
