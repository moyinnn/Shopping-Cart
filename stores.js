if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
} 
        
function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for( var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for( var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
}
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal() 
}

function quantityChanged(event){
    var inpu = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('h')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-images').src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')
    var cartItemNames = document.getElementsByClassName('title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("This item is already added to the cart")
        }else{
            return addItemToCart(title, price, imageSrc)
        }
    }
    cartRow.classList.add('cart-row')
    var cartRowContents = `
    <div class="cart-row">
                    <div class="cart-item cart-column"> 
                        <img class="cart-image" src="${imageSrc}" width="100px" height="100px">
                        <span class="title">${title}</span>
                    </div>
                        <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" role="button">remove</button>
                    </div>`
                    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0;
    for ( var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price").innerText = '$' + total
}