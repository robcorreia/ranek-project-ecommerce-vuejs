<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="products-wrapper" v-for="(sale, index) in sales" :key="index">
        <ProductItem v-if="sale.product" :product="sale.product">
          <p class="saler">
            <span>Comprador:</span>
            {{ sale.buyer_id }}
          </p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="sale.address">
            <li v-for="(value, key) in sale.address" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { api } from "@/service";
import { mapState } from "vuex";

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      sales: null,
    };
  },
  computed: {
    ...mapState(["user", "login"]),
  },
  methods: {
    async getSales() {
      const response = await api.get(`/transaction?saler_id=${this.user.id}`);
      console.log(response);
      this.sales = response.data;
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
.products-wrapper {
  margin-bottom: 40px;
}

.saler span {
  color: #e80;
}

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0px;
  justify-self: end;
}
</style>
