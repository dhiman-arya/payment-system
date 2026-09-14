if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeCartItemButtonElement =
    document.getElementsByClassName("btn-danger");

  const cartItemQuantityElement = document.getElementsByClassName(
    "cart-quantity-input",
  );

  const addItemToCartButtonElement =
    document.getElementsByClassName("shop-item-button");

  const cartItemsElement = document.getElementsByClassName("cart-items")[0];

  const purchaseButtonElement =
    document.getElementsByClassName("btn-purchase")[0];

  const cartRows = cartItemsElement.getElementsByClassName("cart-row");

  purchaseButtonElement.addEventListener("click", purchaseButtonHandler);

  for (let i = 0; i < addItemToCartButtonElement.length; i++) {
    addItemToCartButtonElement[i].addEventListener(
      "click",
      addItemToCartButtonHandler,
    );
  }

  for (let i = 0; i < cartItemQuantityElement.length; i++) {
    cartItemQuantityElement[i].addEventListener("change", cartQuantityHander);
  }

  for (let i = 0; i < removeCartItemButtonElement.length; i++) {
    removeCartItemButtonElement[i].addEventListener(
      "click",
      removeCartItemHandler,
    );
  }

  function purchaseButtonHandler(event) {
    Array.from(cartItemsElement.children).forEach((child) => child.remove());
    updateTotal();

    alert("Thank you for shopping with us:)");
  }

  function addItemToCartButtonHandler(event) {
    const shoppedItemTitle =
      event.target.parentElement.parentElement.getElementsByClassName(
        "shop-item-title",
      )[0].innerText;

    const shoppedItemImage =
      event.target.parentElement.parentElement.getElementsByClassName(
        "shop-item-image",
      )[0].src;

    const shoppedItemPrice =
      event.target.parentElement.getElementsByClassName("shop-item-price")[0]
        .innerText;
    addNewItemToCart(shoppedItemTitle, shoppedItemImage, shoppedItemPrice);

    updateTotal();
  }

  function addNewItemToCart(title, image, price) {
    for (let i = 0; i < cartRows.length; i++) {
      const rowItemTitle =
        cartRows[i].getElementsByClassName("cart-item-title")[0].innerText;
      if (rowItemTitle === title) {
        cartRows[i].getElementsByClassName("cart-quantity-input")[0].value++;

        return;
      }
    }

    const data = `<div class="cart-row">
          <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src=${image}
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
        </div>`;

    let newCartRowElement = document.createElement("div");
    newCartRowElement.innerHTML = data;

    cartItemsElement.append(newCartRowElement);
    newCartRowElement
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItemHandler);

    newCartRowElement
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", cartQuantityHander);
  }

  function cartQuantityHander(event) {
    let itemQuantity = event.target.value;
    if (!isFinite(itemQuantity) || itemQuantity <= 0) {
      event.target.value = 1;

      return;
    }
    updateTotal();
  }

  function removeCartItemHandler(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
  }

  function updateTotal() {
    const cartItemsElement = document.getElementsByClassName("cart-items")[0];
    const cartItemsRowsElement =
      cartItemsElement.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartItemsRowsElement.length; i++) {
      const price = parseFloat(
        cartItemsRowsElement[i]
          .getElementsByClassName("cart-price")[0]
          .innerText.replace("$", ""),
      );
      const quantity = cartItemsRowsElement[i].getElementsByClassName(
        "cart-quantity-input",
      )[0].value;

      total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  }
}
