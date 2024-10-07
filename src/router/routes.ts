import type { RouteRecordRaw } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("../layouts/Layout.vue"),
    meta: { title: "Base" },
    children: [
      {
        path: "",
        name: "HomeView",
        component: () => import("../views/HomeView.vue"),
        meta: { title: "Ana Sayfa" },
      },
      {
        path: "about",
        name: "AboutView",
        component: () => import("../views/AboutView.vue"),
        meta: { title: "Hakkimda" },
      },
      {
        path: "news",
        name: "JournalView",
        component: () => import("../views/JournalView.vue"),
        meta: { title: "Haber Özetleri" },
      },
    ],
  },
  {
    path: "/loader",
    name: "LoaderView",
    component: () => import("../views/LoaderView.vue"),
    meta: { title: "Loading" },
  },
  {
    path: "/login",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
    meta: { title: "Admin" },
  },
  {
    path: "/admin",
    name: "AdminView",
    component: () => import("../views/AdminView.vue"),
    meta: { title: "Admin", authRequired: true },
  },
] as RouteRecordRaw[];
