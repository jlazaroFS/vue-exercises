<template>
  <v-btn
    color="primary"
    elevation="2"
    absolute
    bottom
    right
    fab
    @click="onClick"
  >
    <v-icon>
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: String
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>
