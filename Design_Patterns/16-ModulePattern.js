
const CartModule = (() => {
    let cartItem = [];

    function addItem(item){
        cartItem.push(item);
    }
    function removeItem(item) {
        const filteredItem =  cartItem.filter((val) => val !== item);
        cartItem = [...filteredItem]
    }

    function getItems(){
        return cartItem;
    }

    return {
        addItem,
        removeItem,
        getItems
    }
})(); 

CartModule.addItem("Laptop");
CartModule.addItem("Mouse");

console.log(CartModule.getItems()); 
// ["Laptop", "Mouse"]

CartModule.removeItem("Mouse");

console.log(CartModule.getItems()); 
// ["Laptop"]