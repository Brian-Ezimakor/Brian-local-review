if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


const selectElement = document.getElementById("type")
selectElement.addEventListener("change", (event) => {
    const priceValue = document.getElementById("price")
    const priceHeaderValue = document.getElementById("price-change")
    const selectedEssayType = event.target.value
    const school = document.getElementById("school-name")
    const word = document.getElementById("word-count")

    if(selectedEssayType == "") {
        priceValue.innerHTML = "$"
        priceHeaderValue.innerHTML = "$"
        school.style.display = "none"
        word.style.display = "none"
    }

    else if(selectedEssayType == "The Common App Essay") {
        priceValue.innerHTML = "$85"
        priceHeaderValue.innerHTML = "$85"
        school.style.display = "none"
        word.style.display = "none"
    }

    else if(selectedEssayType == "Supplemental Essay") {
        priceValue.innerHTML = "$35"
        priceHeaderValue.innerHTML = "$35"
        school.style.display = "block"
        word.style.display = "block"
    }

    else {
        priceValue.innerHTML = "$85"
        priceHeaderValue.innerHTML = "$85"
        school.style.display = "none"
        word.style.display = "none"
    }
})


function ready() {
let remove = document.getElementsByClassName("xitem");
for (let i = 0; i < remove.length; i++) {
    let button = remove[i];
    button.addEventListener('click', removeCart)
    displayCart()
    updateCart()
    saveCart()
   }

   update();
   displayCart();
   updateCart()
   saveCart()
   removeCart2()
   openCart()

   let addCart = document.getElementById("addtoCart")
   addCart.addEventListener("click", addToCart)

   displayCart()
   update()
}

function removeCart(event) {
    let buttonClicked = event.target
    const cartItem = buttonClicked.closest(".cart-item");
    cartItem.remove();
    update()
    displayCart()
}

function displayCart() {
    let remove = document.getElementsByClassName("xitem");
    let cartDisplay = remove.length;
    document.getElementById("cart-value").innerHTML = cartDisplay;
    if (cartDisplay == 0){
        document.getElementById("alert").innerText = "Your shopping cart is empty";
    } else {
        document.getElementById("alert").innerText = "";
    }
    update()
}

function addToCart(event) {
    const select = document.getElementById("type")
    const essay = document.getElementById("essay")

    if (select.value == "" || essay.value == "") {
        alert("Please Fill in all fields with '*' before purchasing")
    }

    else {
    let buttons = event.target
    let shop = buttons.parentElement.parentElement.parentElement
    let essayType = document.getElementById("type").value;
    let schoolValue = document.getElementById("school").value;
    let wordValue = document.getElementById("word").value;
    let priceValue = document.getElementById("price").innerHTML

    // Add Plus 1 when Item is Added to Car

    document.getElementById("addtoCart").addEventListener("click", function (e) {
    const floating = document.createElement("span");
    floating.textContent = "+1";
    floating.className = "floating-text";

  // Position it where the button was clicked
    const rect = e.target.getBoundingClientRect();
    floating.style.left = rect.left + rect.width / 2 + "px";
    floating.style.top = rect.top + window.scrollY + "px";

    document.body.appendChild(floating);

  // Remove it after animation completes
    setTimeout(() => {
    floating.remove();
    }, 3600);
    });

    addItem(essayType, schoolValue, wordValue, priceValue)
    console.log(essayType, schoolValue, wordValue, priceValue)
    update()
    displayCart()
    saveCart()
    }
}

function addItem(essayType, schoolValue, wordValue, priceValue) {
      let cartRow = document.createElement("div")
      let cartItemHolder = document.getElementsByClassName("itemsHolder")[0];
      cartRow.classList.add('cart-item')
       displayCart()
       let cartContents = `
        <div>
            <p>Essay Review</p>
            <p>${essayType}</p>
            <p>${schoolValue}</p>
            <p>${wordValue}</p>
            <p class="itemPrice">${priceValue}</p>
        </div>
        <i class="fa-solid fa-x xitem"></i>
       `
       cartRow.innerHTML = cartContents
       cartItemHolder.append(cartRow)
       cartRow.getElementsByClassName('xitem')[0].addEventListener("click", removeCart)
       displayCart()
       update()
       saveCart()
}

function saveCart() {
    let items = document.getElementById("itemsHolder").innerHTML;
    localStorage.setItem("collegeCartItem", items)
    updateCart()
}

function tellPage() {
    return localStorage.getItem("collegeCartItem");
}

function updateCart() {
    let show = tellPage();
    document.getElementById("itemsHolder").innerHTML = show;
    removeCart2()
}

updateCart()

function removeCart2() {
    let removal = document.getElementsByClassName("xitem")
    for(let remove of removal){
        remove.onclick = () => {
            let currentValue = remove.closest(".cart-item")
            currentValue.remove()
    update()
    displayCart()
    saveCart()
        }
    }
}

function openCart() {
    let x = document.getElementById("displaytoggler");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function closeCart() {
    let x =document.getElementById("displaytoggler");
    x.style.display = "none";
}

function update() {
    let cart = document.getElementsByClassName("itemsHolder")[0];
    let cartCons = cart.getElementsByClassName("cart-item")
    let total = 0;
    for (let i = 0; i < cartCons.length; i++) {
        let cartCon = cartCons[i]
        let price = cartCon.getElementsByClassName("itemPrice")[0];
        let purchase = parseFloat(price.innerText.slice(1))
        total = total + purchase
    }

    let subTotal = document.getElementById("total");
    subTotal.innerText =  total;

    let remover = document.getElementsByClassName("xitem");
    let cartDisplay = remover.length;
    let itemTotal = document.getElementById("itemSum");
    itemTotal.innerText = cartDisplay
}


function develop() {
    alert("Oops, this feature is still in development.")
}
