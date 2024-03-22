<template>
  <div class="albums pa-8">
    <AddButton :color="'#008F7A'" @click="showFormDialog = true" />

    <AddAlbumDialog :showFormDialog="showFormDialog" @add-album="addNewAlbum" @close-dialog="showFormDialog = false" />

    <div class="album-grid">
      <AlbumCard v-for="(album, index) in albums" :key="index" :album="album" @show-album-dialog="showAlbumDialog" />
    </div>

    <AlbumDialog :dialog="dialog" :selectedAlbum="selectedAlbum" @close-dialog="dialog = false"
      @show-edit-dialog="showEditAlbumDialog" @show-delete-dialog="showDeleteAlbumDialog" />

    <EditAlbumDialog :dialog="editDialog" :selectedAlbum="selectedAlbum" @close-dialog="editDialog = false"
      @edit-album="editAlbum" />

    <DeleteAlbumDialog :dialog="deleteDialog" :selectedAlbum="selectedAlbum" @close-dialog="deleteDialog = false"
      @delete-album="deleteAlbum" />
  </div>
</template>

<style scoped>
.album-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>

<script>
import { mapGetters } from 'vuex'
import AddButton from '../components/AddButton.vue';
import AlbumCard from '../components/AlbumCard.vue';
import AlbumDialog from '../components/AlbumDialog.vue';
import AddAlbumDialog from '../components/AddAlbumDialog.vue';
import EditAlbumDialog from '../components/EditAlbumDialog.vue';
import DeleteAlbumDialog from '../components/DeleteAlbumDialog.vue';

export default {
  name: 'Albums',
  components: {
    AddButton,
    AlbumCard,
    AlbumDialog,
    AddAlbumDialog,
    EditAlbumDialog,
    DeleteAlbumDialog
  },
  data() {
    return {
      dialog: false,
      editDialog: false,
      deleteDialog: false,
      showFormDialog: false,
      selectedAlbum: null,
    };
  },
  mounted() {
    this.$emit('updateTitle', this.$options.name);
  },
  computed: {
    ...mapGetters([
      'albums'
    ]),
  },
  methods: {
    showAlbumDialog(album) {
      this.selectedAlbum = album;
      this.dialog = true;
    },
    addNewAlbum(newAlbum) {
      this.albums.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), // A way of getting unique IDs without importing new libraries
        title: newAlbum.title,
        artist: newAlbum.artist,
        cover: newAlbum.cover,
        details: newAlbum.details,
        imageDataUrl: newAlbum.imageDataUrl
      });
    },
    showEditAlbumDialog(album) {
      this.selectedAlbum = album;
      this.editDialog = true;
    },
    editAlbum(album) {
      const index = this.albums.findIndex(a => a.id === album.id);
      if (index !== -1) {
        this.albums.splice(index, 1, album);
      }
    },
    showDeleteAlbumDialog(album) {
      this.selectedAlbum = album;
      this.deleteDialog = true;
    },
    deleteAlbum(album) {
      const index = this.albums.findIndex(a => a.id === album.id);
      if (index !== -1) {
        this.albums.splice(index, 1);
      }
    }
  }
};
</script>
