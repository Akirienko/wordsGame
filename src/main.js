import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
import "./main.css";
// import { useAuth } from "@//isUserExist";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
