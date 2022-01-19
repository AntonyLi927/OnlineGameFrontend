import VueRouter from 'vue-router'
import Pictionary from '../components/Pictionary.vue'
export default new VueRouter({
    routes: [
        {
            path: '/pictionary',
            component: Pictionary,
        },
    ]
})