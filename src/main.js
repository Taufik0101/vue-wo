import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "sweetalert2";
import store from "./store/store";

import "./assets/vendors/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
app.use(router, VueSweetalert2, store);
app.mount("#app");
