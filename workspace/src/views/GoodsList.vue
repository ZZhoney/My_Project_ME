<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span >Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:;" class="default cur">Default</a>
            <a @click="sortGoods"  href="javascript:;" class="price">
              Price
              <svg class="icon icon-arrow-short"  v-bind:class="{'sort-up':sortFlag}">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
            </a>
            <a href="javascript:;" class="filterby stopPop"  @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter"  v-bind:class="{'filterby-show': filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)"  v-bind:class="{'cur': priceChecked=='all'}"  @click="priceChecked='all'">All</a></dd>
                <dd v-for="(price,index) in priceFilter"   >
                  <a href="javascript:void(0)"    @click="setPriceFilter(index)"   v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}}-{{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4  list-wrap">
                <ul>
                  <li class="item" v-for="(item ,index) in  goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImg" alt=""></a>
                      <!--<a href="#"><img v-bind:src="'/static/'+item.productImg" alt=""></a>-->
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                  <div   style="text-align: center;" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                    加载中...
                  </div>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay"  v-show="overLayFlag"  @click="closePop"></div>
      //模态框
      <modal  v-bind:mdShow="mdShow"  v-on:close="closeModal">
        <p slot="message">
          请先登录，否则无法加入到购物车中！
        </p>
        <div slot="btnGroup">
          <a class="btn  btn--m"  href="javascript:;" @click="mdShow=false">关闭</a>
        </div>
      </modal>
      <modal  v-bind:mdShow="mdShowCart"  v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok"><!--navbar-cart-logo-->
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
          </svg>
          <span>加入购物车成功!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn  btn--m"  href="javascript:;" @click="mdShowCart=false">继续购物</a>
          <router-link  class="btn  btn--m"  href="javascript:;"   to="/cart" >查看购物车</router-link>
        </div>
      </modal>

      <nav-footer></nav-footer>
    </div>
</template>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import Modal from './../components/Modal.vue'
  import axios  from 'axios'
    export default{
        data(){
            return {
              goodsList:[],
              sortFlag:true,
              page:1,
              pageSize:8,
              busy:true,
              mdShow:false,
              mdShowCart:false,
              priceFilter:[
                {
                  startPrice:'0.00',
                  endPrice:'100.00'
                },
                {
                  startPrice:'100.00',
                  endPrice:'500.00'
                },
                {
                  startPrice:'500.00',
                  endPrice:'1000.00'
                },
                {
                  startPrice:'1000.00',
                  endPrice:'2000.00'
                },
              ],
              priceChecked:'all',
               filterBy:false,
              overLayFlag:false
            }
        },
      components:{
            NavHeader,
            Modal,
            NavFooter,
            NavBread

      },
      mounted(){
                this.getGoodsList();
      },
      methods:{
          getGoodsList(flag){
              var param={
                  page:this.page,
                  pageSize:this.pageSize,
                  sort:this.sortFlag?1:-1,
                  priceLevel:this.priceChecked
                  };
            axios.get("/goods/list",{
                params:param
            }).then((response)=>{
              let res=response.data;
              if(res.status=="0"){
                  if(flag){
                    this.goodsList=this.goodsList.concat(res.result.list);
                    if(res.result.count==0){
                        this.busy=true;
                    }else{
                        this.busy=false;
                    }
                  }else{
                    this.goodsList=res.result.list;
                    this.busy=false;
                  }

              }else{
                this.goodsList=[];
              }
            }).catch(function(error){
              this.busy=true;
            })
            },
          sortGoods(){
            this.sortFlag=!this.sortFlag;
            this.page=1;
            this.getGoodsList();
          },
          setPriceFilter(index){
            this.priceChecked=index;
            this.page=1;
            this.getGoodsList();
            // this.closePop();
          },
          loadMore(){
              this.busy=true;
             // setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
                this.busy = false;
            //  }, 1000);
          },



        addCart(productId){
          axios.post('/goods/addCart',{
            productId:productId
          }).then((response)=>{
            if(response.data.status=='0'){
              //alert("加入成功");
              this.mdShowCart=true;
              this.$store.commit("updateCartCount",1);
            }
            else {
              //alert(response.data.msg);
              this.mdShow=true;
            }
          })

        },
        closeModal(){
          this.mdShow=false;
        }



//        showFilterPop(){
//            this.filterBy=true;
//            this.overLayFlag=true;
//        },

//        closePop(){
//          this.filterBy=false;
//          this.overLayFlag=false;
//        }




      }
    }
</script>
//          addCart(productId){
//            axios.post('/goods/addCart',{
//              productId:productId
//            }).then(function(response){
//              //alert(response.data.status);
//              if(response.data.status=='0'){
//                alert("加入成功");
//              }
//              else {
//                //alert(response.data.msg);
//                alert(this.mdShow);
//                this.mdShow=true;
//              }
//            })
////              .catch(function(error){
////              alert(this.mdShow);
////                 alert(error);
////            })
//          }


///////////////////////////////////////////////////////////





//                  axios.post("/goods/addCart",{
//                    productId:productId
//                  }).then((response)=>{
//                    let res=response;
//                      if(res.status=="0"){
//                          alert("加入成功");
//                      }
//                      else{
//                          alert("msg????:"+res.msg);
//
//                      }
//                  })
