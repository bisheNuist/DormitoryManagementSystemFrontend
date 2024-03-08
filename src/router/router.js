import VueRouter from 'vue-router'
import Index from "@/pages/Index.vue";
import Login from "@/pages/LoginPage.vue";
import Register from "@/pages/RegisterPage.vue";
import Personal from "@/pages/PersonalPage.vue";
import DormitoryManagementPage from "@/pages/DormitoryManagementPage.vue";
import Vue from 'vue'
import StuManagementPage from "@/pages/StuManagementPage";
import RechargeServicePage from "@/pages/RechargeServicePage";
import ApplyPage from "@/pages/ApplyPage";
import StuAffairPage from "@/pages/StuAffairPage";
import OrderPage from "@/pages/OrderPage";

Vue.use(VueRouter)

// 创建路由对象
const routes = [{
    path: "/",
    // 重定项
    redirect: '/index'
},
    {
        path: '/index',
        component: Index,
        children:[
            {
                path: '/personal',
                component: Personal
            },
            {
                path: '/dormitory',
                component: DormitoryManagementPage
            },
            {
                path: '/student',
                component: StuManagementPage
            },
            {
                path: '/apply',
                component: ApplyPage
            },
            {
                path: '/stuAffair',
                component: StuAffairPage
            },
            {
                path: '/order',
                component: OrderPage
            },
            {
                path: '/recharge',
                component: RechargeServicePage
            }
        ]
    },

    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]
const router = new VueRouter({
    // 配置URL和组价直接的映射关系
    routes,
    // history模式
    mode: 'hash'
})

export default router