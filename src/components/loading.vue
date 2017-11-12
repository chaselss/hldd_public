<template>
	<div class="loading" v-if="isload">
		<img src="../../static/images/fresh.png" :class="[{isrotate:isload}]"/>
		<p>正在加载，请稍后...</p>
	</div>
</template>

<script>
	export default {
		props:['isload']
	}
</script>

<style lang="scss">
	@import '../styles/modules/common.scss';
	@import "../styles/yo/usage/core/reset";
	.loading{
        @include flex();
        width:100%;
        height:100%;
        @include flexbox();
        @include flex-direction(column);
        @include justify-content(center);
        @include align-items(center);
        img{
        	width: 30%;
        }
        .isrotate{
        	animation: move 0.5s linear infinite;
        }
        p{
        	font-size: .12rem;
        	margin-top:.1rem;
        }
    }
	@keyframes move{
	    0% {transform: rotate(0deg);}
	    10% {transform: rotate(36deg);}
	    20% {transform: rotate(72deg);}
	    30% {transform: rotate(108deg);}
	    40% {transform: rotate(144deg);}
	    50% {transform: rotate(180deg);}
	    60% {transform: rotate(216deg);}
	    70% {transform: rotate(252deg);}
	    80% {transform: rotate(288deg);}
	    90% {transform: rotate(324deg);}
	    100% {transform: rotate(360deg);}
	}
</style>