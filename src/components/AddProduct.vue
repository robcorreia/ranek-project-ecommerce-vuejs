<template>
  <form class="addProduct">
    <label for="name">Nome</label>
    <input id="name" name="name" type="text" v-model="product.name" />
    <label for="price">Preço (R$)</label>
    <input id="price" name="price" type="text" v-model="product.price" />
    <label for="photos">Fotos</label>
    <input id="photos" name="photos" type="file" ref="photos" />
    <label for="description">Descrição</label>
    <textarea
      id="description"
      name="description"
      v-model="product.description"
    ></textarea>
    <input
      class="btn"
      type="button"
      value="Adicionar Produto"
      @click.prevent="addProduct"
    />
  </form>
</template>

<script>
import { api } from "@/service";

export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        name: "",
        price: "",
        description: "",
        photos: null,
      },
    };
  },
  methods: {
    productFormat() {
      this.product.user_id = this.$store.state.user.id;
    },
    async addProduct() {
      this.productFormat();
      await api.post("/product", this.product);
      this.$store.dispatch("getUserProducts");
    },
  },
};
</script>

<style scoped>
.addProduct {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
