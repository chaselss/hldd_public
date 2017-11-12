<template>
	<div class="main">
		
		<ul>
			<li v-for="(item,i) in this.$store.state.quality.content" v-if="item['style']==1"
data-video="item.video_url" class="longpic" :key="i">
				<img :src="'http://localhost:3000/backend/upload/'+item.imgUrl" @click="getsrc(item.video_url)"/>
				<div>
				{{item.title}}
				</div>
			</li>
			<li v-else class="singlepic" >
				<div>
					<p>{{item.title}}</p>
					<p>{{item.subtitle}}</p>
				</div>
				<img :src="'http://localhost:3000/backend/upload/'+item.imgUrl" @click="getsrc(item.video_url)">
			</li>
		</ul>
		<video-play :srcdata="videosrc" :isShow="isshow" v-on:child-say="changeShow"></video-play>
	</div>
</template>
<script>
import Vue from 'vue'

  import videoPlay from "./video.vue"
  import VueSocketio from 'vue-socket.io'
  Vue.use(VueSocketio,'http://localhost:3000')


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
   /*  socket() {
       var socket = io.connect('http://localhost:3000');
      socket.on('connect',function () {
        socket.on('news',function(data){
          console.log(data)
          console.log(this.$store.state.quality.content)
          //this.$store.state.quality.content.push(data.getAddList)
        })
      }) 
    } */
	},
	computed:{
	},
	mounted(){
    console.log(this.$store.state.quality.content)
    //this.socket()
  },
	components:{
		videoPlay
  },
  sockets : {
    connect () {

    },
    news(data) {
          this.$store.state.quality.content.push(data.getAddList)
          //console.log(data)
    }
  }
}
</script>