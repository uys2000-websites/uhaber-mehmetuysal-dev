import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeResolve((to, from) => {
  document.title = `${to.meta.title} | UHaber`;
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.meta.authRequired == true)
    return { name: "LoadingView" };
});

export default router;
