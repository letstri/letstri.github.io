import Vue from 'vue';
import FilterColorGenerator from './FilterColorGenerator.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(FilterColorGenerator),
}).$mount('#app');
