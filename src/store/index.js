import Vue from "vue";
import Vuex from "vuex";
import { api } from "../service/index";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    user_products: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.user_products = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.user_products.unshit(payload);
    },
  },
  actions: {
    async getUserProducts(context) {
      const response = await api.get(`/product?${context.state.user.id}`);
      context.commit("UPDATE_USER_PRODUCTS", response.data);
    },
    getUser(context, payload) {
      return api.get(`/user/${payload}`).then((response) => {
        context.commit("UPDATE_USER", response.data);
        context.commit("UPDATE_LOGIN", true);
      });
    },
    userCreate(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email });
      return api.post("/user", payload);
    },
    logout(context) {
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: "",
        password: "",
        cep: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
      });
      context.commit("UPDATE_LOGIN", false);
    },
  },
});
