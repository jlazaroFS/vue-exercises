import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    artists: [
      {
        name: "Taylor Swift",
        image: "taylor_swift.png",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageDataUrl: null // Store image data URL for preview
      },
      {
        name: "Artist 2",
        image: "taylor_swift.png", // Assuming the image is the same as for Taylor Swift for now
        bio: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        imageDataUrl: null // Store image data URL for preview
      },
    ]
  },
  getters: {
    title: state => state.title,
    artists: state => state.artists
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
