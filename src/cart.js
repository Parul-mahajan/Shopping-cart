let label = document.getElementById("label");
let final = document.getElementById("final");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("total");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => y + x, 0);
};

calculation();

let generateCart = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItem.find((x) => x.id === id) || [];
        return `
      <div class="cart-items">
      <img src="${search.img}" width="150" alt="img-cat"/>
      <div class="details">
        <div class="title-price-x">
          <h5 class="title-price">
            <p>${search.name}</p>
            <p class="cart-price">$${search.price}</p>
          </h5>
          <span onclick="removeItem(${id})" class="iconify-inline cross" data-icon="akar-icons:cross" data-rotate="180deg"></span>
        </div>
        <div class="button">
        <span
          onclick="decrement(${id})"
          class="iconify-inline min"
          data-icon="akar-icons:minus"
          data-flip="horizontal"
        ></span>
        <div class="quantity" id=${id}>${item}</div>
        <span
          onclick="increment(${id})"
          class="iconify-inline plu"
          data-icon="akar-icons:plus"
          data-flip="horizontal"
        ></span>
      </div>
        <h5>$${item * search.price}</h5>
      </div>
    </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = "";
    label.innerHTML = ` <img src="images/last.png" alt="" width="26%" />
    <p><i>Looks like you havent met cat of your dreams yet!</i></p>
    <a href="index.html"
      ><button><h3>Go Back To Main Menu</h3></button></a
    >`;
    final.remove();
  }
};

generateCart();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCart();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item != 0);
  generateCart();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation(search.item);
  totalAm();
};

let removeItem = (id) => {
  let sItem = id;
  basket = basket.filter((x) => x.id !== sItem.id);
  generateCart();
  calculation();
  totalAm();
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(sItem.id);
};

let clearCart = () => {
  basket = [];
  generateCart();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
let totalAm = () => {
  if (basket.length !== 0) {
    let amt = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItem.find((x) => x.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    return (final.innerHTML = `
      <h2>Total Bill : $ ${amt}</h2>
      <div class="btn">
      <button class="checkout"><h3>Checkout</button>
      <button onclick="clearCart()" class="removeAll"><h3>Clear Cart</button>
      </div>
      
      `);
  } else return;
};
totalAm();
