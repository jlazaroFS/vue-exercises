<template>
  <v-dialog v-model="showFormDialog" max-width="500" @input="dialogClosed">
    <v-card>
      <v-card-title>
        Add New Album
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addNewAlbum">
          <v-text-field v-model="newAlbum.title" label="Title"></v-text-field>
          <v-select v-model="newAlbum.artist" :items="artist_names" label="Artist"></v-select>
          <input type="file" @change="onFileChange" accept="image/*">
          <v-textarea v-model="newAlbum.details" label="Details"></v-textarea>
          <v-btn type="submit" color="primary">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    showFormDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newAlbum: {
        title: '',
        artist: '',
        cover: '',
        details: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      'artists'
    ]),
    artist_names() {
      return this.artists.map(artist => artist.name);
    }
  },
  methods: {
    addNewAlbum() {
      this.$emit('add-album', this.newAlbum);
      this.newAlbum.title = '';
      this.newAlbum.artist = '';
      this.newAlbum.cover = '';
      this.newAlbum.details = '';
      this.$emit('close-dialog', false);
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.newAlbum.imageDataUrl = reader.result;
        };
      }
    },
    dialogClosed(value) {
      if (!value) {
        this.$emit('close-dialog', false);
      }
    }
  }
}
</script>
