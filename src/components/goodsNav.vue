<template>
	<div class="listbar">
		<div class="swiper-container2">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in barlist" :key="index"  @click="changelist(item.gc_id)">
						{{item.gc_name}}
				</div>
			</div>
			<!--是否显示bar<div class="swiper-scrollbar"></div>-->
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axiosUtil from '../utils/axios.hbk'
	import Bus from './Bus.js'
export default {
  data() {
    return {
      barlist:[]
    }
  },
  methods: {
    changedata(res) {
    	this.barlist=res.data.datas.class_list
	},
	refresh(res){
		Bus.$emit('on-msg', res.data.datas.goods_list)
	},
	changelist(goodsid){
		Bus.$emit('child-say',true);
		axiosUtil(this, `/api/api/index.php?c=goods&a=goods_list&gc_id=${goodsid}&page=10&curpage=1&appversion=1.3.0&devicetype=weixin&phonetype=android`,'refresh')
	}
  },
  mounted() {
		axiosUtil(this, `/api/api/index.php?c=goods_class&a=index&appversion=1.3.0&devicetype=weixin&phonetype=android`,'changedata');
  },
  /*var mySwiper = new Swiper ('.swiper-container2', {
       	freeMode : false,
        observer:true,
        //scrollbar:'.swiper-scrollbar',
        //scrollbarHide:false,
        width:80
	   })*/
}
</script>

<style lang="scss">
@import "../styles/yo/usage/core/reset";
@import "../styles/modules/common";
	.listbar{
        height:.5rem;
        width: 100%;
        z-index:10 !important;
        .swiper-container2{
            position: relative;
            height:.5rem;
            width: 100%;
            .swiper-wrapper{
                width: 100%;
                height:.4rem;
                margin-top: .1rem;
                width: 7.2rem;
                .swiper-slide{
                    white-space: nowrap;
                    width: .8rem !important;
                    height:100%;
                    color: #656565;
                    font-size: .14rem;
                    line-height: .4rem;
                    text-align: center;
                }
                .active{
                    color:$base-color;
                }
            }
            .swiper-scrollbar{
                position: absolute;
                bottom:0;
            }
        }
    }
</style>