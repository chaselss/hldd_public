<template>
	<div class="shopbag">
		<header>
    		<div class="title">
    			<p>购物袋</p>
				<span @click="editer()" v-if="!isediter">编辑</span>
				<span @click="editer('finish')" v-if="isediter">完成</span>
		    </div>
    	</header>
    	<section>
			<slot></slot>
			
			<span class="selectTitle">为您甄选</span>
			<ul id="shoplistbox">
				<li v-for="(value,index) in $store.state.shopbag" :key="index">
					<div>
						<img  :src="value.imgPath"></img>
						<span class="title" v-text="value.adv_goods_name"></span>
						<span class="descript" v-for="(values,index) in value.goods_spec" :key="index" v-text="values"></span>
						<span class="price" v-text="value.adv_goods_price"></span>
					</div>
				</li>
			</ul>
			
    	</section>
		<div class ="bottom_button">
			<!-- 全选 -->
			<div class="left">
				 <span class = "checkbox">
					<input type="checkbox" id = "all">
					<label for="all" :class="{labelactive:checked}" @click="allclick()" ><i></i></label>
				</span>
			</div>
			<span>全选</span>
			<span>合计 :</span>
			<span><i class="yo-ico">&#xe654;</i><i>{{$store.state.sumprice}}</i>元</span>
			<div class="right" v-if="!isediter">
				<button>微信送礼</button>
				<button class="buybutton">自己购买</button>	
			</div>
			<div class="right" v-if="isediter">
				<button @click="deletegoods">删除</button>	
			</div>
		</div>
	</div>
</template>

<script>
import getDate from '../utils/axios.untils.js'
import Bus from './Bus.js'
export default {
	data(){
		return {
			checked:false,
			isediter:false,
			sum:''
			
		}
	},
	created(){
		Bus.$on('sum',(sum)=>{
			console.log(sum)
        this.sum = sum
      })
	},
  	mounted(){
        this.$store.commit('saveState','/shoppingbag');
	
	},
	methods:{
		editer(){
			this.isediter=!this.isediter;
			Bus.$emit('isedited',this.isediter);
			if(arguments[0]=='finish'){
				this.$store.dispatch('getcart')
			}
		},
		deletegoods(){
			console.log('0000000000000000000000000000')
			Bus.$emit('deletegoods')
		},
		allclick(){
			this.checked=!this.checked
			if(this.checked){
				Bus.$emit('allselect')

			}else{
				Bus.$emit('cancelselect')
			}
		},
		
	}
}
</script>
<style lang=scss>
@import '../styles/app.scss';
	.shopbag{
        @include flexbox();
        @include flex-direction(column);
        width: 100%;
		height:100%;
		position: relative;
        header{
            height:45px;
			width: 100%;
			background: #fff;
			position: relative;
            .title{
				@include border(0 0 1px 0,#eeeeee);	
                p{
                    font-size: 18px;
                    font-weight: bold;
                    line-height: 48px;
                    text-align: center;
                    color: #181818;
				}
				span{
					position: absolute;
					z-index: 900;
					top:0;
					right:15px;
					display: inline-block;
					height:100%;
					line-height: 50px;
					color: #BC914D;

				}
				
            }
        }
		section{
			width:100%;
            @include flex();
			background: #f3f3f3;
			padding-bottom: 50px;
			position: absolute;
			top:45px;
			bottom:50px;
			overflow-y: scroll;
			#cartList{
				width: 100%;
				background:#fff;
				text-align: center;
				line-height: 100%;
				.noGoods {
					height: 103px;
					line-height: 103px;
					text-align: center;
					font-size: 14px;
					color: #181818;
				}

			}
			.selectTitle {
				font-size: 18px;
				text-align: center;
				font-weight: bold;
				line-height: 50px;
				display: inline-block;
				height: .5rem;
				width:100%;
			}
			#shoplistbox{
				display: flex;
				flex-wrap: wrap;
				margin: 0 10px;
				li{
					width: 50%;
					padding: 1%;
					
					div{
						width: 100%;
						padding: .15rem;
						background: #fff;
						box-shadow: 0px 1px 1px 1px rgba(0,0,0,0.03);
						display: flex;
						flex-direction: column;
						img{
							display: block;
							
							width:100%;
							
						}
						span{
							font-size: 12px;
							&.title{
								color:#181818;
								@include ellipsis(100%, 2)
							}
							&.descript{
								color:#7a7a7a;
								
								line-height: 12px;
							}
							&.price{
								font-size: 16px;
								color: #414141;
								font-weight: 600;
							}
						}
					}

				}
			}
		}
		.bottom_button{
			height:50px;
			position: absolute;
			bottom:0;
			width:100%;
			line-height: 50px;
			vertical-align: middle;
			.checkbox{
				width: 42px;
				height: 42px;
				float: left;
				line-height: 50px;
				text-align: center;
				input{
					display: none;
				}
				label{
					display: inline-block;
					height: 20px;
					width: 20px;
					position: relative;
					@include border(1px,#ccc,solid,50%);
					cursor: pointer;
				}
				.labelactive{
					i{
						
						width:70%;
						height: 70%;
						position: absolute;
						left:15%;
						top:15%;
						background: $base-color;
						border-radius: 50%;
					}

				}
			}
			span{
				margin-right: 5px;
			}
			.right{
				float: right;
				button{
					height: 100%;
					width:75px;
					float:left;
					border:0;
					color:#fff;
					text-align: center;
					line-height: 50px;
					font-size: 14px;
					background: #181818;
				}
				.buybutton{
				    background: #BC914D;
					
				}
				
			}
		}
	}
</style>