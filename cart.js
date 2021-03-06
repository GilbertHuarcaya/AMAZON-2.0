function getCartItems() {
	db.collection("cart-items").onSnapshot((snapshot)=>{
		let cartItems = [];
		snapshot.docs.forEach((doc)=> {
			cartItems.push({
				id: doc.id,
				...doc.data()
			})
		})
		generateCartItems(cartItems);
		getTotalCost(cartItems);
	} )
}

function getTotalCost(items){
	let totalCost = 0;
	items.forEach((item)=> {
		totalCost += (item.price * item.quantity);
	})
	document.querySelector(".total-cost-number").innerText = numeral(totalCost).format("$0,0.00")
}

function decreaseCount(itemId) {
	let cartItem = db.collection("cart-items").doc(itemId)
	cartItem.get().then(function(doc) {
		if (doc.exists){
			if (doc.data().quantity > 1){
				cartItem.update({
					quantity: doc.data().quantity - 1
				})
			}
		}
	})
}

function increaseCount(itemId) {
	let cartItem = db.collection("cart-items").doc(itemId)
	cartItem.get().then(function(doc) {
		if (doc.exists){
			if (doc.data().quantity > 0){
				cartItem.update({
					quantity: doc.data().quantity + 1
				})
			}
		}
	})
}

function deleteItem(itemId) {
	db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems){
	let itemsHTML = "";
	cartItems.forEach((item)=> {
		itemsHTML += `
		<div class="cart-item flex flex-wrap items-center pb-4 border-b border-gray-300 mb-4">
			<div class="cart-item-details flex flex-grow flex-col">
				<h2 class="font-bold table-titles text-gray-400 items-start">
						Product
				</h2>
				<div class="cart-item-details flex flex-grow flex-wrap">

					<div class="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
						<img class="w-full h-full object-contain"  src="${item.image}" alt="laptop"/>
					</div>
					<div class="cart-item-data flex flex-col justify-center">
					<div   class="    cart-item-details-title    font-bold    text-sm text-gray-600  ">  
						${item.name}
					</div>
                			<div class="cart-item-brand text-sm text-gray-400">
						${item.make}
						</div>
					</div>
				</div>
			</div>
			<div class="cart-item-counter-box w-40 flex flex-wrap items-center text-gray-400">
				<h2 class="font-bold table-titles text-gray-400 flex items-start">
					Count
				</h2>
				<div class="cart-item-counter w-40 h-20 flex items-center text-gray-400">
                			<div  data-id="${item.id}" class="    cart-item-decrease     cursor-pointer    bg-gray-100    rounded    h-6    w-6    flex    justify-center    items-center    hover:bg-gray-200    mr-2  ">
						<i class="fas fa-chevron-left fa-xs"></i>
					</div>
					<h4 class="text-gray-400">
					${item.quantity}
					</h4>
                			<div data-id="${item.id}" class="    cart-item-increase    cursor-pointer    bg-gray-100    rounded    h-6    w-6    flex    justify-center    items-center    hover:bg-gray-200    ml-2  "> 
						<i class="fas fa-chevron-right fa-xs"></i>
					</div>
				</div>
			</div>
			<div class="cart-item-total-cost-box w-40 flex flex-wrap items-center text-gray-400">
				<h2 class="font-bold table-titles text-gray-400 flex items-start">
					Total Cost
				</h2>
				<div data-id="${item.id}" class="cart-item-total-cost w-40 h-20 flex items-center font-bold text-gray-400">
					${numeral(item.price * item.quantity).format("$0,0.00")}
				</div>
			</div>
			<div class="cart-item-delete-box w-5 flex flex-wrap items-center text-gray-400">
				<h2 class="table-titles text-transparent flex items-start">D</h2>
				<div data-id="${item.id}" class="   cart-item-delete   w-5  h-20 flex items-center font-bold  text-gray-300  cursor-pointer  hover:text-gray-400">
					<i class="fas fa-times"></i>
				</div>
			</div>
		</div>
		`
	})
	document.querySelector(".cart-items").innerHTML = itemsHTML;
	createEventListeners();
}

function createEventListeners() {
	let decreaseButtons = document.querySelectorAll(".cart-item-decrease");
	let increaseButtons = document.querySelectorAll(".cart-item-increase");
	let deleteButtons = document.querySelectorAll(".cart-item-delete");

	decreaseButtons.forEach((button)=>{
		button.addEventListener("click", function() {
			decreaseCount(button.dataset.id);
		})
	})

	increaseButtons.forEach((button)=>{
		button.addEventListener("click", function() {
			increaseCount(button.dataset.id);
		})
	})

	deleteButtons.forEach((button)=>{
		button.addEventListener("click", function() {
			deleteItem(button.dataset.id)
		})
	})
}

getCartItems();