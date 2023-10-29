<template>
  <section>
    <div v-if="orders">
      <h2>Compras</h2>
      <div
        class="products-wrapper"
        v-for="(order, index) in orders"
        :key="index"
      >
        <ProductItem v-if="order.product" :product="order.product">
          <p class="saler"><span>Vendedor: </span>{{ order.saler_id }}</p>
        </ProductItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { api } from "@/service";
import { mapState } from "vuex";

export default {
  name: "UserOrders",
  components: {
    ProductItem,
  },
  data() {
    return {
      orders: null,
    };
  },
  computed: {
    ...mapState(["user", "login"]),
  },
  methods: {
    async getSales() {
      const response = await api.get(`/transaction?buyer_id=${this.user.id}`);
      this.orders = response.data;
    },
  },
  watch: {
    login() {
      this.getSales();
    },
  },
  created() {
    if (this.login) {
      this.getSales();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.saler span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
