import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artists: [
      {
        id: 1,
        name: "Taylor Swift",
        image: "taylor_swift.png",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageDataUrl: null // Store image data URL for preview
      },
      {
        id: 2,
        name: "Artist 2",
        image: "taylor_swift.png", // Assuming the image is the same as for Taylor Swift for now
        bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        imageDataUrl: null // Store image data URL for preview
      },
    ],
    albums: [
      {
        id: 1,
        title: "Red",
        cover: "red.png",
        artist: "Taylor Swift",
        details: "Lorem ipsum",
        imageDataUrl: null
      }
    ]
  },
  getters: {
    title: state => state.title,
    artists: state => state.artists,
    albums: state => state.albums
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
