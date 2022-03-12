import VueRouter from 'vue-router'
import Pictionary from '../components/Pictionary.vue'
import Mainpage from '../components/Mainpage.vue'
import TicTacToe from '../components/TicTacToe.vue'
import Battleship from '../components/Battleship.vue'

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
            path: '/battleship',
            component: Battleship,
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
            },
            {
                path: 'battleship',
                redirect: '/battleship'
            }
            ],
        },
    ]
})