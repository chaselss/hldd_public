<template>
	<div class="detail5">
		<header>
			<span @click="$router.go(-1)"></span>
			<h2>返利专区</h2>
			<span @click="toshare()"></span>
		</header>
	  <section>
	  	<img :src="data0.imgUrl"></img>
	  	<div v-for="(item,index) in detaillist" v-if="index>0" class="goods">
	  		<img :src="item.imgUrl"/>
	  	</div>
	  </section>
  <div>{{ad_url}}</div>
  <share v-if="isshare"></share>
</div>
  
</template>
<script>
import axios from 'axios'
import share from '../components/share.vue'
  export default {
    data(){
      return {
        ad_url:this.$route.query.ad,
        detaillist:[],
        data0:'',
        isshare:false
      }
    },
    beforeCreate(){
    	axios.get(`/api/api/index.php?c=act&a=getActList&act_id=4%3F_tok`).then((res)=>{
    		this.detaillist=res.data.datas.list;
    	})
    },
    watch:{
    	detaillist(res){
    		this.data0=res[0];
    	}
    },
    methods:{
	  toshare(){
		  	if(this.isshare){
		  		this.isshare=false
		  	}else{
		  		this.isshare=true
		  	}
		  }
    },
    computed: {
    },
    components:{
    	share
    }
    
  
}
</script>
<style lang="scss">
	@import '../styles/modules/common.scss';
	@import "../styles/yo/usage/core/reset";
  .detail5{
  	width: 100%;
  	height:100%;
  	@include flexbox();
  	@include flex-direction(column);
  	header{
  		height:45px;
  		width:100%;
  		position:relative;
  		span:nth-child(1){
  			position:absolute;
  			display:inline-block;
  			height:35px;
  			width:35px;
  			left:3px;
  			top:5px;
  			background:url(../../static/images/arrowLeft.png) no-repeat;
  			background-size:50% 50%;
    		background-position: center;
  		}
  		h2{
  			height: 45px;
		    font-weight: normal;
		    padding: 0;
		    font-size: 18px;
		    font-weight: bold;
		    line-height: 48px;
		    text-align: center;
		    color: #181818;
  		}
  		span:nth-child(3){
  			display:inline-block;
		    position: absolute;
		    right: 5px;
		    top: 0;
		    width: 45px;
		    height: 45px;
  			background:url(../../static/images/share.png) no-repeat;
  			background-size:50% 50%;
  			background-size: 24px 24px;
		    background-repeat: no-repeat;
		    background-position: center center;
  		}
  	}
  	header:after{
  		content: "";
	    height: 1px;
	    background: #d6d2cf;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
  	}
  	section{
  		@include flex();
  		overflow-y:scroll;
  		width:100%;
  		height:100%;
  		img{
  			width:100%;
  		}
  		.goods{
  			display: inline-block;
  			width: 50%;
  			img{
  				width: 100%;
  			}
  		}
  	}
  }
</style>
