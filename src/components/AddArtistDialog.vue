<template>
  <v-dialog v-model="showFormDialog" max-width="500">
    <v-card>
      <v-card-title>
        Add New Artist
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addNewArtist">
          <v-text-field v-model="newArtist.name" label="Name"></v-text-field>
          <!-- Input field for image -->
          <input type="file" @change="onFileChange" accept="image/*">
          <v-textarea v-model="newArtist.bio" label="Bio"></v-textarea>
          <v-btn type="submit" color="primary">Add</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showFormDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newArtist: { // Object to store new artist details
        name: '',
        image: '',
        bio: ''
      }
    };
  },
  methods: {
    addNewArtist() {
      this.$emit('add-artist', this.newArtist);
      // Reset form fields
      this.newArtist.name = '';
      this.newArtist.image = '';
      this.newArtist.bio = '';
      // Close form dialog
      this.$emit('close-dialog');
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.newArtist.imageDataUrl = reader.result;
        };
      }
    },
  }
}
</script>
