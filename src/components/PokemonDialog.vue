<template>
  <v-dialog v-model="dialog" max-width="1000px" @input="dialogClosed">
    <audio ref="cry" :src="selectedPokemon.cry" autoplay></audio>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="6">
            <div>
              <v-card-title class="text-h4 grey lighten-2">{{ selectedPokemon.name }}</v-card-title>
              <v-card-subtitle class="text grey lighten-2">{{ selectedPokemon.genus }}</v-card-subtitle>
              <v-card-text class="mt-5" style="font-size: 20px; text-align: justify;">
                {{ selectedPokemon.desc }}
              </v-card-text>
              <div class="pokemon-details mt-5 ml-5">
                <div><strong>Height</strong>
                  <p style="font-size: 18px">{{ selectedPokemon.height }} m</p>
                </div>
                <div><strong>Weight</strong>
                  <p style="font-size: 18px">{{ selectedPokemon.weight }} kg</p>
                </div>
                <div><strong>Ability</strong>
                  <p style="font-size: 18px">{{ selectedPokemon.ability }}
                  </p>
                </div>
                <div><strong>Generation</strong>
                  <p style="font-size: 18px">{{ selectedPokemon.generation }}
                  </p>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="pokemon-info">
              <img :src="selectedPokemon.artworkurl" :alt="selectedPokemon.name" style="max-height: 390px;">
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
      <div class="pokemon-number-footer">#{{ formatPokemonNumber(selectedPokemon.id) }}</div>
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
    formatPokemonNumber(number) {
      return String(number).padStart(4, '0');
    },
    playCry() {
      this.$refs.cry.play();
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
      return typeColors[type] || '#ddd';
    }
  }
}
</script>

<style scoped>
.pokemon-name-header {
  background-color: #ddd;
  padding: 8px;
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
  margin-top: 20px;
}

.type-chips .v-chip {
  margin: 5px;
  font-size: 20px;
  padding: 20px 30px;
}

.pokemon-number-footer {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
}

.pokemon-details {
  font-size: 16px;
}

.pokemon-details>div {
  display: inline-block;
  width: 50%;
}
</style>
