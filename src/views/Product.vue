<template>
  <section>
    <div v-if="product" class="product">
      <ul v-if="product.photos" class="photos">
        <li v-for="(photo, index) in product.photos" :key="index">
          <img :src="photo.src" :alt="photo.title" />
        </li>
      </ul>
      <div class="details">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | priceFormat(product.price) }}</p>
        <p class="description">{{ product.description }}</p>
        <transition v-if="product.sold === 'false'" mode="out-in">
          <button v-if="!finalize" class="btn" @click="finalize = true">
            Comprar
          </button>
          <FinalizeOrder v-else :product="product" />
        </transition>
        <button v-else class="btn" disabled>Produto Vendido</button>
      </div>
    </div>
    <LoadingPage v-else />
  </section>
</template>

<script>
import { api } from "../service/index";
import FinalizeOrder from "@/components/FinalizeOrder.vue";

export default {
  name: "Product",
  props: ["id"],
  components: {
    FinalizeOrder,
  },
  data() {
    return {
      product: null,
      finalize: false,
    };
  },
  methods: {
    async getProduct() {
      const response = await api.get(`/product/${this.id}`);
      this.product = response.data;
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.description {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  width: 200px;
}
</style>
