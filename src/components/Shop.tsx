import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search, Heart, Sparkles, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const { addToCart } = useCart();

  const categories = [
    { name: 'All', emoji: '🛍️' },
    { name: 'Food', emoji: '🍖' },
    { name: 'Accessories', emoji: '🎀' },
    { name: 'Medicines', emoji: '💊' },
    { name: 'Toys', emoji: '🧸' },
    { name: 'Grooming', emoji: '✂️' }
  ];

  const petTypes = ['All', 'Dogs', 'Cats'];

  const products = [
    {
      id: 1,
      name: 'Premium Organic Dog Food',
      category: 'Food',
      petType: 'Dogs',
      price: 4199,
      originalPrice: 4999,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: 'Bestseller',
      badgeColor: 'from-peach-400 to-coral-400',
      emoji: '🍖'
    },
    {
      id: 2,
      name: 'Interactive Smart Cat Toy',
      category: 'Toys',
      petType: 'Cats',
      price: 2099,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: 'New',
      badgeColor: 'from-mint-400 to-mint-500',
      emoji: '🧸'
    },
    {
      id: 3,
      name: 'Luxury Dog Collar & Leash Set',
      category: 'Accessories',
      petType: 'Dogs',
      price: 2799,
      rating: 4.7,
      reviews: 189,
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: '',
      badgeColor: '',
      emoji: '🎀'
    },
    {
      id: 4,
      name: 'Natural Vitamin Supplements',
      category: 'Medicines',
      petType: 'Dogs',
      price: 1599,
      originalPrice: 2099,
      rating: 4.6,
      reviews: 92,
      image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: 'Sale',
      badgeColor: 'from-coral-400 to-coral-500',
      emoji: '💊'
    },
    {
      id: 5,
      name: 'Designer Cat Food Bowl Set',
      category: 'Accessories',
      petType: 'Cats',
      price: 1349,
      rating: 4.8,
      reviews: 167,
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: 'Popular',
      badgeColor: 'from-lavender-400 to-lavender-500',
      emoji: '🥣'
    },
    {
      id: 6,
      name: 'Organic Rope Chew Toy',
      category: 'Toys',
      petType: 'Dogs',
      price: 1099,
      rating: 4.5,
      reviews: 78,
      image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: '',
      badgeColor: '',
      emoji: '🪢'
    },
    {
      id: 7,
      name: 'Cat Grooming Brush',
      category: 'Grooming',
      petType: 'Cats',
      price: 899,
      rating: 4.7,
      reviews: 145,
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: '',
      badgeColor: '',
      emoji: '🪮'
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const petTypeMatch = selectedPetType === 'All' || product.petType === selectedPetType;
    return categoryMatch && petTypeMatch;
  });

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      petType: product.petType
    });
  };

  return (
    <section id="shop" className="py-24 bg-gradient-to-br from-white via-peach-25 to-lavender-25 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 text-8xl text-peach-200 floating-animation">🛍️</div>
        <div className="absolute bottom-20 right-20 text-6xl text-mint-200 floating-animation" style={{ animationDelay: '3s' }}>🎁</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-peach-100 to-coral-100 rounded-full border border-peach-200 mb-6">
            <Gift className="w-5 h-5 text-peach-600" />
            <span className="text-peach-700 font-semibold">Premium Pet Products</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 font-poppins">
            Pet Supply{' '}
            <span className="gradient-text">Wonderland</span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-quicksand">
            Quality products for your beloved pets, from premium organic food to fun toys and essential medicines. 
            Everything curated with love! 💕
          </p>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <div className="bg-gradient-to-r from-mint-50 to-peach-50 rounded-3xl p-10 mb-16 shadow-lg border border-mint-100">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for amazing products..."
                className="w-full pl-12 pr-6 py-4 border-2 border-mint-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-mint-200 focus:border-mint-400 transition-all duration-300 font-quicksand text-lg shadow-sm"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-peach-400" />
            </div>

            {/* Pet Type Filter */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-700">Pet Type:</span>
              </div>
              <div className="flex space-x-3">
                {petTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedPetType(type)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                      selectedPetType === type
                        ? 'bg-gradient-to-r from-lavender-400 to-coral-400 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-lavender-50 border border-lavender-200 shadow-sm'
                    }`}
                  >
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-700">Categories:</span>
              </div>
              <div className="flex space-x-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-mint-400 to-peach-400 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-mint-50 border border-mint-200 shadow-sm'
                    }`}
                  >
                    <span className="text-lg">{category.emoji}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-mint-100 relative">
              {/* Product Image */}
              <div className="relative h-72">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-4 left-4 px-4 py-2 bg-gradient-to-r ${product.badgeColor} text-white rounded-full text-sm font-bold shadow-lg`}>
                    {product.badge}
                  </div>
                )}
                
                {/* Like Button */}
                <button 
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Heart className={`w-6 h-6 transition-colors ${
                    likedProducts.includes(product.id) ? 'text-coral-500 fill-current' : 'text-gray-600 hover:text-coral-500'
                  }`} />
                </button>

                {/* Emoji Decoration */}
                <div className="absolute bottom-4 left-4 text-4xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 group-hover:scale-110">
                  {product.emoji}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="p-8 bg-gradient-to-br from-white to-mint-25">
                <h3 className="text-xl font-bold text-gray-800 mb-3 font-poppins group-hover:text-gray-900 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-all duration-300 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current group-hover:scale-110' 
                            : 'text-gray-300'
                        }`}
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">({product.reviews} reviews)</span>
                </div>
                
                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl font-bold gradient-text font-poppins">₹{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-lg text-gray-400 line-through">₹{product.originalPrice}</div>
                      )}
                    </div>
                    {product.originalPrice && (
                      <div className="text-sm text-green-600 font-semibold">
                        Save ₹{(product.originalPrice - product.price)}!
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group/btn flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-2xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-6 p-10 bg-gradient-to-br from-mint-100 via-white to-peach-100 rounded-3xl shadow-xl border border-mint-200">
            <div className="flex items-center space-x-4">
              <Sparkles className="w-8 h-8 text-peach-500 bounce-gentle" />
              <span className="text-2xl font-bold text-gray-800 font-poppins">Discover More Amazing Products</span>
              <Heart className="w-8 h-8 text-coral-500 pulse-soft" />
            </div>
            
            <Link to="/all-products" className="group flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-peach-400 to-coral-400 text-white rounded-2xl hover:from-peach-500 hover:to-coral-500 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl font-bold text-xl">
              <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>View All Products</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;