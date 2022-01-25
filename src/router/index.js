import VueRouter from 'vue-router'
import Pictionary from '../components/Pictionary.vue'
import Mainpage from '../components/Mainpage.vue'
export default new VueRouter({
    routes: [
        {
            path: '/pictionary',
            component: Pictionary,
        },
        {
            path: '/mainpage',
            component: Mainpage,
            children: [{
                path: 'pictionary',
                redirect: '/pictionary'
            }],
        },
    ]
})