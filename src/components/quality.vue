<template>
	<div class="main">
		
		<ul>
			<li v-for="(item,i) in this.$store.state.quality.content" v-if="item['style']==1"
data-video="item.video_url" class="longpic" :key="i">
				<img :src="item.imgUrl" @click="getsrc(item.video_url)"/>
				<div>
				{{item.title}}
				</div>
			</li>
			<li v-else class="singlepic" >
				<div>
					<p>{{item.title}}</p>
					<p>{{item.subtitle}}</p>
				</div>
				<img :src="item.imgUrl" @click="getsrc(item.video_url)">
			</li>
		</ul>
		<video-play :srcdata="videosrc" :isShow="isshow" v-on:child-say="changeShow"></video-play>
	</div>
</template>
<script>
	import videoPlay from "./video.vue"
	
export default {
	data(){
		return {
			videosrc:'',
			isshow:false,
		}	
	},
	methods:{
		getsrc(srcs){
			if(srcs!=null){
				this.videosrc=srcs;
				this.isshow=true;
			}
		},
		changeShow(){
			this.isshow=false
		},
		
	
	},
	computed:{
	},
	mounted(){
		
	},
	components:{
		videoPlay
	}
}
</script>