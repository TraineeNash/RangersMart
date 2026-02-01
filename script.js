const food_items_div = document.querySelector("#food-items")

const food_items = [
    {
        image: "Fooditems/Item1.jpg",
        title: "Temaki: Pickled Plum",
        price: 3.90
    },
    {
        image: "./FoodItems/Item2.jpg",
        title: "Temaki: Salmon",
        price: 5.20
    },
    {
        image: "./FoodItems/Item3.png",
        title: "Temaki: Seaweed",
        price: 3.90
    },
    {
        image: "./FoodItems/Item4.png",
        title: "Temaki: Tuna Mayonnaise",
        price: 4.90
    },
    {
        image: "./FoodItems/Item5.png",
        title: "Jikamaki: Tuna Mayonnaise",
        price: 4.90
    },
    {
        image: "./FoodItems/Item6.png",
        title: "Jikamaki: Salmon",
        price: 4.90
    },
    {
        image: "./FoodItems/Item7.png",
        title: "Jikamaki: Spicy Cod Roe Mayonnaise",
        price: 4.90
    },
    {
        image: "./FoodItems/Item8.png",
        title: "Jikamaki: Pork Tuna Mayonnaise",
        price: 5.90
    },
    {
        image: "./FoodItems/Item9.png",
        title: "The Meat Sand",
        price: 11.90
    },
    {
        image: "./FoodItems/Item10.png",
        title: "Egg Sandwich",
        price: 5.90
    },
    {
        image: "./FoodItems/Item11.png",
        title: "Lettuce, Ham and Cheese Sandwich",
        price: 6.90
    },
    {
        image: "./FoodItems/Item12.png",
        title: "Potato salad Sandwich",
        price: 5.90
    },
    {
        image: "./FoodItems/Item13.png",
        title: "Tortilla chicken and Char Siu",
        price: 11.90
    },
    {
        image: "./FoodItems/Item14.png",
        title: "Teriyaki burger",
        price: 9.90
    },
    {
        image: "./FoodItems/Item15.png",
        title: "American Hot Dog",
        price: 7.90
    }
]

// loop through the array food_items using <div> tag to show every items

food_items.forEach(item => {

    const template = `
    <div class="bg-white p-3 rounded-md w-[250px]">
        <img class="h-[250px] w-full" src=${item.image}>
        <div class="h-[70px] my-2">
            <p class="font-bold">${item.title}</p>
            <p class="text-orange-600">RM ${item.price.toFixed(2)}</p>
        </div>
        <div>
        <button
        class="add-cart mt-5 bg-gray-800 w-full text-white rounded-md py-2 cursor-pointer hover:bg-gray-600"
        data-title = "${item.title}"
        data-image = "${item.image}"
        data-price = "${item.price}"
        >
        Add to Cart
        </button>
        </div>
    </div>
    `
    food_items_div.innerHTML += template
});

//---------------------------------------------------------------
// Display sidebar logic
const open_sidebar = document.querySelector("#cart-btn")
const close_sidebar = document.querySelector("#cart-close")
const sidebar = document.querySelector("#cart-panel")

// Open Sidebar
open_sidebar.addEventListener("click",()=>{
    sidebar.classList.remove("translate-x-full")
})

// Close Sidebar
close_sidebar.addEventListener("click",()=>{
    sidebar.classList.add("translate-x-full")
})
//---------------------------------------------------------------


//---------------------------------------------------------------
// Add to Cart Button logic
// Increase cart count & display item in checkout

// Assign .addEventListener to all add to cart button
const add_to_cart_btn = document.querySelectorAll(".add-cart")
let cart = []

// loop through every button
add_to_cart_btn.forEach((button)=>{

    // use addeventListener to set the function for each of add to cart button
    // we will "button" as the variable name for the addtocart button
    // which will be button.addeventlistener
    button.addEventListener("click",(event)=>{

        // the reason we use variable name "event" is to extract data
        // for each button there is its own dataset
        // which is the title, image and price which we set in line 96 - 98
        // where we set in <button> tag for add to cart just now
        // so we use variable "event" to get the dataset to display in our sidebar

        // so we need to declare the variable for the dataset first
        // which is the title, image and price
        // since all dataset we obtain will be in string
        // we need to convert specifically for price to be in float
        // this will make price easier to manipulate and get total item amount in RM
        const title = event.target.dataset.title
        const image = event.target.dataset.image
        const price = parseFloat(event.target.dataset.price)  // convert string to float

        // now we have assigned the button and the dataset
        // we need to check what happen after the addtocart button has been clicked
        // 1. we need to check whether the item already exist or not
        // 2. if already exist then add the quantity item by 1
        // 3. if not then display the new item in the sidebar
        
        // so to achieve this we need to create a variable "exist"
        // this is to check whether the item exist or not in the sidebar
        // "cart" is a variable name that need to be array data type
        // "cart" will be used to store item in checkout/cart
        // here we used .find() function to check whether there is existing item inside the "cart" array
        // then "exist" variable will be TRUE
        // if the item is not exist the "exist" variable will be UNDEFINED
        const exist = cart.find((item)=>{
            return item.title == title
        })

        // If "exist" variable is TRUE we will increase the quantity of said item by 1
        // Else we will create the item display in cart/checkout
        // So we need to create this logic as per below
        if(exist){
            exist.quantity += 1
        }else{
            const item = {
                title: title,
                image: image,
                price: price,
                quantity: 1
            }
            cart.push(item)

            // this is to check whether all button is working or not
            console.log(item)
        }
        updateSidebarUI()
    })
})
//---------------------------------------------------------------


//---------------------------------------------------------------
// Update Cart UI
// The logic has been finalized and checked
// The logic perform correctly
// Now we need to display the item in the sidebar/cart

const item_cart_div = document.querySelector("#cart-item")
const item_count_red_circle_on_cart= document.querySelector("#cart-count")
const total_amount_in_sidebar = document.querySelector("#total")

const updateSidebarUI = ()=>{
    item_cart_div.innerHTML = ""

    let total = 0
    let count = 0

    cart.forEach((item)=>{
        total += (item.price * item.quantity)
        count += item.quantity

        item_cart_div.innerHTML += `
        <div class="flex bg-gray-100 p-2 rounded-md mb-[20px] gap-3">
            <img src="${item.image}" class="w-[42px] rounded-md"></img>
            <div class="flex justify-between w-full">
                <div class="">
                <p class="font-bold">${item.title}</p>
                <p>RM ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button 
                    class="del-item text-red-600 font-bold cursor-pointer"
                    data-title="${item.title}"
                >
                X
                </button>
            </div>
        </div>
        `
    })

    total_amount_in_sidebar.textContent = total.toFixed(2)
    item_count_red_circle_on_cart.textContent = count
}
//---------------------------------------------------------------


//---------------------------------------------------------------
// Delete item by clicking the X button

// add click event to anywhere in website using DOM method
document.addEventListener("click",(event)=>{

    // we first try to check if there is class "del-item"
    // this class "del-item" is for us to use queryselector
    // to identify the X button in sidebar
    // if there is no "del-item" class then we exit this function
    if(!event.target.classList.contains("del-item")){
        return
    }else{
        const title = event.target.dataset.title

        cart  = cart.filter((item)=>{
            return item.title != title
        })

        updateSidebarUI()
    }

})

