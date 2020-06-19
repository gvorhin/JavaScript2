class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
      <img src="img/${this.title}.jpg" class="img"> 
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="good-button" type="button" 
        onclick="basket.addItem(this)" xtitle = "${this.title}" xprice = ${this.price}>Купить</button>
      </div>
    `
  }
}

class GoodsList {
  constructor(){
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
      { title: 'Boots', price: 350 }
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(({ title, price }) => {
      const goodItem = new GoodsItem(title, price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  totalPrice(){
    let total = this.goods.reduceRight((sum,item)=> sum + item.price,0);
    alert(total);
  }
}
class BasketItem extends GoodsItem{
  parse(element){
    this.title = element.attributes.xtitle.nodeValue;
    this.price = parseInt(element.attributes.xprice.nodeValue);
  }
}


class BasketList extends GoodsList{
  addItem(element){
    const item = new BasketItem();
    item.parse(element);
    this.goods.push(item);
  }
}
const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalPrice();
const basket = new BasketList();


