import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/pages/Layout'
import ArticleList from '@/pages/ArticleList/index'
import GatherList from '@/pages/GatherList/index'
import GatherCreate from '@/pages/GatherCreate/index'
import GatherEdit from '@/pages/GatherEdit/index'
import GatherApi from '@/pages/GatherApi/index'
import GatherType from '@/pages/GatherType/index'
import Gather from '@/pages/Gather/index'
import AddArticle from '@/pages/AddArticle/index'
const Login = resolve => require(['@/pages/Login/index'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [
    {
        path: '/Login',
        name: 'Login',
        component: Login,
    },{
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'ArticleList',
                component: ArticleList,
            }, {
                path: '/GatherCreate',
                name: 'GatherCreate',
                component: GatherCreate,
            },{
                path: '/GatherEdit',
                name: 'GatherEdit',
                component: GatherEdit,
            }, {
                path: '/GatherApi',
                name: 'GatherApi',
                component: GatherApi,
            }, {
                path: '/GatherList',
                name: 'GatherList',
                component: GatherList,
            }, {
                path: '/GatherType',
                name: 'GatherType',
                component: GatherType,
            }, {
                path: '/Gather',
                name: 'Gather',
                component: Gather,
            }, 
            {
                path: '/AddArticle',
                name: 'AddArticle',
                component: AddArticle,
            }, 
        ],
    },
  ]
})

// router.beforeEach((to, from, next) => {
//     if (to.path.startsWith('/login')) {
//         window.localStorage.removeItem('user')
//         next()
//     } else {
//         let user = JSON.parse(window.localStorage.getItem('user'))
//         if (!user) {
//             next({path: '/login'})
//         } else {
//             next()
//         }
//     }
// })

export default router
