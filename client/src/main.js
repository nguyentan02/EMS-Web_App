import "./assets/style.css";
import router from "./router";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "vue-toast-notification/dist/theme-sugar.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Lara from "@/presets/lara";
import "../node_modules/flowbite-vue/dist/index.css";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
const app = createApp(App);

const pinia = createPinia();
app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.mount("#app");

// import as directive
