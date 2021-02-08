import Vue from 'vue';
import store from './containers/UiTable/store';
import App from './App.vue';
import components from './components/components.js';

require('./assets/css/reset.css');
require('./assets/css/base.css');

Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Object.keys(components).forEach(k => {
  Vue.component(k, components[k]);
});

new Vue({
  el: '#app',
  store,
  render: h => h(App),
})
