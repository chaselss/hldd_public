import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import Home from '../pages/Home.vue'
import Classify from '../pages/Classify.vue'
import Quality from '../pages/Quality.vue'
import ShoppingBag from '../pages/ShoppingBag.vue'
import Mine from '../pages/Mine.vue'
import Detail5 from '../pages/Detail5.vue'
import Detail1 from '../pages/Detail1.vue'
import Search from '../pages/Search.vue'
import SearchList from '../pages/SearchList.vue'
import Logout from '../pages/Logout.vue'

import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
Vue.use(Router)

console.log();
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          name:'home'
        },
        {
          path: '/classify',
          component: Classify
        },
        {
          path: '/quality',
          component: Quality
        },
        {
          path: '/shoppingbag',
          component: ShoppingBag,
          name:'ShoppingBag'
        },
        {
          path: '/mine',
          component: Mine,
          name:'mine'
        },
        
        
      ] 
    },
    {
      path:'/detail1',
      component:Detail1,
      name:'detail1'
    },
	 {
      path:'/detail5',
      component:Detail5,
      name:'detail5'
    },
    {
    	path:'/register',
    	component:Register,
    	name:'register'
    },
    {
    	path:'/login',
    	component:Login,
    	name:'login'
    },
    {
    	path:'/search',
    	component:Search,
    	name:'search'
    },
    {
    	path:'/searchlist',
    	component:SearchList,
    	name:'searchlist'
    },
    {
    	path:'/logout',
    	component:Logout,
    	name:'logout'
    },
   
  ]
})
