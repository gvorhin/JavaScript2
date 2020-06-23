class GoodsItem {
  constructor(product_name, price) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="good-button" type="button" 
        onclick="basket.addItem(this)" xtitle = "${this.product_name}" xprice = ${this.price}>Купить</button>
      </div>
    `
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(textJSON) {
    this.goods = JSON.parse(textJSON);
  }

render() {
  let listHtml = '';
  this.goods.forEach(({ product_name, price }) => {
    const goodItem = new GoodsItem(product_name, price);
    listHtml += goodItem.render();
  });
  document.querySelector('.goods-list').innerHTML = listHtml;
}
totalPrice(){
  let total = this.goods.reduceRight((sum, item) => sum + item.price, 0);
  alert(total);
}
}
class BasketItem extends GoodsItem {
  parse(element) {
    this.product_name = element.attributes.xtitle.nodeValue;
    this.price = parseInt(element.attributes.xprice.nodeValue);
   
  }
  renderBasketItem(index){
    return `
    <div class="basket-item">
      <div class="basketItemText"> ${this.product_name} стоимостью ${this.price} </div> <button class="basket-button" type="button" 
      onclick="basket.delItem(this)" xtitle = "${this.product_name}" xprice = ${this.price} xindex = ${index}>Удалить</button>
    </div>
  `
  }
  
}


class BasketList extends GoodsList {
  addItem(element) {
    const item = new BasketItem();
    item.parse(element);
    this.goods.push(item);
  }
  delItem(element){
    const item = new BasketItem();
    let currentIndex = parseInt(element.attributes.xindex.nodeValue);
    this.goods.splice(currentIndex,1);
    document.querySelector('.BasketItem-list').innerHTML = "";
    this.open();
    
  }
  open(){
    let listHtml = '';

    this.goods.forEach(({ product_name, price },index) => {
      const basketItem = new BasketItem(product_name, price);
      listHtml += basketItem.renderBasketItem(index);
    });
    document.querySelector('.BasketItem-list').innerHTML = listHtml;
    
  }
}


const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";


const list = new GoodsList();

const promise_makeGETRequest = (url) =>{
return new Promise((resolve, reject) => {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      resolve(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
})};
promise_makeGETRequest(`${API_URL}/catalogData.json`).then((textJSON) => list.fetchGoods(textJSON))
.then(()=>list.render());
const basket = new BasketList();
