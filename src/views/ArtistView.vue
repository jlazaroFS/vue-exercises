<template>
  <div class="artists pa-8">
    <h1>Artists</h1>
    <p>Lorem ipsum</p>

    <!-- Button to open the form dialog -->
    <v-btn
      color="primary"
      elevation="2"
      absolute
      bottom
      right
      fab
      @click="showFormDialog = true"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>

    <!-- Dialog for adding a new artist -->
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

    <div class="text-center">
      <!-- Loop through existing artists -->
      <v-button
        v-for="(artist, index) in artists"
        :key="index"
        @click="showArtistDialog(artist)"
        class="artist-button"
      >
        <img
          :src="artist.imageDataUrl ? artist.imageDataUrl : require(`../assets/artists/${artist.image}`)"
          :alt="artist.name"
          style="max-width: 200px; max-height: 200px;"
        >
      </v-button>
    </div>

    <!-- Dialog for displaying artist details -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2" v-if="selectedArtist">
          {{ selectedArtist.name }}
        </v-card-title>

        <v-card-text v-if="selectedArtist">
          {{ selectedArtist.bio }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false, // Flag to control visibility of artist dialog
      showFormDialog: false, // Flag to control visibility of form dialog
      selectedArtist: null, // Store the selected artist
      artists: [ // Array of artists with their details
        {
          name: "Taylor Swift",
          image: "taylor_swift.png",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          imageDataUrl: null // Store image data URL for preview
        },
        {
          name: "Artist 2",
          image: "taylor_swift.png", // Assuming the image is the same as for Taylor Swift for now
          bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          imageDataUrl: null // Store image data URL for preview
        },
      ],
      newArtist: { // Object to store new artist details
        name: '',
        image: '',
        bio: ''
      }
    };
  },
  methods: {
    // Method to show artist details dialog
    showArtistDialog(artist) {
      this.selectedArtist = artist;
      this.dialog = true;
    },
    // Method to add new artist
    addNewArtist() {
      // Push new artist to artists array
      this.artists.push({
        name: this.newArtist.name,
        image: this.newArtist.image,
        bio: this.newArtist.bio,
        imageDataUrl: this.newArtist.imageDataUrl // Store image data URL
      });
      // Reset form fields
      this.newArtist.name = '';
      this.newArtist.image = '';
      this.newArtist.bio = '';
      // Close form dialog
      this.showFormDialog = false;
    },
    // Method to handle file input change
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
    // Method to open file upload dialog
    openFileUpload(index) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        this.handleFileUpload(event, index);
      };
      input.click();
    },
    // Method to handle file upload
    handleFileUpload(event, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.$set(this.artists[index], 'imageDataUrl', reader.result);
        };
      }
    }
  }
};
</script>

<style scoped>
  .artist-button img {
    max-width: 100px;
    max-height: 100px;
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
    border-radius: 100px;
    overflow: hidden;
  }
</style>
