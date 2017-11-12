<<template>
  <div id="detail1_box">
     <header>
         <i class="yo-ico" @click="$router.go(-1)">&#xe60b;</i>
         <h2 class="goods_title" v-html="detail_text.goods_name"></h2>
         <i class="yo-ico" @click="$router.push({name:'ShoppingBag'})">&#xe64d;</i>
     </header>
      <section>
        <div class="title">
            <p @click="icontclick" class="chakan">查看详情 <i class='yo-ico' v-if = "isshows">&#xe64e;</i><i class='yo-ico' v-if = "!isshows">&#xe605;</i></p>
        </div>
        <div class="swiper-container detail1_swiper">
            <div class="swiper-wrapper" >
                <div class="swiper-slide" v-for="(url,index) in arrayurl" :key="index">
                    <img :src="url"></img>
                </div>
             </div>
          
            <div class="detail1-pagination"></div>  
         </div>
         <div class="arrow"><img src="https://www.hldd.com/mobile/image/goods/down.png"/></div>
     </section>
      <footer>
          <!-- 选中的商品goods_spec -->
          <p class = "detail_price">
              <i class="yo-ico">&#xe654;</i><span class="pri_real" v-html="detail_text.goods_price"></span>
              <b v-if="isshowspec">/</b><span class="specify" v-for="value in detail_text.goods_spec" v-html ="value" v-if="isshowspec"></span>
          </p>
          <button class="add" @click="close">加入购物袋</button>
          <button class="send" @click="close">立即送礼</button>
      </footer>
      <transition name="fade">
        <div class = "goods_detail_text" v-if = "isshows">
            <h4 v-html="detail_text.goods_name"></h4>
            <p v-html="detail_text.goods_jingle"></p>
            <ul>
                <li><p>联系客服</p></li>
                <li><p>分享商品</p></li>
            </ul>
        </div>
      </transition>
      <transition name="select" >
          <div class = "select_box" v-if="!isclose">
              <!-- 价钱图片 -->
              <div class="chil1">
                  <img :src="detail_text.goods_image"/>
                  <b>
                      <i class = "yo-ico">&#xe654;</i>
                      <!-- 当前单价 -->
                      <span v-html="currentgoods.goods_price"></span>
                  <i class = "yo-ico close" @click="close" >&#xe60d;</i>
                  </b>
                  
              </div>
              <!-- 规格参数 -->
              <div class="chil2">
                  <div v-for="(value1,index1) in spec_name">
                      <h2 v-html="value1"></h2>
                      <!-- 选项 -->
                      <span v-for="(value2,index2) in spec_value[index1]" :class="{spec_active:haha(index2)}" @click="setselected(index1,index2)">{{value2}}</span>
                  </div>
              </div>

              <div class="chil3">
                  <h2>数量</h2>
                  <div>
                      <span class="subtract" @click="subtract">-</span>
                      <input type="text" v-model.number.trim="number"/>
                      <span class="add" @click="add">+</span>
                  </div>
              </div>
              <div class="chil4">
                 <p v-html="detail_text.goods_intro"></p> 
              </div>
              <button @click="addcart">确认</button>
          </div>

      </transition> 
      
  </div>
 
</template>
<<script>
import getDate from '../utils/axios.untils.js'
export default {

  data(){
      return {
          arrayurl:'',
          detail_text:'',   //goodsinfo
          spec_name:{},
          spec_value:{},
          isshows:false, //是否显示详情
          isshowspec:false,     //是否显示商品规格
          speclist:[],          //规格列表
          isclose:true,
          number:1,
          goods_commend_list:'',  //商品规格详细的列表
          spec_list:'',  //id对照表
          goodsid:'',   //商品真实id
          data:'',      //ajax请求到的全套数据
          currentgoods:'',      //选中的真实商品
          currentitem:'',
          goods_spec:'',   //默认选中item的编号集合
          seleidlist:{},
          
      }
  },
  methods:{
      icontclick(){
          if(this.isclose){
              this.isshows=!this.isshows;
          }
      },
      close(){
          this.isclose=!this.isclose;
      },
       add(){
          this.number++
      },
      subtract(){
          if(this.number>1){
              this.number--
          }
      },
      setselected(){
          console.log(this.seleidlist)
          for(var i in this.seleidlist){
              if(i == arguments[0]){
                  this.seleidlist[i] = arguments[1]
              }
          }
        var key = Object.values(this.seleidlist).join('|')    //1331|1333
        var id = ''
        for(var keys in this.spec_list){
            if(keys==key){
                id = this.spec_list[keys]
            }
        }
        this.$store.dispatch('getdetail1',id)   //根据选项做ajax请求
        this.number = 1;
      },
      haha(index2){         //设置选中项不同的css样式
            var flag = false;
            for(var ixx in this.goods_spec){
                if(this.goods_spec[ixx]==index2){
                    flag = true
                }
            }
             return  flag;
      },
      addcart(){
          var options={
              goods_id:this.detail_text.goods_id,
              quantity:this.number,
          }
         this.$store.dispatch('addcart',options) 
      }
      
  },
  
  computed: {
      getimgpath:function(){
        this.data = this.$store.state.detail1
        return this.$store.state.detail1
        
      }, 
      isshow_spec(){
          return this.detail_text.goods_spec
      },
      
     
           
  },
  watch: {
      getimgpath(a){
          this.arrayurl = a.goods_image.split(',');
          this.detail_text = a.goods_info;
          this.spec_name = a.goods_info.spec_name;
          this.spec_value = a.goods_info.spec_value;
          this.goods_spec = Object.keys(this.detail_text.goods_spec)   //选中的项目集合
          
         
          for(var i in this.detail_text.goods_spec){
              
              this.isshowspec = this.detail_text.goods_spec[i].length<=5? true:false;
          }
          this.goods_commend_list = this.data.goods_commend_list //推荐商品列表
          this.spec_list = this.data.spec_list
          this.currentgoods=this.detail_text;   //默认为当前第一种规格的商品
          var indexs = 0;                   //记录当前的默认商品信息
          
         for(var k in this.spec_name) {
            this.seleidlist[k] = this.goods_spec[indexs]
            indexs++
         }
      },
      isshows(data){
         
      }

  },
  mounted(){
      
    var mySwiper = new Swiper ('.detail1_swiper', {
        direction: 'vertical',
        pagination: '.detail1-pagination',
        // 如果需要分页器
        observer:true,
     
        })        

  },
  destroyed(){
      //this.number=1;
  }

}
</script>
<style>
    
</style>
