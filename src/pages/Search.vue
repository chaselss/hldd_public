<template>
	<div class="search">
		<header>
			<div class="searchtop">
				<span></span  @click="$router.go(-1)">
				<input type="text" :placeholder="searchData" @keyup="onEnter($event)" v-model="sendgoods"/>
				<span v-if="isactive" @click="cleargoods()"></span>
				<div :class="[{active:isactive},cancle]" @click="getgoods()">{{topText}}</div>
			</div>
		</header>
		<section>
			<div class="searchbody">
				<div class="searchHot">
					<p>热门搜索</p>
					<div></div>
					<ul>
						<li v-for="value in hot" @click="sendHot(value)">{{value}}</li>
					</ul>
				</div>
				<div class="searchHistory">
					<p>热门搜索</p>
					<div></div>
					<ul>
						<li>大闸蟹</li>
					</ul>
					<button>清空搜索记录</button>
				</div>
			</div>
		</section>
		<div class="toHome" @click="tohome()">
			<img  src="../../static/images/backhome.png"/>
		</div>
		<footer>
		</footer>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				searchData:'',
				hot:[],
				aa:'search_box',
				bb:'hot_search_box',
				topText:'取消',
				cancle:"cancle",
				isactive:false,
				goodslist:[],
				sendgoods:''
			}
		},
		beforeCreate (){
			axios.get(`/api/index.php?c=config&a=getSearchBox&appversion=1.3.0&devicetype=weixin&phonetype=android`)
			.then((res)=>{
				this.hot=res.data.datas[this.bb].split(',');
				this.searchData=res.data.datas[this.aa]
			})
		},
		methods: {
			onEnter(e){
				if(this.sendgoods!=''){
					this.isactive=true;
					this.topText="搜索";
					if(e.keyCode==13){
						this.$router.push({name:'searchlist',params:{goods:this.sendgoods}})
					}
				}else{
					this.isactive=false;
					this.topText="取消"
				}
			},
			getgoods(){
				if(this.topText!="取消"){
					this.isload=true;
					console.log(this.sendgoods)
					this.$router.push({name:'searchlist',params:{goods:this.sendgoods}})
				}else {
					this.$router.push({name:'home'})
				}
			},
			sendHot(val){
					this.isload=true;
					this.$router.push({name:'searchlist',params:{goods:val}})
			},
			cleargoods(){
				this.sendgoods='';
				this.isactive=false;
				this.topText="取消"
			},
			tohome(){
				this.$router.push({path:'/'})
			}
		}
	}
</script>

<style lang="scss">
	@import '../styles/modules/common.scss';
	@import "../styles/yo/usage/core/reset";
	.search{
		width:100%;
		height:100%;
		background: #f5f2f0;
		@include flexbox();
		@include flex-direction(column);
		position:relation;
		header{
			height:45px;
			width:100%;
			.searchtop{
				height: 100%;
			    padding: 8px 40px 8px 15px;
			    position: relative;
			    span:nth-child(1){
			    	height: 20px;
				    width: 20px;
				    background: url(../../static/images/searchIcon.png) no-repeat;
				    background-position: center;
				    background-size: 70%;
				    position: absolute;
				    left: 20px;
				    top: 12px;
			    }
			    input{
			    	border: none;
			    	background: #fff;
				    color: #181818;
				    width: 97%;
				    height: 29px;
				    line-height: 20px;
				    padding: 4.5px 0;
				    border-radius: 4px !important;
			   		padding-left: 25px;
			    }
			    span:nth-child(3){
			    	height: 20px;
				    width: 20px;
				    background: url(../../static/images/cancel.png) no-repeat;
				    background-position: center;
				    background-size: 70%;
				    position: absolute;
				    right: 60px;
    				top: 12px;
			    }
			    .cancle{
			    	position: absolute;
			    	right: 0;
			    	top:0;
			    	color: #9e9e9e;
			    	font-size: 15px;
			    	width:50px;
			    	line-height: 45px;
			    	text-align: center;
			    }
			    .active{
					color:cornflowerblue;
				}
			}
			.searchtop::after{
				content: '';
				height:1px;
				width:100%;
				background: #d6d2cf;
				position: absolute;
				bottom: 0;
				left: 0;
			}
		}
		.toHome{
			width: 80px;
			height:80px;
			position: fixed;
		    bottom: 94px;
   			right: 20px;
   			img{
   				width: 100%;
   				height:100%;
   			}
		}
		section{
			@include flex();
			width: 100%;
			height:100%;
			background: white;
			.searchbody{
				width: 100%;
				height:3.6rem;
				.searchHot{
					width: 100%;
					padding: .1rem .1rem .1rem .15rem;
					p{
						margin: .13rem 0 .18rem;
						font-weight: bold;
						font-size: 16px;
					}
					div{
						height:1px;
						margin-top: .13rem;
						background: #d6d2cf;
					}
					ul{
						@include flexbox();
						li{
						    text-align: center;
   						 	margin: 15px 15px 0px 0;
   						 	    border-radius: 4px;
						    color: #181818;
						    font-size: 14px;
						    background: #f5f2f0;
						    padding: 8px 12px
						}
					}
				}
				.searchHistory{
					width: 100%;
					padding: .1rem .1rem .1rem .15rem;
					p{
						margin: .13rem 0 .18rem;
						font-weight: bold;
						font-size: 16px;
					}
					div{
						height:1px;
						margin-top: .13rem;
						background: #d6d2cf;
					}
					ul{
						li{
					        padding: 12px 0;
						    font-size: 14px;
						    color: #181818;
						}
					}
					button{
						border: none;
						margin: .1rem 0;
						border: 1px solid #c9a771;
    					color: #c9a771;
    					width: 100%;
    					height:46px;
    					line-height: 46px;
    					background: white;
    					border-radius: 4px;
					}
				}
			}
		}
	}
</style>