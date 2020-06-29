const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
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
    clickBuy(id_product) {
      good = this.goods.find(item => item.id_product == id_product);
      this.basketGoods.push(good);
    },
    clickDel(id_product) {
      goodIndex = this.basketGoods.findIndex(item => item.id_product == id_product);
      this.basketGoods.splice(goodIndex,1);
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
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

