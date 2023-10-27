import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login.vue";
import User from "../views/User/User.vue";
import UserProducts from "../views/User/UserProducts.vue";
import UserEdit from "../views/User/UserEdit.vue";
import UserOrders from "../views/User/UserOrders.vue";
import UserSales from "../views/User/UserSales.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product,
    props: true,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user",
    component: User,
    children: [
      {
        path: "",
        name: "user",
        component: UserProducts,
      },
      {
        path: "edit",
        name: "user-edit",
        component: UserEdit,
      },
      {
        path: "sales",
        name: "sales",
        component: UserSales,
      },
      {
        path: "orders",
        name: "orders",
        component: UserOrders,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

export default router;
