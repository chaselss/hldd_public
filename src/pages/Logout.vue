<template>
	<div class="logout">
		<header>
			<ul>
				<li class="liTitle">账户绑定</li>
				<li class="li2"><span>手机号</span><span class="span2">187****570</span><img src="../../static/images/arrowLeft.png"/></li>
				<li>微信<span class="span3">去绑定</span></li>
			</ul>
		</header>
		<section>
			<ul>
				<li class="liTitle">账户安全</li>
				<li class="li2"><span>登录密码</span><span class="span2">修改</span><img src="../../static/images/arrowLeft.png"/></li>
				<li class="li2"><span>支付密码</span><span class="span2">去设置</span><img src="../../static/images/arrowLeft.png"/></li>
			</ul>
		</section>
		<footer>
			<ul>
				<li class="liTitle">其他设置</li>
				<li class="li2"><span>下载APP</span><span class="span2"></span><img src="../../static/images/arrowLeft.png"/></li>
				<li class="li2"><span>关于我们</span><span class="span2">V1.0.0</span><img src="../../static/images/arrowLeft.png"/></li>
			</ul>
			<button @click="clearLog()">退出登录</button>
		</footer>
	</div>
</template>

<script>
	export default {
		methods:{
			clearLog(){
				localStorage.setItem("HLDD_KEY",'')
          		localStorage.setItem("HLDD_ID",'')
          		localStorage.setItem("HLDD_PH",'')
          		localStorage.setItem("HLDD_NAME",'')
          		localStorage.setItem("HLDD_OK",false)
          		this.$router.push({path:'/mine'})
			}
		}
	}
</script>

<style lang="scss">
	@import "../styles/yo/usage/core/reset";
	@import "../styles/modules/common.scss";
		.logout{
			background: #F0F0F0;
			width:100%;
			height:100%;
			@include flexbox();
			@include flex-direction(column);
			ul{
				margin-left: .15rem;
				width:100%;
				li{
					width:100%;
					height:.45rem;
					line-height: .45rem;
					position: relative;
				}
				li::before{
					position: absolute;
				    content: "";
				    height: 1px;
				    left: 0;
				    bottom: 0;
				    right: 0;
				    background: #f1f1f1;
				}
				.liTitle{
					width:100%;
					height:.5rem;
					color: #454545;
					line-height: .5rem;
					font-weight: bold;
				}
				.li2{
					span{
						display: inline-block;
						line-height:.45rem;
					}
					.span2{
						position: absolute;
						right:.45rem;
					}
					img{
						position: absolute;
						right:.25rem;
						top:.14rem;
						margin-left: .1rem;
						transform: rotate(180deg);
						height:.14rem;
					}
				}
				.span3{
					position: absolute;
					right:.4rem;
					width: 1rem;
					height:100%;
					text-align: right;
				}
			}
			header{
				background: white;
				margin-bottom: .1rem;
			}
			section{
				background: white;
				margin-bottom: .1rem;
			}
			footer{
				@include flex();
				width: 100%;
				height: 100%;
				background: white;
				position: relative;
				button{
					position: absolute;
					width:90%;
					margin:0 5%;
					background: white;
					color: $base-color;
					border: 1px solid $base-color;
					height:.45rem;
					line-height:.45rem;
					border-radius: .05rem;
					bottom: 10%;
				}
			}
		}
</style>