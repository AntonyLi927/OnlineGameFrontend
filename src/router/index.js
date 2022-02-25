import VueRouter from 'vue-router'
import Pictionary from '../components/Pictionary.vue'
import Mainpage from '../components/Mainpage.vue'
import TicTacToe from '../components/TicTacToe.vue'
export default new VueRouter({
    routes: [
        {
            path: '/pictionary',
            component: Pictionary,
        },
        {
            path: '/tictactoe',
            component: TicTacToe,
        },
        {
            path: '/mainpage',
            component: Mainpage,
            children: [{
                path: 'pictionary',
                redirect: '/pictionary'
            },
            {
                path: 'tictactoe',
                redirect: '/tictactoe'
            }
            ],
        },
    ]
})