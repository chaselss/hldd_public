<template>
  <div class="classify">
  	<shoppingList>
      <ul class="cartList" id="cartList">
        <span class="noGoods" v-show = "false">您的购物袋是空的，去逛逛吧</span>
       <!-- 购物车列表 -->
        <li v-for="(value,index) in $store.state.cartdata.cart_list" :key="index">
          <!-- 商铺名 -->
          <div class="titlebox"><h4>{{value.store_name}}</h4></div>
          <!-- 商品详细 -->
          <div class = "cartitem">
            <!-- checkbox -->
            <span class = "checkbox">
              <input type="checkbox" :id = "index" v-model="checked[index]" >
              <label :for="index" :class="{labelactive:checked[index]}" @click="checkclick(index)"><i></i></label>
            </span>
            <!-- 图片 -->
            <img :src="value.goods_image_url"/>
            <!-- 详细描述 -->
            <div class="detail_box">
              <h3>{{value.goods_full_name}}</h3>
              <p v-for="value2 in value.goods_spec" :key="value2">{{value2}}</p>
              <div class="bottom">
                <!-- 数量 -->
                <span class="quantity" v-if="!isedit"><i>×</i><i>{{value.goods_num}}</i></span>
                <span class="quantity" v-if="isedit">
                  <b @click="subtract(index,value.cart_id)">-</b>     
                  <input type="text" :value="value.goods_num"/>
                  <b @click="add(index,value.cart_id)">+</b>
                </span>
                <!-- 价钱 -->
                <span class="price"><i class="yo-ico">&#xe654;</i>{{value.goods_price}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>

    </shoppingList>
  </div>
</template>

<script>
import shoppingList from '../components/ShoppingList.vue'
import getDate from '../utils/axios.untils.js'
import Bus from '../components/Bus.js'
export default {
  data(){
    return {
      cartdata:this.$store.state.cartdata,  //购物车数据
      checked:[],
      count:{},
      isedit:'',
      sum:0,
    }
  },
  components:{
    shoppingList
  },
  watch:{
    cartdata(){
      console.log(3333)
    }
  },
  beforeCreate(){
    console.log('gouwuche')
    this.$store.dispatch('getcart')
  },
  methods:{
    checkclick(index){
      this.checked[index]=!this.checked[index];
      this.computed_sum()
    },
    subtract(index,cart_id){
      var option = {
        index,
        cart_id,
        fn:this.computed_sum,
        obj:this
      }
      this.$store.commit('subtract',option);
      
    },
    add(index,cart_id){
     // console.log(id);
      var option = {
        index,
        cart_id,
        fn:this.computed_sum,
        obj:this
        
      }
      this.$store.commit('add',option);  
      
     
    },
    computed_sum(){
      console.log('3')
      var sum = 0;
     for(var i in this.checked){
       if(this.checked[i]==true){
         sum += parseInt(this.$store.state.cartdata.cart_list[i].goods_sum);
         console.log(sum,parseInt(this.$store.state.cartdata.cart_list[i].goods_sum))
       }
     }
      this.$store.commit('sum',sum)
    
    }
    
  },
  watch:{
    cartdata(){
       console.log('刷dddd新')
    }
  },
  created(){
      console.log('刷新')
      for(var i in this.$store.state.cartdata.cart_list){
        this.checked[i]=false;  //给每个元素加个绑定的属性
        this.count[i]=1;
        console.log(this.count)
      }
      Bus.$on('isedited',(isedit)=>{
        this.isedit = isedit;
        console.log(this.isedit)
      });
      
  },
  computed:{
    setchecked(){
       for(var i in this.checked){
          this.checked[i]=true
          this.computed_sum()
        }
    },
    setcheckeda(){
      for(var i in this.checked){
          this.checked[i]=false

          this.computed_sum()
        }
    }
  },
  mounted(){
       Bus.$on('deletegoods',()=>{
        
        var cart = []
        console.log(this.checked)
        for(var i in this.checked){
          if(this.checked[i]==true){
           
           cart .push(this.$store.state.cartdata.cart_list[i].cart_id+'|'+this.$store.state.cartdata.cart_list[i].goods_num) 
           this.checked[i]=false
          }
           
        }
        console.log(cart.toString())
       
         var params = new URLSearchParams();
           
            params.append('cart_id', cart.toString());
            params.append('key', this.$store.state.key);
            params.append('appversion', '1.3.0');
            params.append('devicetype', 'weixin');
            params.append('phonetype', 'android');
            console.log(params);

            axios.post('/api/api/index.php?c=member_cart&a=cart_del',params,{
                  headers:{
                     'content-type':'application/x-www-form-urlencoded',
                     charset:'UTF-8'
                  }
              })
              .then(function (response) {
                console.log(response);
                this.$store.dispatch('getcart')
                this.computed_sum()
              }.bind(this))
      });
      Bus.$on('allselect',()=>{
        this.setchecked

      });
      Bus.$on('cancelselect',()=>{
       
        this.setcheckeda

      })

  }
  ,
  destroyed(){
    console.log('销毁删除事件')
    Bus.$off('deletegoods')
    Bus.$off('allselect')
    Bus.$off('cancelselect')
  }
   
 
}
</script>
<style>


</style>
