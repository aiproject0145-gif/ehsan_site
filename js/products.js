// Products data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    ratingCount: 128,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "headphone",
    brand: "sony",
    badge: "Bestseller",
    inStock: true
  },
  {
    id: 2,
    name: "Premium Phone Case",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    ratingCount: 89,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "cover",
    brand: "spigen",
    badge: "New",
    inStock: true
  },
  {
    id: 3,
    name: "Fast Charging Power Bank",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.3,
    ratingCount: 203,
    image: "https://images.unsplash.com/photo-1609592810793-abeb6c64b5c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "powerbank",
    brand: "anker",
    badge: "Sale",
    inStock: true
  },
  {
    id: 4,
    name: "Phone Gaming Controller",
    price: 59.99,
    rating: 4.7,
    ratingCount: 67,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "gaming",
    brand: "sony",
    inStock: true
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.2,
    ratingCount: 154,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "charger",
    brand: "samsung",
    badge: "Popular",
    inStock: true
  },
  {
    id: 6,
    name: "Noise Cancelling Headphones",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    ratingCount: 312,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "headphone",
    brand: "sony",
    badge: "Premium",
    inStock: true
  },
  {
    id: 7,
    name: "USB-C Fast Charger",
    price: 19.99,
    rating: 4.4,
    ratingCount: 98,
    image: "https://images.unsplash.com/photo-1609592000607-b2c4d1b32b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "charger",
    brand: "anker",
    inStock: true
  },
  {
    id: 8,
    name: "Premium Leather Case",
    price: 34.99,
    rating: 4.6,
    ratingCount: 76,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "cover",
    brand: "apple",
    badge: "Luxury",
    inStock: false
  },
  {
    id: 9,
    name: "Magnetic Car Phone Holder",
    price: 15.99,
    originalPrice: 24.99,
    rating: 4.1,
    ratingCount: 203,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "stand",
    brand: "spigen",
    badge: "Sale",
    inStock: true
  },
  {
    id: 10,
    name: "Braided USB-C Cable",
    price: 12.99,
    rating: 4.3,
    ratingCount: 187,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "cable",
    brand: "anker",
    inStock: true
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.5,
    ratingCount: 124,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "audio",
    brand: "sony",
    badge: "Bestseller",
    inStock: true
  },
  {
    id: 12,
    name: "Screen Protector (3-Pack)",
    price: 9.99,
    rating: 4.7,
    ratingCount: 289,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "protection",
    brand: "spigen",
    inStock: true
  }
];

// Filter state
let filterState = {
  categories: ['all'],
  price: 'all',
  brands: ['all'],
  rating: 'all',
  sortBy: 'featured'
};

// DOM Elements
const productList = document.getElementById('product-list');
const resultsCount = document.getElementById('results-count');
const sortSelect = document.getElementById('sort-by');

// Initialize products page
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupFilters();
  setupSorting();
  updateCartCount();
});

