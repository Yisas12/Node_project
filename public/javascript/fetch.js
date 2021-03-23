function peticion(productId){
    fetch('http://localhost:3000/cart/add/' + productId)
    .then(() =>{
        window.location.href = "http://localhost:3000/products/pages/1";
    })
  .then(data => console.log(data));
}