<template>
  <v-dialog v-model="dialog" max-width="500px" @input="dialogClosed">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="6">
            <div>
              <v-card-title class="text-h5 grey lighten-2">{{ selectedPokemon.name.toUpperCase()
                }}</v-card-title>
              <v-card-subtitle class="text-h6 grey lighten-2">{{ selectedPokemon.genus }}</v-card-subtitle>
              <v-card-text class="mt-5">{{ selectedPokemon.bio }}</v-card-text>
            </div>
          </v-col>
          <!-- Right side with sprite and types -->
          <v-col cols="6">
            <div class="pokemon-info">
              <img :src="selectedPokemon.imgurl" :alt="selectedPokemon.name" class="pokemon-sprite">
              <div class="type-chips">
                <v-chip v-for="(type, index) in selectedPokemon.types" :key="index" :color="getTypeChipColor(type)">
                  {{ type.toUpperCase() }}
                </v-chip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
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
    selectedPokemon: {
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
    showEditPokemonDialog() {
      this.$emit('close-dialog', false);
      this.$emit('show-edit-dialog', this.selectedPokemon);
    },
    showDeletePokemonDialog() {
      this.$emit('close-dialog', false);
      this.$emit('show-delete-dialog', this.selectedPokemon);
    },
    getTypeChipColor(type) {
      const typeColors = {
        'normal': '#A8A77A',
        'fire': '#EE8130',
        'water': '#6390F0',
        'electric': '#F7D02C',
        'grass': '#7AC74C',
        'ice': '#96D9D6',
        'fighting': '#C22E28',
        'poison': '#A33EA1',
        'ground': '#E2BF65',
        'flying': '#A98FF3',
        'psychic': '#F95587',
        'bug': '#A6B91A',
        'rock': '#B6A136',
        'ghost': '#735797',
        'dragon': '#6F35FC',
        'dark': '#705746',
        'steel': '#B7B7CE',
        'fairy': '#D685AD',
      };
      // Return color class based on the type
      return typeColors[type] || '#ddd';
    }
  }
}
</script>

<style scoped>
.pokemon-sprite {
  width: 100%;
  height: auto;
}

.pokemon-name-header {
  background-color: #ddd;
  padding: 8px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.type-chips {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
}
