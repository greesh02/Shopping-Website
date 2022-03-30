let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// cart open close functionality
cartIcon.onclick = function (){
    cart.classList.remove("cart-close");
    cart.classList.add("cart-open");
}

closeCart.onclick = function (){
    cart.classList.remove("cart-open");
    cart.classList.add("cart-close");
}
// removing item from cart
let cartRemoveButtons = document.getElementsByClassName("cart-remove");
for(let i = 0;i < cartRemoveButtons.length;i++){
    cartRemoveButtons[i].addEventListener("click",removeCartItem);
}
// if the quantity is changed in cart updating total accordingly
let itemQuantityInputs = document.getElementsByClassName("cart-quantity");
for(let i = 0;i < itemQuantityInputs.length;i++){
    itemQuantityInputs[i].addEventListener("change",quantityUpdate);
}

// adding event listner to add items to cart
let addItemCart = document.getElementsByClassName("add-cart");
for(let i = 0;i < addItemCart.length;i++){
    addItemCart[i].addEventListener("click",addItemCartClicked);
}

// Buy Button
document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);
function buyButtonClicked() {
    alert("Your Order placed");
    let cartItems = document.getElementsByClassName("cart-content")[0];
    cartItems.innerHTML = "";
    updateTotal();
}

// remove item from cart
function removeCartItem(event){
    //removing its parent to remove that item
    let curElement = event.target.parentElement;
    curElement.parentElement.remove();
    updateTotal();
}
//quantity updated
function quantityUpdate(event){
    let curElement = event.target;
    if( isNaN(curElement.value) || curElement.value <= 0){
        curElement.value = 1;
    }
    //updating total if quantity updated
    updateTotal();
}

// add item to cart
function addItemCartClicked(event){
    let curElement = event.target;
    let curItemDetails = curElement.parentElement;
    let itemName = curItemDetails.getElementsByClassName("product-title")[0].innerText;
    let itemPrice = curItemDetails.getElementsByClassName("price")[0].innerText;
    let itemImg = curItemDetails.getElementsByClassName("product-img")[0].src;
    addItemToCart(itemName,itemPrice,itemImg);
    //updating total after adding item to cart
    updateTotal();

}
function addItemToCart(title,price,itemImg){
    let newCartItem = document.createElement("div");
    newCartItem.classList.add("cart-box")
    let cartItems = document.getElementsByClassName("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    console.log(...cartItemsNames);
    for(let i = 0;i < cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText === title){
            console.log(cartItemsNames[i].innerText);
            alert("item already added to cart");
            return;
        }
    }
    let cartItemHTML = `<img src= ${itemImg} alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class='bx bx-trash-alt cart-remove'></i>`;
    newCartItem.innerHTML = cartItemHTML;
    cartItems.append(newCartItem);
    newCartItem.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
    newCartItem.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityUpdate);
    alert("item added to cart");
}



// update total
function updateTotal(){
    let cartItems = document.getElementsByClassName("cart-box");
    let total = 0;
    for(let i = 0;i < cartItems.length;i++){
        let curItem = cartItems[i];
        let curItemPriceElement = curItem.getElementsByClassName("cart-price")[0];
        let curItemQuantityElement = (curItem.getElementsByClassName("cart-quantity")[0]);
        let price = parseFloat(curItemPriceElement.innerText.replace("₹",""));
        let quantity = curItemQuantityElement.value;
        total += price*quantity;
        
    }
    total = Math.round(total);
    document.getElementsByClassName("total-price")[0].innerText = "₹ " + total;
}
