<template>
  <div v-if="product" class="product">
    <router-link
      class="product-img"
      :to="{ name: 'product', params: { id: product.id } }"
      ><img
        v-if="product.photos"
        :src="product.photos[0].src"
        :alt="product.photos[0].title"
      />
      <p>Ver Produto</p></router-link
    >
    <div class="details">
      <p class="price">{{ product.price | priceFormat() }}</p>
      <h2 class="title">{{ product.name }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"],
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.details {
  align-self: end;
}

.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
