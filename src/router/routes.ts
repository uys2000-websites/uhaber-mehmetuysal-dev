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
        meta: { title: "Home" },
      },
      {
        path: "about",
        name: "AboutView",
        component: () => import("../views/AboutView.vue"),
        meta: { title: "About" },
      },
      {
        path: "news",
        name: "NewsView",
        component: () => import("../views/NewsView.vue"),
        meta: { title: "Kaynak" },
      },
      {
        path: "news/:id",
        name: "SourceView",
        component: () => import("../views/NewsView.vue"),
        meta: { title: "Kaynak" },
      },
      {
        path: "news/:id/:category",
        name: "CategoryView",
        component: () => import("../views/NewsView.vue"),
        meta: { title: "Kaynak" },
      },
    ],
  },
] as RouteRecordRaw[];
