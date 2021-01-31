import Vue from 'vue'
import App from './App.vue'
import VueYoutube from 'vue-youtube'
import Input from './components/Input.vue'
import Player from './components/Player.vue'
import Playlist from './components/Playlist.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.component('section-input', Input);
Vue.component('section-player', Player);
Vue.component('section-playlist', Playlist);
Vue.use(VueYoutube);

new Vue({
  render: h => h(App),
}).$mount('#app')
