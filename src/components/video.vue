<template>
	<div class="videos" v-if="isShow">
        <div class="close" @click="closevideo()">X</div>
        <div class="videobody">
            <video autoplay="autoplay" controls="controls" :src="srcdata">
            </video>
        </div>
    </div>
</template>

<script>
export default {
    props:['srcdata','isShow'],
    data(){
        return {
        }
    },
    methods:{
        closevideo(){
            this.$emit('child-say')
        }
        
    },
    mounted(){
    }

    
        
}
</script>

<style lang="scss">
@import "../styles/yo/usage/core/reset";
@import "../styles/modules/common";
    .videos{
        width: 100%;
        height:100%;
        position: absolute;
        background: rgba(0,0,0,.8);
        left: 0;
        top:0;
        .close{
            color: white;
            font-weight: bold;
            width:.2rem;
            height: 0.2rem;
            position: absolute;
            top: .2rem;
            right:.2rem;
        }
        .videobody{
            margin-top:35%;
            width: 100%;
            height: 2.3rem;
            video{
                width: 100%;
                height:100%;
            }
        }
    }
</style>