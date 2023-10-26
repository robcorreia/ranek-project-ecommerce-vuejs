<template>
  <section>
    <h2>Crie a sua Conta</h2>
    <transition mode="out-in">
      <button v-if="!create" @click="create = true" class="btn">
        Criar conta
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="userCreate">
          Criar Usuário
        </button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from "./UserForm.vue";

export default {
  name: "CreateUser",
  components: {
    UserForm,
  },
  data() {
    return {
      create: false,
    };
  },
  methods: {
    async userCreate() {
      try {
        await this.$store.dispatch("userCreate", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        this.$router.push({ name: "user" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
