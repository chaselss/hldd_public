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
			this.$store.dispatch('getContents',`/api/quality/getList`)
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