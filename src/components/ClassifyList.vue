<template>
	<div class="classifyBody">
		<header>
    		<div class="title">
    			<div class="searchbox"  @click="tosearch()">
    				<span class="search"></span>
    			</div>
    			<span :class="[{sortm:issort},{sort:show},{sortact:!issort}]" @click="pulldown()">{{type}}</span>
		    </div>
		    
    	</header>
    	<section>
    		<goods-nav></goods-nav>
    		<div class="goods" v-if="!isload">
    			<div class="list page-loadmore-wrapper"  ref="wrapper">
    				<mt-loadmore @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul>
							<li v-for="(list,i) in goodslist" :key="i"  @click="gotoDetail(list)">
								<dl>
									<!-- <dt><img :src="list.goods_image_url"></dt> -->
									<dt><img :src="list.goods_image"></dt>
									<dd class="dd1">{{list.goods_name}}</dd>
									<dd class="dd2" ><span v-for="(pri,index) in list.goods_spec" :key="index" v-if="index>0">{{pri}}</span></dd>
									<dd class="dd3">￥{{list.goods_price}}</dd>
								</dl>
							</li>
						</ul>
    				</mt-loadmore>
    			</div>
    		</div>
    		<div v-if="!issort" class="pull">
		    	<ul>
		    		<li :class="{isActive:act==0}" @click="composite()">综合排序</li>
		    		<li :class="{isActive:act==1}" @click="toNew()">新品优先</li>
		    		<li :class="{isActive:act==2}" @click="sales('goods_salenum')">销量</li>
		    		<li :class="{isActive:act==3}" @click="toLower('goods_price')">价格从高到低</li>
		    		<li :class="{isActive:act==4}" @click="toUpper('goods_price')">价格从低到高</li>
		    	</ul>
		    </div>
    		<loading :isload="isload"></loading>
    	</section>
	</div>
</template>

<script>
	import Vue from 'vue'
	import goodsNav from "./goodsNav.vue"
	import loading from "./loading.vue"
	
	import axiosUtil from '../utils/axios.hbk'
	import { Loadmore, Spinner } from 'mint-ui'
	import Bus from './Bus.js'
	Vue.component(Loadmore.name, Loadmore);
	Vue.component(Spinner.name, Spinner);
	export default {
		data() {
			return {
				goodslist:[],
				curpage:1,
				allLoaded: false,
				bottomStatus: '',
			    wrapperHeight: 0,
			    topStatus: '',
			      //wrapperHeight: 0,
			    translate: 0,
			    moveTranslate: 0,
			    isload:true,
			    issort:true,
			    show:true,
			    act:0,
			    type:'综合排序'
			}
		},
		components: {
			goodsNav,
			loading
		},
		methods: {
			changegoods(res) {
		    	this.goodslist=this.goodslist.concat(res.data.datas.goods_list);
		    	this.isload=false
		    	console.log(this.goodslist)
			},
			/*changelist(goodsid){
				console.log(goodsid)
				axiosUtil(this, `/api/api/index.php?c=goods&a=goods_list&gc_id=${goodsid}&page=10&curpage=1&appversion=1.3.0&devicetype=weixin&phonetype=android`,'refresh')
			},*/
			loadTop() {
				this.curpage++;
				axiosUtil(this, `/api/product/queryitem`,'changegoods',{page:10,curpage:this.curpage})
				//this.$refs.loadmore.onTopLoaded()
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
		    },
			loadBottom() {
				this.curpage++;
				axiosUtil(this, `/api/product/queryitem`,'changegoods',{page:10,curpage:this.curpage})
				//this.$refs.loadmore.onBottomLoaded()
			},
			handleTopChange(status) {
				this.moveTranslate = 1;
     			this.topStatus = status;
		   },
		   translateChange(translate) {
		      const translateNum = +translate;
		      this.translate = translateNum.toFixed(2);
		      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
		   },
		   tosearch(){
		  		this.$router.push({name:'search'})
		  	},
		  	pulldown(){
		  		if(this.issort){
		  			this.issort=false;
		  		}else{
		  			this.issort=true;
		  		}
		  	},
		  	composite(b){
				this.act=0;
				this.type='综合排序'
				this.tosort(b);
			},
			toNew(b){
				this.act=1;
				this.type='新品优先'
				this.tosort(b);
			},
			sales(b){
				this.act=2;
				this.type='销量优先'
				this.tosort(b);
			},
			toLower(b){
				this.act=3;
				this.type='价格降序'
				this.issort=true;
				var ele = this.goodslist;
				for(var i =0;i<ele.length;i++){
					for(var j=0;j<ele.length-i-1;j++){
						if(parseInt( ele[j][b] ) > parseInt(ele[j+1][b])){
							var swap = ele[j];
							ele[j] = ele[j+1];
							ele[j+1] = swap
						}
					}
				}
				this.goodslist=ele.reverse();
			},
			toUpper(b){
				this.act=4;
				this.type='价格升序'
				this.tosort(b);
			},
			tosort(arr){
				this.issort=true;
				var ele = this.goodslist;
				for(var i =0;i<ele.length;i++){
					for(var j=0;j<ele.length-i-1;j++){
						if(parseInt( ele[j][arr] ) > parseInt(ele[j+1][arr])){
							var swap = ele[j];
							ele[j] = ele[j+1];
							ele[j+1] = swap
						}
					}
				}
				this.goodslist=ele;
			},
			 gotoDetail(item){
				this.$store.getters.details(this,item);
			}
		},
		mounted() {
			Bus.$on('on-msg', (data)=>{
		      this.goodslist=data;
		      this.isload=false;
		    })
			Bus.$on('child-say', (data)=>{
		      this.isload=data;
		    })
			//axiosUtil(this, `/api/api/index.php?c=goods&a=goods_list&gc_id=2139&page=10&curpage=1&appversion=1.3.0&devicetype=weixin&phonetype=android`,'changegoods');
			axiosUtil(this, `/api/product/queryitem`,'changegoods',{page:10,curpage:this.curpage});
	       var mySwiper = new Swiper ('.swiper-container2', {
	       	freeMode : false,
	        observer:true,
	        //scrollbar:'.swiper-scrollbar',
	        //scrollbarHide:false,
	        width:80
		   })
      }
	};
</script>


<style lang="css">
.loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
}
.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}

.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
    border-bottom: 1px solid #eee
}

.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
}

.page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
}

.page-loadmore-wrapper {
    overflow: scroll
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}



</style>
