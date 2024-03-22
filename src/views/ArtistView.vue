<template>
  <div class="artists pa-8">
    <AddButton :color="'#7170E6'" @click="showFormDialog = true" />

    <AddArtistDialog :showFormDialog="showFormDialog" @add-artist="addNewArtist"
      @close-dialog="showFormDialog = false" />

    <div class="artist-grid">
      <ArtistCard v-for="(   artist, index   ) in    artists   " :key="index" :artist="artist"
        @show-artist-dialog="showArtistDialog" />
    </div>

    <ArtistDialog :dialog="dialog" :selectedArtist="selectedArtist" @close-dialog="dialog = false"
      @show-edit-dialog="showEditArtistDialog" @show-delete-dialog="showDeleteArtistDialog" />

    <EditArtistDialog :dialog="editDialog" :selectedArtist="selectedArtist" @close-dialog="editDialog = false"
      @edit-artist="editArtist" />

    <DeleteArtistDialog :dialog="deleteDialog" :selectedArtist="selectedArtist" @close-dialog="deleteDialog = false"
      @delete-artist="deleteArtist" />
  </div>
</template>

<style scoped>
.artist-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>

<script>
import { mapGetters } from 'vuex'
import AddButton from '../components/AddButton.vue';
import ArtistCard from '../components/ArtistCard.vue';
import ArtistDialog from '../components/ArtistDialog.vue';
import AddArtistDialog from '../components/AddArtistDialog.vue';
import EditArtistDialog from '../components/EditArtistDialog.vue';
import DeleteArtistDialog from '../components/DeleteArtistDialog.vue';

export default {
  name: 'Artists',
  components: {
    AddButton,
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
    };
  },
  mounted() {
    this.$emit('updateTitle', this.$options.name);
  },
  computed: {
    ...mapGetters([
      'artists'
    ]),
  },
  methods: {
    showArtistDialog(artist) {
      this.selectedArtist = artist;
      this.dialog = true;
    },
    addNewArtist(newArtist) {
      this.artists.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), // A way of getting unique IDs without importing new libraries
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
      const index = this.artists.findIndex(a => a.id === artist.id);
      if (index !== -1) {
        this.artists.splice(index, 1, artist);
      }
    },
    showDeleteArtistDialog(artist) {
      this.selectedArtist = artist;
      this.deleteDialog = true;
    },
    deleteArtist(artist) {
      const index = this.artists.findIndex(a => a.id === artist.id);
      if (index !== -1) {
        this.artists.splice(index, 1);
      }
    }
  }
};
</script>
