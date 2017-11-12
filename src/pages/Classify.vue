<template>
  <div class="classify">
  	<classifyList></classifyList>
  </div>
</template>

<script>
import classifyList from '../components/ClassifyList.vue'

export default {
  components:{
    classifyList
  },mounted(){
        this.$store.commit('saveState','/classify');
    }
}
</script>
<style>


</style>
