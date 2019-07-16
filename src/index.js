import Vue from 'vue';
import App from './app.vue';

//import './assests/styles/test.css';
//import './assests/image/bg.jpeg'

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  render: (h) => h(App)
}).$mount(root)