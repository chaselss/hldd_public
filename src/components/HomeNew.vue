<template>
	<div class="newsouter">
		<div class="newsbody">
			<img src="../../static/images/news.png" class="newsbc">
			<div class="bod"></div>
			<div class="swiper-container1">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in newlist" :key="index">
						<p class="p1">{{item.title}}</p>
						<p class="p2">{{item.subtitle}}</p>
					</div>
				</div>
			</div>
			<img src="../../static/images/pointright.png" class="pointeright">
		</div>
		<div class="slidepart">
			<div class="swiper-container2">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(value,index) in $store.state.datas[1]" :key="index">
						<img :src="value.imgPath" />
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axiosUtil from '../utils/axios.hbk'
	export default {
		data() {
			return {
				newlist:[]
			}
		},
		methods: {
		    changedata(res) {
		    	this.newlist=res.data.data
		    }
		},
		mounted() {
		axiosUtil(this, `/api/hldd_news/index.php/app/index/homeSlider?appversion=1.3.0&devicetype=weixin&phonetype=android`,'changedata')
       var mySwiper = new Swiper ('.swiper-container1', {
	        direction: 'vertical',
	        autoplay:2000,
	        loop: true,
	        observer:true
	   });
	   var mySwiper = new Swiper ('.swiper-container2', {
       	freeMode : false,
        observer:true,
        //scrollbar:'.swiper-scrollbar',
        //scrollbarHide:false,
        width:62
	   })
       }
	};
</script>