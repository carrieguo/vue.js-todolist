import Vue from 'vue';
import App from './app.vue';

import './assets/styles/test.css';
import './assets/styles/style.styl'
import './assets/images/a.jpg';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root)

if (module.hot) {
  console.log('hot..ddd..');
}