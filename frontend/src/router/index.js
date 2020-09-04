import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Projectlist from '../components/Projectlist.vue';
import ProjectInfo from '../components/Project.vue';
import Home from '../components/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login', component: Login
  },
  // {
  //   path: '/', redirect: '/login'
  // },
  {
    path: '/',
    component: Home,
    name: '',
    projectHidden: true,
    children: [
        { path: '/projectList', component: Projectlist, iconCls:'el-icon-message', name: '项目列表'},
        // { path: '/robot', component: robot, iconCls:'fa fa-id-card-o', name: '消息机器人', meta: { keepAlive: false }},
        // { path: '/about', component: About, iconCls:'fa fa-address-card', name: '关于我们'},
        ]
},

 
];

const router = new VueRouter({
  routes
});

// 挂载路由导航守卫
// 如果用户没有登录，但是直接通过url访问特定页面，需要重新导航到登录页面
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //  next() 放行       next('/login') 强制跳转

  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  // 如果没有token，强制跳转到登录页面
  if (!tokenStr) return next('/login');
  // 如果没有return出去，则说明token字符串存在，直接放行
  next();
});
export default router;
