import { createRouter, createWebHistory } from "vue-router";
import UserList from "../views/UserList.vue";
import UserCreate from "../views/UserCreate.vue";
import UserEdit from "../views/UserEdit.vue";

const routes = [
  {
    path: "/",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/create",
    name: "UserCreate",
    component: UserCreate,
  },
  {
    path: "/edit/:id",
    name: "UserEdit",
    component: UserEdit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
