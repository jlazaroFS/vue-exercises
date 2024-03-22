<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense nav>
      <v-list-item :to="homeItem.to" link>
        <v-list-item-icon>
          <v-icon>{{ homeItem.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ homeItem.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-group prepend-icon="mdi-music" v-model="musicGroup" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Music</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="item in musicItems" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item v-for="item in otherItems" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data: () => ({
    homeItem: { title: 'Home', icon: 'mdi-home', to: '/' },
    musicGroup: true,
    musicItems: [
      { title: 'Albums', icon: 'mdi-album', to: '/albums' },
      { title: 'Artists', icon: 'mdi-account-music', to: '/artists' }
    ],
    otherItems: [
      { title: 'Pokémon', icon: 'mdi-pokeball', to: '/pokemon' }
    ],
  }),
};
</script>
