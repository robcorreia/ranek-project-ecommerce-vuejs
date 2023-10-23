import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import LoadingPage from "./components/LoadingPage.vue";

Vue.component("LoadingPage", LoadingPage);

Vue.filter("priceFormat", (value) => {
  value = Number(value);
  if (!isNaN(value)) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "";
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
