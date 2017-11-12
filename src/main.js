Vue.config.productionTip = false

import Vue from 'vue'

import axios from 'axios'

import VueRouter from 'vue-router'

import 'mint-ui/lib/style.css'

import "@/styles/app.scss"

import router from './router/'

import store from './vuex/store'

import {Spinner} from 'mint-ui'


import getDate from './utils/axios.untils.js'

// import iscroll from  'iscroll'
// Vue.component(Spinner.name,Spinner)

 window.axios = axios;

new Vue({
    
     router,
     store,//使用store
     beforeCreate(){     //页面初始化之前进行一下ajax请求
         
         const option ={
             url:'/api/api/index.php?c=adv_list_new&a=list&ap_id=1051&appversion=1.3.0&devicetype=weixin&phonetype=android',
             name:'datas',
             obj:this,
             fn:'sethome1'
         }
         getDate(option);
         var options={
            url:'/api/api/index.php?c=adv_list_new&a=list&ap_id=1060&appversion=1.3.0&devicetype=weixin&phonetype=android',
            name:'shopbag',
            obj:this,
            fn:'setshopbag'
          }
          getDate(options)
     },
     created(){
        this.$store.dispatch('getcart')
     }
 }).$mount("#app")

