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
    <AddArtistDialog :showFormDialog="showFormDialog" @add-artist="addNewArtist" @close-dialog="showFormDialog = false"/>

    <div class="artist-grid">
      <!-- Loop through existing artists -->
      <ArtistCard
        v-for="(artist, index) in artists"
        :key="index"
        :artist="artist"
        @show-artist-dialog="showArtistDialog"
      />
    </div>

    <!-- Dialog for displaying artist details -->
    <ArtistDialog :dialog="dialog" :selectedArtist="selectedArtist" @close-dialog="dialog = false"/>
  </div>
</template>

<style scoped>
  .artist-grid {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<script>
import ArtistCard from '../components/ArtistCard.vue';
import ArtistDialog from '../components/ArtistDialog.vue';
import AddArtistDialog from '../components/AddArtistDialog.vue';

export default {
  components: {
    ArtistCard,
    ArtistDialog,
    AddArtistDialog
  },
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
      ]
    };
  },
  methods: {
    // Method to show artist details dialog
    showArtistDialog(artist) {
      this.selectedArtist = artist;
      this.dialog = true;
    },
    // Method to add new artist
    addNewArtist(newArtist) {
      // Push new artist to artists array
      this.artists.push({
        name: newArtist.name,
        image: newArtist.image,
        bio: newArtist.bio,
        imageDataUrl: newArtist.imageDataUrl // Store image data URL
      });
    },
  }
};
</script>
