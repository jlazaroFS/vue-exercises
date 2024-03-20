<template>
    <v-dialog v-model="dialog" max-width="500" @input="dialogClosed">
       <v-card>
        <v-card-title>Edit Album</v-card-title>
        <v-card-text>
            <v-text-field v-model="editedAlbum.title" label="Title"></v-text-field>
            <v-select v-model="editedAlbum.artist" :items="artist_names" label="Artist"></v-select>
            <input type="file" @change="onFileChange" accept="image/*">
            <v-textarea v-model="editedAlbum.details" label="Details"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="editAlbum">
                <v-icon>mdi-content-save-edit</v-icon>
                Save
            </v-btn>
            <v-btn color="error" @click="closeDialog">
                <v-icon>mdi-close</v-icon>
                Cancel
            </v-btn>
        </v-card-actions>
       </v-card> 
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        selectedAlbum: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
        editedAlbum: {
          title: '',
          artist: '',
          cover: '',
          details: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'artists'
      ]),
      artist_names() {
        return this.artists.map(artist => artist.name);
      }
    },
    watch: {
        selectedAlbum: {
            handler(newValue) {
                this.editedAlbum.title = newValue.title;
                this.editedAlbum.artist = newValue.artist;
                this.editedAlbum.cover = newValue.cover;
                this.editedAlbum.details = newValue.details;
            },
            immediate: true
        },

    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        dialogClosed(value) {
            if (!value) {
                this.$emit('close-dialog', false);
            }
        },
        editAlbum() {
            this.$emit('close-dialog', false);
            this.$emit('edit-album', {...this.selectedAlbum, ...this.editedAlbum});
        },
        onFileChange(event) {   // FIXME: Image is not updating
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.editedAlbum.cover = reader.result;
                };
            }
        },
    }
}
</script>
