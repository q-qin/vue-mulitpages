import Vue from "vue";
import Router from "vue-router";
import routes from "vue-auto-routing";
import { createRouterLayout } from "vue-router-layout";
import store from "./store";
import { session } from "@/utils/store";
import { setTitle } from "@/utils/ddTitle";
Vue.use(Router);
const RouterLayout = createRouterLayout(layout =>
  import("@/layouts/" + layout + ".vue")
);
const router = new Router({
  routes: [
    {
      path: "/",
      component: RouterLayout,
      children: routes
    }
  ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  store.commit("updateLoadingStatus", true);
  !!to.meta.title && setTitle(to.meta.title);
  if (to.name === "login") {
    session.clear();
    next();
  } else {
    if (session.get("access_token")) {
      if (to.path === "/cooperator" && !session.get("storeInfo")) {
        next({ path: "/replcecoper" });
      } else {
        next();
      }
    } else {
      next({ path: "/login" });
    }
  }
});
router.afterEach(route => {
  if (!route.meta.loading) {
    store.commit("updateLoadingStatus", false);
  }
});
export default router;
