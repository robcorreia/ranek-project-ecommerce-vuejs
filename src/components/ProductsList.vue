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
    {{ url }}
  </section>
</template>

<script>
import { api } from "@/service/index";
import { serialize } from "@/helpers/index";

export default {
  data() {
    return {
      products: null,
      productsPerPage: 9,
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/product?_limit=${this.productsPerPage}${query}`;
    },
  },
  methods: {
    async getProducts() {
      const response = await api.get(this.url);
      this.products = response.data;
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style></style>
