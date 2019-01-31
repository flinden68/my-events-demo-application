import VueRouter from "vue-router";
import home from "../components/home";
import eventList from "../components/event-list";
import addEvent from "../components/add-event";
import editEvent from "../components/edit-event";
import login from "../components/login";
import register from "../components/register";
import account from "../components/account";
import Vue from "vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: home
    },
    {
        path: '/events',
        secure: true,
        component: eventList
    },
    {
        path: '/event/add',
        secure: true,
        component: addEvent
    },
    {
        path: '/event/:id',
        secure: true,
        name: 'event_edit',
        component: editEvent,
        props(route) {
            return  route.params || {}
        }
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/account',
        secure: true,
        component: account
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes // short for `routes: routes`
})

/*router.beforeEach((to, from, next) => {
    // Look at all routes
    router.options.routes.forEach((route) => {
        // If this is the current route and it's secure
        if (to.matched[0].path === route.path && route.secure) {
            // Verify that the user isn't logged in
            console.log("It is a secure route: " + store.state.authenticated);

            if(!store.state.isAuthenticated){
                return next('/login');
            }
            /!*router.app.$http.post('/auth/loggedin').catch((response) => {
                // Kill the session
                router.app.$session.destroy();
                // Route back to the landing
                return next('/');
            });*!/
        }
    });
    // Proceed as normal
    next();
});*/

export default router
