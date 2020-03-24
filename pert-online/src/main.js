import Vue from 'vue';
import Pert from './Pert.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Pert),
}).$mount('#app');
