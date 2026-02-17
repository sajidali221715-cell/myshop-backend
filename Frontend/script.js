fetch("http://localhost:5000/products")
  .then(res => res.json())
  .then(data => {
    const div = document.getElementById("products");
    data.forEach(p => {
      div.innerHTML += `
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <img src="${p.image}" width="100"/>
        <hr/>
      `;
    });
  });
div.innerHTML += `
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick='add(${JSON.stringify(p)})'>Add to Cart</button>
<hr/>`;

function add(p){
 let cart = JSON.parse(localStorage.cart || "[]");
 cart.push(p);
 localStorage.cart = JSON.stringify(cart);
 alert("Added to cart");
}
   