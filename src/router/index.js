import Vue from "vue";
import Router from "vue-router";

import Search from "../pages/search.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  routes: [
    {
      path: "/", // Пока будет по слешу
      name: "Search",
      component: Search
    }
  ]
});
