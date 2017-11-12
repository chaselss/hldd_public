import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
Vue.use(Vuex)
import quality from './modules/quality'
import login from './modules/login'
const store = new Vuex.Store({
    state:{
        datas:{
			
        },
        state:'/home', 
        shopbag:{
            id:1
        },
        detail1:{},
        key:'9288c04e325ecc68d61a85f23a5bb4f3',
        cartdata:'',
        sumprice:0,
        nickname:'',
        
    },
    getters:{
        details(){
            return (obj,banner)=>{
               // console.log(banner.adv_url);
               // if (banner.adv_style==1) {
                //console.log(banner.adv_url);
                if (banner.adv_style==1) {
                    switch(banner.adv_type){
                        case "0" : console.log(0);obj.$router.push({name:'detail1',query:{ad:banner.adv_rel}});obj.$store.dispatch('getdetail1',banner.adv_rel); break; 
                        case "5" : console.log(5); obj.$router.push({name:'detail5',query:{ad:banner.adv_rel}}); break;
                        case "9" : console.log(9);obj.$router.push({name:'detail5',query:{ad:banner.adv_rel}}); break;
                        case "13" : console.log(0);obj.$router.push({name:'detail1',query:{ad:banner.adv_rel}});obj.$store.dispatch('getdetail1',banner.adv_rel); break; 
                    }
                }    
                 else {
                    obj.$router.push({name:'detail1',query:{ad:banner.goods_id}});obj.$store.dispatch('getdetail1',banner.goods_id);  
                }
            }
            
        }  
    },
    actions:{
        getdetail1({commit},adv_rel){
            axios.get(`/api/api/index.php?c=goods&a=goods_detail&goods_id=${adv_rel}&key=null&appversion=1.3.0&devicetype=weixin&phonetype=android`)
            .then(function(response){
            //console.log(response.data.datas)
            commit('setdetail1',response.data.datas)
        
            })
        },
        addcart(store,options){
            console.log('jjjj')
           
           
            var params = new URLSearchParams();
           
            params.append('goods_id', options.goods_id);
            params.append('key', store.state.key);
            params.append('quantity', options.quantity);
            params.append('appversion', '1.3.0');
            params.append('devicetype', 'weixin');
            params.append('phonetype', 'android');
            console.log(params);

            axios.post('/api/api/index.php?c=member_cart&a=cart_add',params,{
                  headers:{
                     'content-type':'application/x-www-form-urlencoded',
                     charset:'UTF-8'
                  }
              })
              .then(function (response) {
                console.log(response);
              })
            
        },
        getcart(store,option){
            axios.get(`api/api/index.php?c=member_cart&a=cart_list&key=${store.state.key}&appversion=1.3.0&devicetype=weixin&phonetype=android`)
            .then(function(response){
            //请求购物车数据
            store.commit('setcartdata',response.data.datas)
            })
        }
    },
    mutations:{
        //主页面banner信息
        sethome1(state,playload){
            state[playload.name] = playload.response.data.datas.list
        },
        saveState(state,playload){           
            state.state = playload
        },
        setshopbag(state,playload){
            //console.log(playload.response.data.datas.list['1']);
            state[playload.name] = playload.response.data.datas.list['1']
        },
        setdetail1(state,data){
            state.detail1=data;
        },
        setcartdata(state,data){
            state.cartdata = data;
            console.log(data)
        },
        subtract(state,option){
            state.cartdata.cart_list[option.index].goods_num--;
            
            var params = new URLSearchParams();
            
             params.append('key', state.key);
             params.append('cart_id', option.cart_id);
             params.append('quantity',  state.cartdata.cart_list[option.index].goods_num);
             params.append('appversion', '1.3.0');
             params.append('devicetype', 'weixin');
             params.append('phonetype', 'android');
             console.log(params);
 
             axios.post('/api/api/index.php?c=member_cart&a=cart_edit_quantity',params,{
                   
               })
               .then(function (response) {
                    console.log(2)
                   state.cartdata.cart_list[option.index].goods_sum=parseInt(response.data.datas.total_price);
                   
                   option.fn();
               })
        },
        add(state,option){
           
            state.cartdata.cart_list[option.index].goods_num++;
            var params = new URLSearchParams();
            console.log(state.key,option.cart_id,state.cartdata.cart_list[option.index].goods_num)
             params.append('key', state.key);
             params.append('cart_id', option.cart_id);
             params.append('quantity',  state.cartdata.cart_list[option.index].goods_num);
             params.append('appversion', '1.3.0');
             params.append('devicetype', 'weixin');
             params.append('phonetype', 'android');
             console.log(params);
 
             axios.post('/api/api/index.php?c=member_cart&a=cart_edit_quantity',params,{
                   
               })
               .then(function (response) {
                state.cartdata.cart_list[option.index].goods_sum=parseInt(response.data.datas.total_price);
                option.fn();
                 console.log(state.cartdata.cart_list[option.index].goods_sum);
               })

        },
        sum(state,sum){
            console.log('sum')
            state.sumprice = sum ;
            console.log(state.sumprice)
        },
        loginkey(state,loginkey){
            state.key=loginkey
        }

    },
     modules: {
	   quality,
	   login,
	}
   
})

export default store