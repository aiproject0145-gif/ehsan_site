// Product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 49.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Audio"
  },
  {
    id: 2,
    name: "Premium Phone Case",
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Protection"
  },
  {
    id: 3,
    name: "Fast Charging Power Bank",
    price: 39.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1609592810793-abeb6c64b5c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Charging"
  },
  {
    id: 4,
    name: "Phone Gaming Controller",
    price: 59.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Gaming"
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 29.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Charging"
  },
  {
    id: 6,
    name: "Noise Cancelling Headphones",
    price: 89.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    category: "Audio"
  }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in the UI
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--success);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    z-index: 1001;
    transform: translateX(150%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(150%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let stars = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  // Half star
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

// Render featured products
function renderFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  
  if (!featuredProductsContainer) return;
  
  // Take first 4 products as featured
  const featuredProducts = products.slice(0, 4);
  
  featuredProductsContainer.innerHTML = featuredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          ${generateStarRating(product.rating)}
          <span>(${product.rating})</span>
        </div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
          <button class="wishlist">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

// Newsletter form submission
function setupNewsletter() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      // In a real application, you would send this to your backend
      showNotification('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
  updateCartCount();
  setupMobileMenu();
  setupNewsletter();
  
  // Add some CSS for the notification
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--success);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      z-index: 1001;
      transform: translateX(150%);
      transition: transform 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});

// API integration example (for FastAPI backend)
async function fetchProductsFromAPI() {
  try {
    // This is an example - replace with your actual FastAPI endpoint
    const response = await fetch('https://your-fastapi-backend.com/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products from API:', error);
    // Fallback to our local products
    return products;
  }
}

// Example of how to integrate with FastAPI for cart operations
async function syncCartWithBackend() {
  // This would be called when the user logs in
  try {
    const response = await fetch('https://your-fastapi-backend.com/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include authentication token if needed
      },
      body: JSON.stringify({ cart })
    });
    
    if (response.ok) {
      console.log('Cart synced with backend');
    }
  } catch (error) {
    console.error('Error syncing cart with backend:', error);
  }
}