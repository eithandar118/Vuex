import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
// import PostList from "../pages/post/PostList";
import store from "../store";

Vue.use(VueRouter);
console.log("hello")

const routes = [
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    // {
    //     path: "/post/list",
    //     name: "post-list",
    //     component: PostList,
    // },
    // {
    //     path: "/*",
    //     redirect: "/post/list",
    // },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

/**
 * This is to handle and check authentication for routing.
 */
router.beforeEach((to, from, next) => {
    const loggedIn = store.getters.isLoggedIn;
    if (!loggedIn && to.name != "login") {
        return next("/login");
    }
    next();
});

export default router;
