
let shop = document.getElementById("shop");

let generateShop = () => {
  return (shop.innerHTML = shopItem
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `<div id = product-id-${id} class="item">
      <img width="230" src="${img}" alt="" />
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
          <h5>$${price}/hr</h5>
          <div class="button">
            <span
              onclick="decrement(${id})"
              class="iconify-inline min"
              data-icon="akar-icons:minus"
              data-flip="horizontal"
            ></span>
            <div class="quantity" id=${id}>${
        search.item === undefined ? 0 : search.item
      }</div>
            <span
              onclick="increment(${id})"
              class="iconify-inline plu"
              data-icon="akar-icons:plus"
              data-flip="horizontal"
            ></span>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join(""));
};

let basket = JSON.parse(localStorage.getItem("data")) || [];
generateShop();

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
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation(search.item);
};

let calculation = (x) => {
  let cartIcon = document.getElementById("total");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => y + x, 0);
};

calculation();
