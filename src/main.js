import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

// Thêm tất cả các icon solid vào thư viện Font Awesome
library.add(fas);

const app = createApp(App);

// Đăng ký component Font Awesome
app.component('font-awesome-icon', FontAwesomeIcon);

// Sử dụng VueMoment với moment-timezone
app.use(VueMoment, moment);

// Sử dụng Pinia
const pinia = createPinia();
app.use(pinia);

// Sử dụng router
app.use(router);

app.mount('#app');
