<template>
  <v-dialog v-model="dialog" width="650" @input="dialogClosed">
    <v-card v-if="selectedAlbum">
      <v-card-title class="text-h5 grey lighten-2">{{ selectedAlbum.title }}</v-card-title>
      <v-card-subtitle class="text grey lighten-2 pt-1">{{ selectedAlbum.artist }}</v-card-subtitle>
      <v-container>
        <v-row>
          <v-col cols="6">
            <div>
              <v-card-text class="mt-5">{{ selectedAlbum.details }}</v-card-text>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="album-cover">
              <img
                :src="selectedAlbum.imageDataUrl ? selectedAlbum.imageDataUrl : require(`../assets/albums/${selectedAlbum.cover}`)"
                :alt="selectedAlbum.title" style="max-height: 300px;">
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" text @click="showEditAlbumDialog">
          <v-icon>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn color="error" text @click="showDeleteAlbumDialog">
          <v-icon>mdi-trash-can</v-icon>
          Delete
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">
          <v-icon>mdi-close</v-icon>
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
    dialogClosed(value) {
      if (!value) {
        this.$emit('close-dialog', false);
      }
    },
    showEditAlbumDialog() {
      this.$emit('close-dialog', false);
      this.$emit('show-edit-dialog', this.selectedAlbum)
    },
    showDeleteAlbumDialog() {
      this.$emit('close-dialog', false);
      this.$emit('show-delete-dialog', this.selectedAlbum)
    }
  }
}
</script>
