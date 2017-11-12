<template>
  <div id="bannerbox">
    <div class="swiper-container bannermain">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in $store.state.datas[0]" :key="banner.adv_id" @click="gotoDetail(banner)">
                <img :src="banner.imgPath"></img>
            </div>
        </div>
        <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
        
    </div>

  </div>
</template>
<script>
import banner1 from '../assets/images/banner1.jpg'
import banner2 from '../assets/images/banner2.jpg'

export default {
    methods:{
        gotoDetail(banner){
            this.$store.getters.details(this,banner);
        }
    },
    mounted(){
        var mySwiper = new Swiper ('.bannermain', {
            direction: 'horizontal',
            autoplay:1000,
            loop: true,
            pagination: '.swiper-pagination',
            // 如果需要分页器
            observer:true,
              
           
            
        })        

    }
    
}
</script>
<style lang="scss">

.bannermain{
    position:relative;
    height: 3.06641rem;
    .swiper-pagination{
        position:relative;
        font-size: 0;
        bottom:1.216rem;
        display:flex;
        justify-content:flex-end;
        padding-right: .07188rem;
        .swiper-pagination-bullet{
            width: 8px;
            height: 8px;
            display: inline-block;
            background: #D2D6CF;
            border-radius: 4px;
            opacity: 1;
            transition: 0.5s all;
        }
        .swiper-pagination-bullet-active{
            width: 16px;
            transition: 0.5s all;
        }  
    
    }
}

</style>
