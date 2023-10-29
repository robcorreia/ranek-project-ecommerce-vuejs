<template>
  <form>
    <div class="user" v-if="showLoginData">
      <label for="name">Nome</label>
      <input id="name" name="name" type="text" v-model="name" />
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email" />
      <label for="password">Senha</label>
      <input id="password" name="password" type="password" v-model="password" />
    </div>

    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="fillCep" />
    <label for="street">Rua</label>
    <input id="street" name="street" type="text" v-model="street" />
    <label for="number">Numero</label>
    <input id="number" name="number" type="text" v-model="number" />
    <label for="neighborhood">Bairro</label>
    <input
      id="neighborhood"
      name="neighborhood"
      type="text"
      v-model="neighborhood"
    />
    <label for="city">Cidade</label>
    <input id="city" name="city" type="text" v-model="city" />
    <label for="state">Estado</label>
    <input id="state" name="state" type="text" v-model="state" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "../helpers/index";
import { getCep } from "../service/index";

export default {
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "cep",
        "street",
        "number",
        "neighborhood",
        "city",
        "state",
      ],
      base: "user",
      mutation: "UPDATE_USER",
    }),
    showLoginData() {
      return !this.$store.state.login || this.$route.name === "user-edit";
    },
  },

  methods: {
    async fillCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        const response = await getCep(cep);
        this.street = response.data.logradouro;
        this.city = response.data.localidade;
        this.state = response.data.uf;
        this.neighborhood = response.data.bairro;
      }
    },
  },
};
</script>

<style scoped>
form,
.user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
