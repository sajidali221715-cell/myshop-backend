// ================= CONFIG =================
const API_URL = "http://localhost:5003/api/products";
const IMAGE_BASE_URL = "http://localhost:5003/uploads/"; 
// ↑ change this only if your images folder name is different

// ================= LOAD PRODUCTS =================
async function loadProducts() {
  console.log("✅ product.js loaded");

  const container = document.getElementById("products");
  const noProducts = document.getElementById("noProducts");

  // Safety check
  if (!container || !noProducts) {
    console.error("❌ Missing #products or #noProducts in HTML");
    return;
  }

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await res.json();
    console.log("📦 Products from API:", products);

    container.innerHTML = "";

    // No products case
    if (!Array.isArray(products) || products.length === 0) {
      noProducts.style.display = "block";
      return;
    }

    noProducts.style.display = "none";

    // Render products
    products.forEach(product => {
      const name = product.name || "Unnamed Product";
      const price = product.price ?? 0;

      // ✅ IMAGE FIX (IMPORTANT)
      let image = "https://via.placeholder.com/150";

      if (product.image) {
        if (product.image.startsWith("http")) {
          image = product.image; // online image
        } else {
          image = IMAGE_BASE_URL + product.image; // local image
        }
      }

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p><strong>₹${price}</strong></p>
        <button>Add to Cart</button>
      `;

      // Add to cart handler
      card.querySelector("button").addEventListener("click", () => {
        addToCart(product);
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error("❌ Error loading products:", error);
    container.innerHTML =
      "<p style='color:red; text-align:center;'>Failed to load products</p>";
  }
}

// ================= ADD TO CART =================
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find(item => item._id === product._id);

  if (exists) {
    alert("Product already in cart");
    return;
  }

  cart.push({
    _id: product._id,
    name: product.name || "Unnamed Product",
    price: product.price ?? 0,
    image: product.image || "",
    quantity: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart ✅");
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadProducts);
