<template>
  <div class="mine">
    <div class="minetop">
      <div class="mineheader">
        <img src="../../static/images/headpic.png" class="img1"/>
	      <img src="../../static/images/logout.png" class="img2" v-if="isOK"  @click="toRegister"/>
	      <div class="islogin" v-if="!isOK">
	      	<p>{{username}}</p>
	      	<img src="../../static/images/level0.png"/>
	      </div>
	       <div class="msg">
	      	<img src="../../static/images/message.png"  class="img3"/>
	       </div>
      </div>
      <p>会员尊享<span v-if="!isOK">再积9955贡献值可以升级<img src="../../static/images/arrowLeft.png"/></span></p>
    </div>
    <div class="money">
    	<div class="wallet">
    		<img src="../../static/images/icon.png" />
    		<span>钱包</span>
    	</div>
    	<ul>
    		<li>
    			<p>余额</p>
    			<p>0</p>
    		</li>
    		<li>
    			<p>礼金</p>
    			<p>0</p>
    		</li>
    		<li>
    			<p>礼券</p>
    			<p>0</p>
    		</li>
    	</ul>
    </div>
    <div class="order">
    	<div class="ordertop">
    		<span>我的订单</span>
    		<i class="yo-ico">&#xe60c;</i>
    	</div>
    </div>
	<div class="state">
		<ul>
			<li>
				<img src="../../static/images/willpay.png" />
				<p>待付款</p>
			</li>
			<li>
				<img src="../../static/images/willpost.png" />
				<p>待发货</p>
			</li>
			<li>
				<img src="../../static/images/willreceive.png" />
				<p>待收货</p>
			</li>
			<li>
				<img src="../../static/images/refound.png" />
				<p>退货单</p>
			</li>
			
		</ul>
	</div>
  <div class="gift">
  	<div class="gifttop">
  		<span>我的礼物</span>
  		<div></div>
  	</div>
  	<div class="giftbottom">
  		<div class="giftleft">
  			<img src="../../static/images/send_gift.png"/>
  			<span>送出的礼物</span>
  		</div>
  		<div class="giftright">
  			<img src="../../static/images/my_gift.png"/>
  			<span>收到的礼物</span>
  		</div>
  	</div>
  </div>
  <div class="order">
    	<div class="ordertop">
    		<span>我的拼团</span>
    		<i class="yo-ico">&#xe60c;</i>
    	</div>
    </div>
    <div class="order">
    	<div class="ordertop">
    		<span>联系客服</span>
    		<i class="yo-ico">&#xe60c;</i>
    	</div>
    </div>
    <div class="order">
    	<div class="ordertop">
    		<span>下载APP</span>
    		<i class="yo-ico">&#xe60c;</i>
    	</div>
    </div>
    <div class="order">
    	<div class="ordertop" @click="toLogout()">
    		<span>设置</span>
    		<i class="yo-ico">&#xe60c;</i>
    	</div>
    </div>
  </div>
</template>
<script>
  export default {
  	data(){
  		return {
  			isOK:true,
  			username:''
  			
  		}
  	},
  	methods:{
  		toRegister(){
  			this.$router.push({name:'register'})
  		},
  		toLogout(){
  			this.$router.push({name:'logout'})
  		}
  	},
    mounted(){
    	this.$store.commit('saveState','/mine');
    	if(localStorage.getItem("HLDD_OK")=="true"){
    		this.isOK=false
    		this.username=localStorage.getItem("HLDD_NAME");
    	}
    }
  }
</script>
