"use strict";(self["webpackChunkhm_shopping"]=self["webpackChunkhm_shopping"]||[]).push([[871],{3136:function(t,e,r){r.d(e,{A:function(){return u}});var s=function(){var t=this,e=t._self._c;return e("van-search",{directives:[{name:"focus",rawName:"v-focus"}],attrs:{"show-action":"",placeholder:t.placeholder,value:t.value},on:{input:t.handleInput},scopedSlots:t._u([{key:"action",fn:function(){return[e("div",{on:{click:function(e){return t.btnFun(...t.btnFunParams)}}},[t._v("搜索")])]},proxy:!0}])})},n=[],a={name:"BtnSearchInput",data(){return{}},props:{value:{type:String,required:!0},btnFun:{type:Function,required:!0},placeholder:{type:String,default:"请在此输入搜索关键词"},btnFunParams:{type:Array,default:()=>[]}},methods:{handleInput(t){this.$emit("input",t)}}},o=a,c=r(1656),i=(0,c.A)(o,s,n,!1,null,"288b1bce",null),u=i.exports},4252:function(t,e,r){r.r(e),r.d(e,{default:function(){return h}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"search"},[e("van-nav-bar",{attrs:{fixed:"",title:"商品列表","left-arrow":"",placeholder:""},on:{"click-left":function(e){return t.$router.go(-1)}}}),e("BtnSearchInput",{attrs:{"btn-fun":t.searchBtnFun},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}}),e("div",{staticClass:"sort-btns"},t._l(t.navList,(function(r){return e("div",{key:r,staticClass:"sort-item",class:{active:t.activeName===r},on:{click:function(e){t.activeName=r}}},[t._v(" "+t._s(r)+" ")])})),0),e("div",{staticClass:"goods-list"},t._l(t.productList,(function(t){return e("GoodsItem",{key:t.goods_id,attrs:{item:t}})})),1)],1)},n=[],a=r(7542),o=r(7867),c=r(3136),i=r(3518),u={name:"SearchList",components:{BtnSearchInput:c.A,GoodsItem:a.A},data(){return{searchInput:this.$route.query.search||"",page:1,productList:[],navList:["综合","销量","价格"],activeName:"综合"}},computed:{categoryId(){return this.$route.query.categoryId||""}},created(){this.SET_HISTORY(this.searchInput)},methods:{...(0,i.PY)("user",["REMOVE_HISTORY","SET_HISTORY"]),sort(t){const e={"综合":{sortType:"all"},"销量":{sortType:"sales",sortPrice:0},"价格":{sortType:"price"}};return e[t]||{}},async getProductList(t){const e=await(0,o.Mc)({goodsName:this.searchInput||void 0,page:this.page,categoryId:this.categoryId||void 0,...t});this.productList=e.data.list.data},searchBtnFun(){const t=this.sort(this.activeName);this.getProductList(t),this.SET_HISTORY(this.searchInput)}},watch:{activeName:{immediate:!0,handler(t){const e=this.sort(t);this.getProductList(e)}}}},d=u,l=r(1656),p=(0,l.A)(d,s,n,!1,null,"5c42412c",null),h=p.exports},7867:function(t,e,r){r.d(e,{Mc:function(){return n},VQ:function(){return o},jL:function(){return a}});var s=r(5720);const n=t=>{const{sortType:e,sortPrice:r,categoryId:n,goodsName:a,page:o}=t;return s.A.get("/goods/list",{params:{sortType:e,sortPrice:r,categoryId:n,goodsName:a,page:o}})},a=t=>s.A.get("/goods/detail",{params:{goodsId:t}}),o=(t,e)=>s.A.get("/comment/listRows",{params:{goodsId:t,limit:e}})}}]);
//# sourceMappingURL=871.179c309d.js.map