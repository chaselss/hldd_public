<template>
  	<qualityList></qualityList>
</template>

<script>
import qualityList from '../components/QualityList.vue'

export default {
  components:{
    qualityList
  },
  mounted(){
        this.$store.commit('saveState','/quality');
    }
}
</script>
<style>


</style>

