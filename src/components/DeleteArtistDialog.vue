<template>
  <v-dialog v-model="dialog" width="500" @input="dialogClosed">
    <v-card v-if="selectedArtist">
      <v-card-title class="text-h5 grey lighten-2">Deleting {{ selectedArtist.name }}</v-card-title>
      <v-card-text class="mt-5">Are you sure you want to delete {{ selectedArtist.name }}?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="deleteArtist">
          <v-icon>mdi-trash-can</v-icon>
          Delete
        </v-btn>
        <v-btn color="primary" text @click="closeDialog">
          <v-icon>mdi-close</v-icon>
          Cancel
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
    deleteArtist() {
      this.$emit('close-dialog', false);
      this.$emit('delete-artist', this.selectedArtist);
    }
  }
}
</script>
