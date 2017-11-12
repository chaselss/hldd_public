<template>
	<div class="share">
		<ul>
			<li class="li1"><div></div><p>分享给小伙伴</p></li>
			<li class="li2">
				<ul>
					<li><img src="../../static/images/weixin_new.png" /><p>微信</p></li>
					<li @click="toweixin()"><img src="../../static/images/wxfriend_new.png" /><p>朋友圈</p></li>
					<li><img src="../../static/images/more.png" /><p>更多</p></li>
				</ul>
			</li>
			<li class="li3">取消</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		methods:{
			toweixin(){
				console.log('ok')
				wx.onMenuShareAppMessage({  
				    title: '好礼多多', // 分享标题  
				    desc: '', // 分享描述  
				    link: 'www.baidu.com', // 分享链接  
				    imgUrl: '', // 分享图标  
				    type: '', // 分享类型,music、video或link，不填默认为link  
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空  
				    success: function () {   
				        // 用户确认分享后执行的回调函数 
				        console.log("aaaaaaaaaa")
				        window.location.href("www.baidu.com")
				    },  
				    cancel: function () {   
				        // 用户取消分享后执行的回调函数  
				    }  
				});  
			}
		}
	}
</script>

<style lang="scss">
	@import "../styles/yo/usage/core/reset";
	@import "../styles/modules/common.scss";
	.share{
		position: absolute;
	    bottom: 0;
		width: 100%;
    	height: 2.5rem;
        background: rgba(250,250,250,1);
	    border: 1px solid #D6D2CF;
	    box-shadow: 00px -1px 10px rgba(0,0,0,0.16);
	    .li1{
	    	position:relative;
	    	margin:.3rem 0;
	    	height:.18rem;
	    	div{
	    		position: absolute;
	    		margin-top:.1rem;
	    		height:1px;
	    		width: 100%;
	    		background: #D6D2CF;
	    	}
	    	p{
	    		position: absolute;
	    		background: white;
	    		width: 30%;
	    		margin-left: 35%;
	    		font-weight: bold;
	    		font-size: .16rem;
	    		text-align: center;
	    		z-index: 2;
	    	}
	    }
	    .li2{
    	    width: 96%;
    		margin-left: 2%;
    		padding-bottom: .4rem;
    		ul{
    			@include flexbox();
    			li{
				    width: 33%;
				    text-align: center;
				    font-size: 16px !important;
				    color: #181818;
				    list-style: none;
				    img{
				    	height: .32rem;
    					margin-bottom: 10px;
				    }
					p{
						color: #656565;
					    font-size: 13px;
					}
    			}
    		}
	    }
	    .li3{
	    	font-size: 16px;
		    text-align: center;
		    color: #181818;
		    border-top: .1rem solid #D6D2CF;
		    padding-top: .21rem;
		    padding-bottom: .18rem;
	    }
	}
</style>