import {createRouter, createWebHashHistory} from "vue-router";
import homePage from "../components/home";
import eventList from "../components/event-list";
import addEvent from "../components/add-event";
import editEvent from "../components/edit-event";
import loginPage from "../components/login";
import registerPage from "../components/register";
import accountPage from "../components/account";

const routes = [
    {
        path: '/',
        component: homePage
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
        component: loginPage
    },
    {
        path: '/register',
        component: registerPage
    },
    {
        path: '/account',
        secure: true,
        component: accountPage
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router
