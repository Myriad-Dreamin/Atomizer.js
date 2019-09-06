import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'landing-page',
            component: require('@views/LandingPage').default
        },{
            path: '/console',
            name: 'console',
            component: require('@views/Show').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
