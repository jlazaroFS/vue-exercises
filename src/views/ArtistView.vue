<template>
  <div class="artists pa-8">
    <h1>Artists</h1>
    <p>Lorem ipsum</p>

    <!-- Button to open the add artist form dialog -->
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

    <AddArtistDialog
      :showFormDialog="showFormDialog"
      @add-artist="addNewArtist"
      @close-dialog="showFormDialog = false"
    />

    <div class="artist-grid">
      <ArtistCard
        v-for="(artist, index) in artists"
        :key="index"
        :artist="artist"
        @show-artist-dialog="showArtistDialog"
      />
    </div>

    <ArtistDialog
      :dialog="dialog"
      :selectedArtist="selectedArtist"
      @close-dialog="dialog = false"
      @show-edit-dialog="showEditArtistDialog"
      @show-delete-dialog="showDeleteArtistDialog"
    />

    <EditArtistDialog
      :dialog="editDialog"
      :selectedArtist="selectedArtist"
      @close-dialog="editDialog = false"
      @edit-artist="editArtist"
    />

    <DeleteArtistDialog
      :dialog="deleteDialog"
      :selectedArtist="selectedArtist"
      @close-dialog="deleteDialog = false"
      @delete-artist="deleteArtist"
    />
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
import EditArtistDialog from '../components/EditArtistDialog.vue';
import DeleteArtistDialog from '../components/DeleteArtistDialog.vue';

export default {
  components: {
    ArtistCard,
    ArtistDialog,
    AddArtistDialog,
    EditArtistDialog,
    DeleteArtistDialog
  },
  data() {
    return {
      dialog: false,
      editDialog: false,
      deleteDialog: false,
      showFormDialog: false,
      selectedArtist: null,
      artists: [
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
    showArtistDialog(artist) {
      this.selectedArtist = artist;
      this.dialog = true;
    },
    addNewArtist(newArtist) {
      this.artists.push({
        name: newArtist.name,
        image: newArtist.image,
        bio: newArtist.bio,
        imageDataUrl: newArtist.imageDataUrl // Store image data URL
      });
    },
    showEditArtistDialog(artist) {
      this.selectedArtist = artist;
      this.editDialog = true;
    },
    editArtist(artist) {
      const index = this.artists.findIndex(a => a.name === artist.name);
      if (index !== -1) {
        this.artists.splice(index, 1, artist);
      }
    },
    showDeleteArtistDialog(artist) {
      this.selectedArtist = artist;
      this.deleteDialog = true;
    },
    deleteArtist(artist) {
      const index = this.artists.findIndex(a => a.name === artist.name);
      if (index !== -1) {
        this.artists.splice(index, 1);
      }
    }
  }
};
</script>
