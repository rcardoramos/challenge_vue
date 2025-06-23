import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/Router";
import vuetify from "./plugins/vuetify";

createApp(App).use(router).use(vuetify).mount("#app");
