import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/pages/Layout'
import ArticleList from '@/pages/ArticleList/index'
import AddClass from '@/pages/AddClass/index'
import AddArticle from '@/pages/AddArticle/index'
import CreditDetail from '@/pages/CreditDetail/index'
import CreditSetting from '@/pages/CreditSetting/index'
import UserList from '@/pages/UserList/index'
import TeacherList from '@/pages/TeacherList/index'
import MyClass from '@/pages/MyClass/index'
import ClassList from '@/pages/ClassList/index'
import Classify from '@/pages/Classify/index'

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
            },  {
                path: '/AddArticle',
                name: 'AddArticle',
                component: AddArticle,
            }, {
                path: '/ClassList',
                name: 'ClassList',
                component: ClassList,
            }, {
                path: '/AddClass',
                name: 'AddClass',
                component: AddClass,
            }, {
                path: '/CreditDetail',
                name: 'CreditDetail',
                component: CreditDetail,
            }, {
                path: '/CreditSetting',
                name: 'CreditSetting',
                component: CreditSetting,
            }, {
                path: '/UserList',
                name: 'UserList',
                component: UserList,
            }, {
                path: '/TeacherList',
                name: 'TeacherList',
                component: TeacherList,
            }, {
                path: '/MyClass',
                name: 'MyClass',
                component: MyClass,
            }, {
                path: '/Classify',
                name: 'Classify',
                component: Classify,
            },
        ],
    },
  ]
})

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('user')
        next()
    } else {
        let user = JSON.parse(window.localStorage.getItem('user'))
        if (!user) {
            next({path: '/login'})
        } else {
            next()
        }
    }
})

export default router
