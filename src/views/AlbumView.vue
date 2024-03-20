<template>
  <div class="albums pa-8">
    <h1>Albums</h1>
    <p>Lorem ipsum</p>

    <AddButton @click="showFormDialog = true"/>

    <AddAlbumDialog
      :showFormDialog="showFormDialog"
      @add-album="addNewAlbum"
      @close-dialog="showFormDialog = false"
    />

    <div class="album-grid">
      <AlbumCard
        v-for="(album, index) in albums"
        :key="index"
        :album="album"
        @show-album-dialog="showAlbumDialog"
      />
    </div>

    <AlbumDialog
      :dialog="dialog"
      :selectedAlbum="selectedAlbum"
      @close-dialog="dialog = false"
      @show-edit-dialog="showEditAlbumDialog"
      @show-delete-dialog="showDeleteAlbumDialog"
    />

    <EditAlbumDialog
      :dialog="editDialog"
      :selectedAlbum="selectedAlbum"
      @close-dialog="editDialog = false"
      @edit-album="editAlbum"
    />

    <DeleteAlbumDialog
      :dialog="deleteDialog"
      :selectedAlbum="selectedAlbum"
      @close-dialog="deleteDialog = false"
      @delete-album="deleteAlbum"
    />
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
      const index = this.albums.findIndex(a => a.title === album.title);
      if (index !== -1) {
        this.albums.splice(index, 1, album);
      }
    },
    showDeleteAlbumDialog(album) {
      this.selectedAlbum = album;
      this.deleteDialog = true;
    },
    deleteAlbum(album) {
      const index = this.albums.findIndex(a => a.title === album.title);
      if (index !== -1) {
        this.albums.splice(index, 1);
      }
    }
  }
};
</script>
