<template lang="html">
    <div id="index">
      <section>
        <router-view></router-view>
      </section>
      <footer>
        <ul>
          <router-link to="/home" tag ="li" :class="{index_actived:$store.state.state=='/home'}">
            <span class="fa index"></span>
            <span class="footerTitle">首页</span>
          </router-link>
          <router-link to="/classify" tag ="li" :class="{category_actived:$store.state.state=='/classify'}">
           <span class="fa category"></span>
            <span class="footerTitle">分类</span>
          </router-link>
          <router-link to="/quality" tag ="li" :class="{discovery_actived:$store.state.state=='/quality'}">
           <span class="fa discovery"></span>
            <span class="footerTitle">精品</span>
          </router-link>
          <router-link to="/shoppingbag" tag ="li" :class="{car_actived:$store.state.state=='/shoppingbag'}">
            <span class="fa car"></span>
            <span class="footerTitle">购物袋</span>
          </router-link>
          <router-link to="/mine"tag ="li" :class="{userCenter_actived:$store.state.state=='/mine'}">
           <span class="fa userCenter"></span>
            <span class="footerTitle">我的</span>
          </router-link>
        </ul>
      </footer>
      
    </div>
</template>

<script>
export default {


  
}
</script>

