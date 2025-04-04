import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaStar, FaRegStar, FaFilter, FaTags, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'books', name: 'Books & Textbooks' },
    { id: 'courses', name: 'Premium Courses' },
    { id: 'materials', name: 'Study Materials' },
    { id: 'tools', name: 'Tools & Equipment' },
    { id: 'software', name: 'Software & Apps' }
  ];

  // Simulated product data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Advanced Mathematics Textbook',
          description: 'Comprehensive textbook covering advanced mathematical concepts for high school students.',
          price: 49.99,
          discountPrice: 39.99,
          image: 'https://placehold.co/300x400/indigo/white?text=Math+Textbook',
          category: 'books',
          rating: 4.8,
          reviewsCount: 123,
          inStock: true
        },
        {
          id: 2,
          name: 'Physics Formula Cards',
          description: 'Quick reference cards with essential physics formulas and concepts.',
          price: 14.99,
          discountPrice: null,
          image: 'https://placehold.co/300x400/blue/white?text=Formula+Cards',
          category: 'materials',
          rating: 4.5,
          reviewsCount: 87,
          inStock: true
        },
        {
          id: 3,
          name: 'Scientific Calculator',
          description: 'Advanced scientific calculator with graphing capabilities, perfect for math and science courses.',
          price: 129.99,
          discountPrice: 99.99,
          image: 'https://placehold.co/300x400/gray/white?text=Calculator',
          category: 'tools',
          rating: 4.9,
          reviewsCount: 256,
          inStock: true
        },
        {
          id: 4,
          name: 'Chemistry Lab Equipment Set',
          description: 'Basic home lab kit for chemistry experiments and demonstrations.',
          price: 79.99,
          discountPrice: null,
          image: 'https://placehold.co/300x400/green/white?text=Lab+Kit',
          category: 'tools',
          rating: 4.3,
          reviewsCount: 64,
          inStock: false
        },
        {
          id: 5,
          name: 'Math Problem Solver Pro (1-Year Subscription)',
          description: 'Software application that solves and explains complex math problems step-by-step.',
          price: 59.99,
          discountPrice: 49.99,
          image: 'https://placehold.co/300x400/purple/white?text=Math+Software',
          category: 'software',
          rating: 4.7,
          reviewsCount: 189,
          inStock: true
        },
        {
          id: 6,
          name: 'Physics: Mechanics & Waves (Premium Course)',
          description: 'Comprehensive course on physics mechanics and wave motion with practice problems and simulations.',
          price: 199.99,
          discountPrice: 149.99,
          image: 'https://placehold.co/300x400/orange/white?text=Physics+Course',
          category: 'courses',
          rating: 4.9,
          reviewsCount: 312,
          inStock: true
        },
        {
          id: 7,
          name: 'Biology Illustrated Guide',
          description: 'Visual guide to biology with detailed illustrations and explanations of biological concepts.',
          price: 34.99,
          discountPrice: null,
          image: 'https://placehold.co/300x400/teal/white?text=Biology+Guide',
          category: 'books',
          rating: 4.6,
          reviewsCount: 97,
          inStock: true
        },
        {
          id: 8,
          name: 'Digital Lab Notebook',
          description: 'Digital notebook for organizing lab notes, data, and observations.',
          price: 29.99,
          discountPrice: 19.99,
          image: 'https://placehold.co/300x400/red/white?text=Lab+Notebook',
          category: 'materials',
          rating: 4.2,
          reviewsCount: 45,
          inStock: true
        }
      ];
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter products by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === activeCategory);
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);
  
  // Sort products
  useEffect(() => {
    let sorted = [...filteredProducts];
    
    switch (sortOption) {
      case 'popular':
        sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceAsc':
        sorted.sort((a, b) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceA - priceB;
        });
        break;
      case 'priceDesc':
        sorted.sort((a, b) => {
          const priceA = a.discountPrice ?? a.price;
          const priceB = b.discountPrice ?? b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        // In a real app, you would sort by date added
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  }, [sortOption]);
  
  // Add to cart
  const addToCart = (product) => {
    const itemInCart = cartItems.find(item => item.id === product.id);
    
    if (itemInCart) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    // Show cart briefly
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 3000);
  };
  
  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };
  
  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Calculate total
  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discountPrice ?? item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  
  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <FaRegStar className="text-yellow-400" />
            <FaStar className="text-yellow-400 absolute top-0 left-0 overflow-hidden" style={{ width: '50%', clipPath: 'inset(0 50% 0 0)' }} />
          </div>
        );
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shop Learning Resources</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse our collection of books, courses, and learning tools to enhance your educational journey.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 relative">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <FaShoppingCart className="mr-2" />
              <span>Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
            </button>
            
            {/* Shopping Cart Dropdown */}
            {cartOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-10">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
                </div>
                
                {cartItems.length === 0 ? (
                  <div className="p-4 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-96 overflow-y-auto">
                      {cartItems.map(item => (
                        <div key={item.id} className="p-4 border-b border-gray-200 flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-16 w-16 object-cover rounded"
                          />
                          <div className="ml-4 flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <div className="text-sm text-gray-500">
                                ${(item.discountPrice ?? item.price).toFixed(2)} × {item.quantity}
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  -
                                </button>
                                <span className="mx-2 text-gray-700">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-4 text-red-500 hover:text-red-700"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex justify-between mb-4">
                        <span className="text-sm font-medium text-gray-700">Subtotal</span>
                        <span className="text-sm font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                      </div>
                      <button
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Filters and Sort Options */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    activeCategory === category.id
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-100 text-gray-800 text-sm rounded-md border-none py-1 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm h-96 animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-10 bg-gray-300 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <img
                      className="h-48 w-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    {product.discountPrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-gray-900 font-medium">{product.name}</h3>
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="mt-2 flex items-center">
                      <span className="text-xs text-gray-500">{product.rating} ({product.reviewsCount} reviews)</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <FaTags className="mr-1" size={10} />
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        {product.discountPrice ? (
                          <div>
                            <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
                            <span className="ml-1 text-indigo-600 font-bold">${product.discountPrice.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-indigo-600 font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => product.inStock && addToCart(product)}
                        disabled={!product.inStock}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          product.inStock
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try selecting a different category or check back later for new products.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setActiveCategory('all')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View All Products
                </button>
              </div>
            </div>
          )
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopPage;