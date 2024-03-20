<template>
  <v-app id="inspire">
    <NavigationDrawer :drawer="drawer" :items="items" @toggleDrawer="toggleDrawer" />
    
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue';

export default {
  components: {
    NavigationDrawer,
  },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Albums', icon: 'mdi-album', to: '/albums' },
      { title: 'Artists', icon: 'mdi-account-music', to: '/artists' },
    ],
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