// Render products to the page
function renderProducts(productsToRender) {
  if (productsToRender.length === 0) {
    productList.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters to see more products</p>
      </div>
    `;
    resultsCount.textContent = '0';
    return;
  }

  productList.innerHTML = productsToRender.map(product => `
    <div class="product-card">
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <div class="product-category">${getCategoryName(product.category)}</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">
            ${generateStarRating(product.rating)}
          </div>
          <span class="rating-count">(${product.ratingCount})</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${product.originalPrice ? `<span class="discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : ''}
        </div>
        <div class="product-actions">
          <button class="add-to-cart" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
            <i class="fas fa-shopping-cart"></i>
            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button class="wishlist" onclick="toggleWishlist(${product.id})">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  resultsCount.textContent = productsToRender.length;
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

// Get category display name
function getCategoryName(category) {
  const categoryNames = {
    'charger': 'Charger',
    'cover': 'Case & Cover',
    'headphone': 'Headphone',
    'powerbank': 'Power Bank',
    'cable': 'Cable',
    'stand': 'Stand & Holder',
    'audio': 'Audio',
    'protection': 'Protection',
    'gaming': 'Gaming'
  };
  
  return categoryNames[category] || category;
}

// Setup filter functionality
function setupFilters() {
  // Category filter
  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.value === 'all' && this.checked) {
        // If "All" is checked, uncheck others
        categoryCheckboxes.forEach(cb => {
          if (cb.value !== 'all') cb.checked = false;
        });
        filterState.categories = ['all'];
      } else if (this.checked && this.value !== 'all') {
        // If a specific category is checked, uncheck "All"
        const allCheckbox = document.querySelector('input[value="all"]');
        allCheckbox.checked = false;
        
        // Add to categories array
        if (!filterState.categories.includes(this.value)) {
          filterState.categories.push(this.value);
        }
        
        // Remove "all" from categories if present
        const allIndex = filterState.categories.indexOf('all');
        if (allIndex !== -1) {
          filterState.categories.splice(allIndex, 1);
        }
      } else if (!this.checked && this.value !== 'all') {
        // Remove from categories array
        const index = filterState.categories.indexOf(this.value);
        if (index !== -1) {
          filterState.categories.splice(index, 1);
        }
        
        // If no categories selected, select "All"
        if (filterState.categories.length === 0) {
          const allCheckbox = document.querySelector('input[value="all"]');
          allCheckbox.checked = true;
          filterState.categories = ['all'];
        }
      }
      
      applyFilters();
    });
  });

  // Price filter
  const priceRadios = document.querySelectorAll('input[name="price"]');
  priceRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      filterState.price = this.value;
      applyFilters();
    });
  });

  // Brand filter
  const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
  brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Similar logic to category filter
      if (this.value === 'all' && this.checked) {
        brandCheckboxes.forEach(cb => {
          if (cb.value !== 'all' && cb.parentElement.parentElement.parentElement.querySelector('h3').textContent === 'Brand') {
            cb.checked = false;
          }
        });
        filterState.brands = ['all'];
      } else if (this.checked && this.value !== 'all') {
        const allCheckbox = document.querySelector('input[value="all"]');
        if (allCheckbox && allCheckbox.parentElement.parentElement.parentElement.querySelector('h3').textContent === 'Brand') {
          allCheckbox.checked = false;
        }
        
        if (!filterState.brands.includes(this.value)) {
          filterState.brands.push(this.value);
        }
        
        const allIndex = filterState.brands.indexOf('all');
        if (allIndex !== -1) {
          filterState.brands.splice(allIndex, 1);
        }
      } else if (!this.checked && this.value !== 'all') {
        const index = filterState.brands.indexOf(this.value);
        if (index !== -1) {
          filterState.brands.splice(index, 1);
        }
        
        if (filterState.brands.length === 0) {
          const allCheckbox = document.querySelector('input[value="all"]');
          if (allCheckbox && allCheckbox.parentElement.parentElement.parentElement.querySelector('h3').textContent === 'Brand') {
            allCheckbox.checked = true;
            filterState.brands = ['all'];
          }
        }
      }
      
      applyFilters();
    });
  });

  // Rating filter
  const ratingRadios = document.querySelectorAll('input[name="rating"]');
  ratingRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      filterState.rating = this.value;
      applyFilters();
    });
  });

  // Apply filters button
  const applyButton = document.querySelector('.filter-btn');
  applyButton.addEventListener('click', applyFilters);

  // Reset filters button
  const resetButton = document.querySelector('.reset-btn');
  resetButton.addEventListener('click', resetFilters);
}

// Apply all filters
function applyFilters() {
  let filteredProducts = [...products];
  
  // Category filter
  if (!filterState.categories.includes('all')) {
    filteredProducts = filteredProducts.filter(product => 
      filterState.categories.includes(product.category)
    );
  }
  
  // Price filter
  if (filterState.price !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      switch(filterState.price) {
        case '0-20': return product.price < 20;
        case '20-50': return product.price >= 20 && product.price <= 50;
        case '50-100': return product.price >= 50 && product.price <= 100;
        case '100+': return product.price > 100;
        default: return true;
      }
    });
  }
  
  // Brand filter
  if (!filterState.brands.includes('all')) {
    filteredProducts = filteredProducts.filter(product => 
      filterState.brands.includes(product.brand)
    );
  }
  
  // Rating filter
  if (filterState.rating !== 'all') {
    const minRating = parseInt(filterState.rating);
    filteredProducts = filteredProducts.filter(product => 
      product.rating >= minRating
    );
  }
  
  // Apply sorting
  sortProducts(filteredProducts);
}

// Reset all filters
function resetFilters() {
  // Reset filter state
  filterState = {
    categories: ['all'],
    price: 'all',
    brands: ['all'],
    rating: 'all',
    sortBy: 'featured'
  };
  
  // Reset UI
  const allCategoryCheckbox = document.querySelector('input[value="all"]');
  if (allCategoryCheckbox) allCategoryCheckbox.checked = true;
  
  const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
  categoryCheckboxes.forEach(checkbox => {
    if (checkbox.value !== 'all') checkbox.checked = false;
  });
  
  const allPriceRadio = document.querySelector('input[value="all"][name="price"]');
  if (allPriceRadio) allPriceRadio.checked = true;
  
  const allBrandCheckbox = document.querySelector('input[value="all"]');
  if (allBrandCheckbox) allBrandCheckbox.checked = true;
  
  const brandCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
  brandCheckboxes.forEach(checkbox => {
    if (checkbox.value !== 'all' && checkbox.parentElement.parentElement.parentElement.querySelector('h3').textContent === 'Brand') {
      checkbox.checked = false;
    }
  });
  
  const allRatingRadio = document.querySelector('input[value="all"][name="rating"]');
  if (allRatingRadio) allRatingRadio.checked = true;
  
  sortSelect.value = 'featured';
  
  // Apply reset
  applyFilters();
}

// Setup sorting functionality
function setupSorting() {
  sortSelect.addEventListener('change', function() {
    filterState.sortBy = this.value;
    applyFilters();
  });
}

// Sort products based on selected option
function sortProducts(productsToSort) {
  const sortedProducts = [...productsToSort];
  
  switch(filterState.sortBy) {
    case 'price-low':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      // For demo, we'll sort by ID (assuming higher IDs are newer)
      sortedProducts.sort((a, b) => b.id - a.id);
      break;
    case 'featured':
    default:
      // Default order (as in original array)
      break;
  }
  
  renderProducts(sortedProducts);
}

// Toggle wishlist
function toggleWishlist(productId) {
  const wishlistBtn = document.querySelector(`.wishlist[onclick="toggleWishlist(${productId})"]`);
  const icon = wishlistBtn.querySelector('i');
  
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    wishlistBtn.classList.add('active');
    showNotification('Added to wishlist');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    wishlistBtn.classList.remove('active');
    showNotification('Removed from wishlist');
  }
}

// Show notification
function showNotification(message) {
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

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
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

// Update cart count in the UI
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}