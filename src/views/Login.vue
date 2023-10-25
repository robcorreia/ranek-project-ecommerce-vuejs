<template>
  <section class="login">
    <form>
      <h1>Login</h1>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="passwword">Senha</label>
      <input
        type="passwword"
        name="passwword"
        id="passwword"
        v-model="login.password"
      />
      <button class="btn" @click.prevent="logIn">Logar</button>
    </form>
    <p class="lostPassword">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <CreateUser />
  </section>
</template>

<script>
import CreateUser from "@/components/CreateUser.vue";

export default {
  components: { CreateUser },
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch("getUser", this.login.email);
      this.$router.push({ name: "user" });
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.lostPassword {
  text-align: center;
  margin: 20px auto 0 auto;
}

.lostPassword:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
