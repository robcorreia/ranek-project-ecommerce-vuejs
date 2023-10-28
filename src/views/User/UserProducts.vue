<template>
  <section>
    <h2>Adicionar Produtos</h2>
    <AddProduct />
    <h2>Seus Produtos</h2>
    <transition-group v-if="user_products" name="list" tag="ul">
      <li v-for="(product, index) in user_products" :key="index">
        <ProductItem :product="product">
          <p>{{ product.description }}</p>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import AddProduct from "@/components/AddProduct.vue";
import ProductItem from "@/components/ProductItem.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "UserProducts",
  components: {
    AddProduct,
    ProductItem,
  },
  computed: {
    ...mapState(["login", "user", "user_products"]),
  },
  methods: {
    ...mapActions(["getUserProducts"]),
  },
  watch: {
    login() {
      this.getUserProducts();
    },
  },
  created() {
    if (this.login) {
      this.getUserProducts();
    }
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
</style>
