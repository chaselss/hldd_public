<template>
	<div class="quality">
		<header>
    		<div class="title">
    			<p>精品</p>
		    </div>
    	</header>
    	<section>
    		<quality></quality>
    	</section>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import quality from './quality'
	export default {
		data() {
			return {
				contentlist: []
			}
		},
		mounted() {
			this.$store.dispatch('getContents',`/api/api/index.php?c=prime&a=getPrimeList&appversion=1.3.0&devicetype=weixin&phonetype=android`)
		},
		computed: {
			
		},
		components: {
			quality
		}
	}
</script>

<style>
</style>