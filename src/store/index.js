import Vue from "vue";
import Vuex from "vuex";
import { api } from "../service/index";

Vue.use(Vuex);

export default new Vuex.Store({
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
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async getUser(context, payload) {
      try {
        const response = await api.get(`/user/${payload}`);
        context.commit("UPDATE_USER", response.data);
        context.commit("UPDATE_LOGIN", true);
      } catch (error) {
        console.log(error);
        throw new Error("Usuário não existe.");
      }
    },
  },
  modules: {},
});
