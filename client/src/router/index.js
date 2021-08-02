
import Vue from 'vue'
import Router from 'vue-router'
//import Helloworld from '@/components/Helloworld'

import UserIndex from '@/components/Index'
import CreateUser from '@/components/CreateUser'
import EditUser from '@/components/EditUser'
import ShowUser from '@/components/ShowUser'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/users',
            name: 'users',
            component: UserIndex
        },
        {
            path: '/createuser',
            Create: 'createuser',
            component: CreateUser
        },
        {
            path: '/edituser',
            name: 'edituser',
            component: EditUser
        },
        {
            path: '/user',
            Createme: 'showuser',
            component: ShowUser
        }
    ]
})