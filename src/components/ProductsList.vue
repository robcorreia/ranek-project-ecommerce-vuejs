<template>
  <section class="container-product">
    <div v-for="product in products" :key="product.id">
      <img
        v-if="product.photos"
        :src="product.photos[0].src"
        :alt="product.photos[0].title"
      />
      <h2 class="title">{{ product.name }}</h2>
      <p class="price">{{ product.price }}</p>
      <p>{{ product.description }}</p>
    </div>
  </section>
</template>

<script>
import { api } from "@/service/index";

export default {
  data() {
    return {
      products: null,
    };
  },
  methods: {
    async getProducts() {
      const response = await api.get("/product");
      this.products = response.data;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style></style>
