const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


Vue.component('goods-list', {
  props: ['goods'],
  template:`
   <div class="goods-list" >
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `
});

Vue.component('basket-list', {
  props: ['basketGoods'],
  template:`
   <div class="basket-list" >
      <basket-item v-for="good in basketGoods" :good="good"></basket-item>
    </div>
  `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
      <button v-on:click="clickBuy(good.id_product)">Купить</button>
    </div>
  `,
  methods:{
    clickBuy(id_product){
       this.$root.buyItem(id_product);
    }
  }

});

Vue.component("basket-item",{
  props:['good'],
  template:`
  <div class="basket-item" >
     <h3>{{ good.product_name }}</h3>
     <p>{{ good.price }}</p>
     <button v-on:click="clickDel(good.id_product)">Удалить</button>
  </div>`
  ,
  methods:{
    clickDel(id_product){
       this.$root.clickDel(id_product);
    }
  }
});

Vue.component("buttons",{
  template:`
  <div> 
      <input type="text" class="goods-search" v-model="searchLine"/>
      <button class="search-button" type="button" v-on:click="search">Искать</button>
      <button class="cart-button" type="button" v-on:click="showcart">Корзина</button>
   </div>
  `,
  data(){
    return{
      searchLine : ""
    }
  },
  methods:{
  search(){
    this.$emit("filter", this.searchLine);
  },
  showcart(){
    this.$emit("basket");
  }
  }
});

new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    searchLine: "",
    visibleBasket: false
  },

  methods: {
    makeGETRequest(url, callback) {

      var xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('GET', url, true);
      xhr.send();
    },
    buyItem(id_product) {
      good = this.goods.find(item => item.id_product == id_product);
      this.basketGoods.push(good);
    },
    clickDel(id_product) {
      goodIndex = this.basketGoods.findIndex(item => item.id_product == id_product);
      this.basketGoods.splice(goodIndex,1);
    },
    filterGoods(searchLine) {
      const regexp = new RegExp(searchLine, 'i');
      this.filteredGoods = this.goods.filter(
        ({ product_name }) => regexp.test(product_name)
      );
    },
    showBasket() {
      this.visibleBasket = !this.visibleBasket;
      console.log("visibleBasket " + this.visibleBasket);
    },
    arrLength() {
      const newLocal = this.basketGoods.length > 0;
      console.log("newLocal " + this.basketGoods.length);
      return newLocal;
    
  }
  
  },
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      this.filteredGoods = JSON.parse(goods);      
    });
  }
});

