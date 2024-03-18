<template>
  <div class="artists pa-8">
    <h1>Artists</h1>
    <p>Lorem ipsum</p>

    <div class="text-center">
      <v-button
        v-for="(artist, index) in artists"
        :key="index"
        @click="showArtistDialog(artist)"
        class="artist-button"
      >
        <img
          :src="require(`../assets/artists/${artist.image}`)"
          alt="artist.name"
          style="max-width: 200px; max-height: 200px;">
      </v-button>
    </div>

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
      dialog: false, // Flag to control visibility of dialog
      selectedArtist: null, // Store the selected artist
      artists: [ // Array of artists with their details
        {
          name: "Taylor Swift",
          image: "taylor_swift.png",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          name: "Artist 2",
          image: "taylor_swift.png", // Assuming the image is the same as for Taylor Swift for now
          bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
      ]
    };
  },
  methods: {
    showArtistDialog(artist) {
      this.selectedArtist = artist;
      this.dialog = true;
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
