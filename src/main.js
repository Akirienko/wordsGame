import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/tailwind.css";
import "./main.css";
// import { useAuth } from "@/stores/isUserExist";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");

// (async () => {
//   const app = createApp(App);

//   app.use(pinia);
//   const { bindUser } = useAuth();
//   await bindUser();

//   app.use(router);
//   app.mount("#app");
// })();
