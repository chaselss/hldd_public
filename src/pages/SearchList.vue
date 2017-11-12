<template>
	<div class="searchgoods">
		<header>
			<div class="searchtop">
				<span class="back" @click="$router.go(-1)"></span>
				<span></span>
				<input type="text" :placeholder="searchData" @keyup="onEnter($event)" v-model="sendgoods"/>
				<span class="cancaleText" v-if="isactive" @click="cleargoods()"></span>
				<div :class="[{active:isactive},cancle]" @click="getgoods()">{{topText}}</div>
			</div>
		</header>
		<section>
			<ul v-if="!isload">
				<li v-for="(value,index) in goodslist" :key="index" @click="gotoDetail(value)">
					<dl>
						<dt><img :src="value.goods_image"></dt>
						<dd class="dd1">{{value.goods_name}}</dd>
						<!-- <dd class="dd2" v-for="(list,i) in value.goods_spec" :key="i">{{value.goods_spec[i]}}</dd> -->
						<dd class="dd2">{{value.goods_spec}}</dd>
						<!-- <dd class="dd3">￥{{value.goods_marketprice}}</dd> -->
						<dd class="dd3">￥{{value.goods_price}}</dd>
						<!--<dd v-for="(item,i) in value.goods_spec"></dd>-->
					</dl>
				</li>
			</ul>
			<load :isload="isload"></load>
		</section>
		<footer>
		</footer>
	</div>
</template>

<script>
	import axios from 'axios'
	import load from '../components/loading.vue'
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
				sendgoods:'',
				isload:false,
				goodsDetail:''
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
			gotoDetail(item){
				this.$store.getters.details(this,item);
			},
			onEnter(e){
				if(this.sendgoods!=''){
					this.isactive=true;
					this.topText="搜索";
				}else{
					this.isactive=false;
					this.topText="取消"
				}
				if(e.keyCode==13){
					this.isload=true;
				//	axios.get(`/api/api/index.php?c=goods&a=goods_list&keyword=${this.sendgoods}&page=10&curpage=1&appversion=1.3.0&devicetype=weixin&phonetype=android`)
					axios.post('/api/product/queryitem',{
						keyword:this.sendgoods,
						curpage:1,
						page:10
					})
					.then((res)=>{
						this.goodslist=res.data.datas.goods_list;
						this.isload=false;
					})
				}
				
			},
			getgoods(){
				if(this.topText!="取消"){
					this.isload=true;
				// axios.get(`/api/api/index.php?c=goods&a=goods_list&keyword=${this.sendgoods}&page=10&curpage=1&appversion=1.3.0&devicetype=weixin&phonetype=android`)
				// .then((res)=>{
					axios.post('/api/product/queryitem',{
						keyword:this.sendgoods,
						curpage:1,
						page:10
					}).then((res)=>{
					this.goodslist=res.data.datas.goods_list;
					this.isload=false;
				})
				}
			},
			cleargoods(){
				this.sendgoods='';
				this.isactive=false;
				this.topText="取消"
			},
			receivegoods(){
				this.isload=true;
				this.sendgoods=this.$route.params.goods;
				// axios.get(`/api/api/index.php?c=goods&a=goods_list&keyword=${this.sendgoods}&page=10&curpage=1&appversion=1.3.0&devicetype=weixin&phonetype=android`)
				// .then((res)=>{
					axios.post('/api/product/queryitem',{
						keyword:this.sendgoods,
						curpage:1,
						page:10
					}).then((res)=>{
					this.goodslist=res.data.datas.goods_list;
					console.log(this.goodslist)
					this.isload=false;
				})
			}
			
		},
		components:{
			load
		},
		mounted(){
			this.receivegoods()
		}
		
	}
</script>

<style lang="scss">
	@import '../styles/modules/common.scss';
	@import "../styles/yo/usage/core/reset";
	.searchgoods{
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
			    .back{
		    	    left: 10px;
				    position: absolute;
				    top: 13px;
				    height: 18px;
				    width: 15px;
					background:url(../../static/images/arrowLeft.png);
					background-size: 100% 100%;
				}
			    span:nth-child(2){
			    	height: 20px;
				    width: 20px;
				    background: url(../../static/images/searchIcon.png) no-repeat;
				    background-position: center;
				    background-size: 70%;
				    position: absolute;
				    left: 40px;
				    top: 12px;
			    }
			    input{
			    	border: none;
			    	background: #fff;
				    color: #181818;
				    height: 29px;
				    line-height: 20px;
				    padding: 4.5px 0;
				    border-radius: 4px !important;
				    width:2.7rem;
				    margin-left:20px;
				    padding-left:25px;
			    }
			    span:nth-child(4){
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
		section{
			@include flex();
			width: 100%;
			height:100%;
			background: white;
			ul{
				@include flexbox();
				@include flex-wrap(wrap);
				width: 100%;
				height:100%;
				padding:0 .1rem;
				overflow-y:scroll;
				li{
					width:50%;
					padding:.05rem;
					dl{
						padding:.15rem;
						dt{
							width:100%;
							// height: 1.3rem;
							img{
								width:1.3rem;
							}
						}
						.dd1{
							height: 42px;
						    padding-top: 4px;
						    line-height: 19px;
						    font-size: 12px;
						    @include ellipsis(100%,2)
						}
						.dd2{
						    color: #989898;
						    line-height: 15px;
						    font-size: 12px;
						}
						.dd3{
							font-family: impact;
						    font-size: 16px;
						    color: #414141;
						}
					}
				}
			}
		}
	}
</style>