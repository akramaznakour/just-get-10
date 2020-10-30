import Vue from "vue";
import Router from "vue-router";
import Welcome from "./views/Welcome.vue";
import Game from "./views/Game.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/game",
      name: "game",
      component: Game
    }
  ]
});