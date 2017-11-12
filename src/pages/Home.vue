
<template>
  <div class="home">
    <!-- <div class="banner">
      <Banner></Banner>
    </div>
    <div class="news">
    	<News></News>
    </div> -->
    <div class="title">
        <img src="../assets/images/topLogo.png"/>
        <span class="search" @click="tosearch()"></span>
    </div>
    <div class="wrap" id="#wrap">
      <div>
        <div class="banner">
          <Banner></Banner>
        </div>
        <div class="news">
          <News></News>
        </div>
        <div class="container">
          <div class ="floor1 floor">
            <div class="sift_good">
              <div class="sift_title fl_title">
                  <img :src="$store.state.datas[2][0].imgPath">
              </div>
              <div class="sift_subject">
                  <img v-for="(value,index) in $store.state.datas[2]" :src="value.imgPath" :key="index" v-if="index>0">
              </div>
            </div>
          </div>
          <div class="floor2 floor"> 
            <div class="new_good">
              <div class="sift_title fl_title">
                  <img :src="$store.state.datas[7][0].imgPath">
              </div>
              <div class="floor2_subject">
                  <div class="swiper-container sub2_swiper">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <img v-for="(value,index) in $store.state.datas[7]" :src="value.imgPath" :key="index" v-if="index>0" @click="gotoDetail(value)">
                      </div>
                      
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div class = "floor3 floor ">
            <div class="f2 fl_title">
                  <img :src="$store.state.datas[10][0].imgPath">
            </div>
            <div class="sift_subject f3">
                  <img v-for="(value,index) in $store.state.datas[10]" :src="value.imgPath" :key="index" v-if="index>0">
            </div>
          </div> 
          <div class = "floor4 floor ">
            <div class="f4 fl_title">
                  <img :src="$store.state.datas[60][0].imgPath">
            </div>
            <div class="sift_subject f4">
              <div v-for="(value,index) in $store.state.datas[60]" :key="index" v-if="index>0" @click="gotoDetail(value)">
                  <img :src="value.imgPath">
                  <p v-text="value.adv_goods_name"></p>
                  <span v-html = "'<i>￥</i>'+value.adv_goods_price"></span>

              </div>
            </div>
            <div class="buttonword" style="margin-top: 0px">用心分享好东西</div>
          </div>    
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Banner from '../components/banner.vue'
import News from '../components/HomeNew.vue'


export default {
  components:{
    Banner,
    News
    
  },
  methods:{
        gotoDetail(value){
          console.log('wo')
            this.$store.getters.details(this,value);
        },
  	tosearch(){
  		this.$router.push({name:'search'})
  	}
  },
  mounted() {
   // this.banner = this.$store.state.datas;
    
    
    this.$store.commit('saveState','/home');

    var mySwiper5 = new Swiper ('.sub2_swiper', {
            direction: 'horizontal',
            freeMode:true,
            observer:true           
        })
  }
}
</script>
<style>


</style>
