<template>
  <section>
    <h2>Endereço de envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finalizeOrder">
        Finalizar compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/service";
import { mapState } from "vuex";

export default {
  name: "FinalizeOrder",
  components: {
    UserForm,
  },
  props: ["product"],
  computed: {
    ...mapState(["user"]),
    order() {
      return {
        buyer_id: this.user.email,
        saler_id: this.product.user_id,
        product: this.product,
        address: {
          cep: this.user.cep,
          street: this.user.street,
          number: this.user.number,
          neighborhood: this.user.neighborhood,
          city: this.user.city,
          state: this.user.state,
        },
      };
    },
  },
  methods: {
    async createTransaction() {
      await api.post("/transaction", this.order);
      this.$router.push({ name: "orders" });
    },
    async userCreate() {
      try {
        await this.$store.dispatch("userCreate", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        await this.createTransaction();
      } catch (error) {
        console.log(error);
      }
    },
    finalizeOrder() {
      if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.userCreate();
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
