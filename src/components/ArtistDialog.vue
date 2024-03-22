<template>
  <v-dialog v-model="dialog" width="650" @input="dialogClosed">
    <v-card v-if="selectedArtist">
      <v-card-title class="text-h5 grey lighten-2">{{ selectedArtist.name }}</v-card-title>
      <v-container>
        <v-row>
          <v-col cols="6">
            <div>
              <v-card-text class="mt-5">{{ selectedArtist.bio }}</v-card-text>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="artist-pic">
              <img
                :src="selectedArtist.imageDataUrl ? selectedArtist.imageDataUrl : require(`../assets/artists/${selectedArtist.image}`)"
                :alt="selectedArtist.name" style="max-height: 350px;">
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="secondary" text @click="showEditArtistDialog">
          <v-icon>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn color="error" text @click="showDeleteArtistDialog">
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
    selectedArtist: {
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
    showEditArtistDialog() {
      this.$emit('close-dialog', false);
      this.$emit('show-edit-dialog', this.selectedArtist)
    },
    showDeleteArtistDialog() {
      this.$emit('close-dialog', false);
      this.$emit('show-delete-dialog', this.selectedArtist)
    }
  }
}
</script>

<style scoped>
.artist-pic {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
