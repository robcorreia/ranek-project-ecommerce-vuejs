<template>
  <section>
    <UserForm>
      <button class="btn" @click.prevent="userUpdate">Atualizar Usuário</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/service";

export default {
  name: "UserEdit",
  components: { UserForm },
  methods: {
    async userUpdate() {
      try {
        await api.put(
          `/user/${this.$store.state.user.id}`,
          this.$store.state.user
        );
        this.$store.dispatch("getUser", this.$store.state.user.id);
        this.$router.push({ name: "user" });
      } catch (error) {
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
