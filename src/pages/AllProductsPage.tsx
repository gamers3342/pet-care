import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const AllProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPetType, setSelectedPetType] = useState('All');
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const { addToCart } = useCart();

  const categories = [
    { name: 'All', emoji: '🛍️' },
    { name: 'Food & Nutrition', emoji: '🍖' },
    { name: 'Feeding Accessories', emoji: '🥣' },
    { name: 'Litter & Waste', emoji: '🧹' },
    { name: 'Beds & Housing', emoji: '🏠' },
    { name: 'Travel & Outdoor', emoji: '🎒' },
    { name: 'Clothing & Accessories', emoji: '👕' },
    { name: 'Grooming & Hygiene', emoji: '🛁' },
    { name: 'Health & Safety', emoji: '💊' },
    { name: 'Toys & Entertainment', emoji: '🧸' },
    { name: 'Training & Care', emoji: '🎯' }
  ];

  const petTypes = ['All', 'Dogs', 'Cats'];

  const allProducts = [
    // Food & Nutrition - Dogs
    { id: 1, name: 'Premium Dry Dog Food', category: 'Food & Nutrition', petType: 'Dogs', price: 2499, originalPrice: 2999, rating: 4.8, reviews: 234, image: 'https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Bestseller', emoji: '🍖' },
    { id: 2, name: 'Wet Dog Food Cans', category: 'Food & Nutrition', petType: 'Dogs', price: 899, rating: 4.7, reviews: 156, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🥫' },
    { id: 3, name: 'Puppy Formula Milk', category: 'Food & Nutrition', petType: 'Dogs', price: 649, rating: 4.9, reviews: 89, image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'New', emoji: '🍼' },
    { id: 4, name: 'Dog Treats & Biscuits', category: 'Food & Nutrition', petType: 'Dogs', price: 399, rating: 4.6, reviews: 178, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🦴' },
    { id: 5, name: 'Dental Chews for Dogs', category: 'Food & Nutrition', petType: 'Dogs', price: 549, rating: 4.8, reviews: 123, image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Popular', emoji: '🦷' },

    // Food & Nutrition - Cats
    { id: 6, name: 'Premium Dry Cat Food', category: 'Food & Nutrition', petType: 'Cats', price: 1899, originalPrice: 2299, rating: 4.9, reviews: 267, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Bestseller', emoji: '🍖' },
    { id: 7, name: 'Wet Cat Food Pouches', category: 'Food & Nutrition', petType: 'Cats', price: 799, rating: 4.7, reviews: 145, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🥫' },
    { id: 8, name: 'Kitten Milk Replacer', category: 'Food & Nutrition', petType: 'Cats', price: 599, rating: 4.8, reviews: 98, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🍼' },
    { id: 9, name: 'Crunchy Cat Treats', category: 'Food & Nutrition', petType: 'Cats', price: 349, rating: 4.6, reviews: 156, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🐟' },
    { id: 10, name: 'Catnip Treats', category: 'Food & Nutrition', petType: 'Cats', price: 299, rating: 4.9, reviews: 234, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Popular', emoji: '🌿' },

    // Feeding Accessories - Dogs
    { id: 11, name: 'Stainless Steel Dog Bowls', category: 'Feeding Accessories', petType: 'Dogs', price: 799, rating: 4.7, reviews: 189, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🥣' },
    { id: 12, name: 'Non-Slip Dog Bowls', category: 'Feeding Accessories', petType: 'Dogs', price: 649, rating: 4.6, reviews: 134, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🥣' },
    { id: 13, name: 'Automatic Water Dispenser', category: 'Feeding Accessories', petType: 'Dogs', price: 1899, rating: 4.8, reviews: 167, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Smart', emoji: '💧' },
    { id: 14, name: 'Slow-Feeder Dog Bowl', category: 'Feeding Accessories', petType: 'Dogs', price: 899, rating: 4.9, reviews: 145, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🐌' },
    { id: 15, name: 'Dog Food Storage Container', category: 'Feeding Accessories', petType: 'Dogs', price: 1299, rating: 4.5, reviews: 98, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '📦' },

    // Feeding Accessories - Cats
    { id: 16, name: 'Ceramic Cat Bowls', category: 'Feeding Accessories', petType: 'Cats', price: 699, rating: 4.8, reviews: 178, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🥣' },
    { id: 17, name: 'Cat Water Fountain', category: 'Feeding Accessories', petType: 'Cats', price: 1599, rating: 4.9, reviews: 234, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Popular', emoji: '⛲' },
    { id: 18, name: 'Cat Slow-Feeder Bowl', category: 'Feeding Accessories', petType: 'Cats', price: 749, rating: 4.7, reviews: 123, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🐌' },

    // Litter & Waste - Dogs
    { id: 19, name: 'Biodegradable Poop Bags', category: 'Litter & Waste', petType: 'Dogs', price: 299, rating: 4.6, reviews: 267, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Eco', emoji: '🌱' },
    { id: 20, name: 'Poop Bag Dispenser', category: 'Litter & Waste', petType: 'Dogs', price: 199, rating: 4.5, reviews: 145, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🎒' },
    { id: 21, name: 'Dog Waste Scoop', category: 'Litter & Waste', petType: 'Dogs', price: 449, rating: 4.7, reviews: 89, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🥄' },

    // Litter & Waste - Cats
    { id: 22, name: 'Basic Cat Litter Box', category: 'Litter & Waste', petType: 'Cats', price: 899, rating: 4.6, reviews: 198, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '📦' },
    { id: 23, name: 'Self-Cleaning Litter Box', category: 'Litter & Waste', petType: 'Cats', price: 8999, originalPrice: 10999, rating: 4.9, reviews: 156, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Smart', emoji: '🤖' },
    { id: 24, name: 'Clumping Cat Litter', category: 'Litter & Waste', petType: 'Cats', price: 649, rating: 4.7, reviews: 234, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🏔️' },
    { id: 25, name: 'Silica Gel Cat Litter', category: 'Litter & Waste', petType: 'Cats', price: 799, rating: 4.8, reviews: 167, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '💎' },

    // Toys & Entertainment - Dogs
    { id: 26, name: 'Interactive Smart Dog Toy', category: 'Toys & Entertainment', petType: 'Dogs', price: 2099, rating: 4.9, reviews: 156, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'New', emoji: '🧸' },
    { id: 27, name: 'Rope Tug Toy', category: 'Toys & Entertainment', petType: 'Dogs', price: 399, rating: 4.5, reviews: 123, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🪢' },
    { id: 28, name: 'Ball Thrower Set', category: 'Toys & Entertainment', petType: 'Dogs', price: 899, rating: 4.7, reviews: 189, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '⚾' },

    // Toys & Entertainment - Cats
    { id: 29, name: 'Feather Wand Toy', category: 'Toys & Entertainment', petType: 'Cats', price: 299, rating: 4.8, reviews: 234, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🪶' },
    { id: 30, name: 'Laser Pointer Toy', category: 'Toys & Entertainment', petType: 'Cats', price: 199, rating: 4.6, reviews: 167, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🔴' },
    { id: 31, name: 'Interactive Puzzle Feeder', category: 'Toys & Entertainment', petType: 'Cats', price: 1299, rating: 4.9, reviews: 145, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Smart', emoji: '🧩' },
    { id: 32, name: 'Cat Tunnel', category: 'Toys & Entertainment', petType: 'Cats', price: 799, rating: 4.7, reviews: 123, image: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🕳️' },

    // Travel & Outdoor - Dogs
    { id: 33, name: 'Luxury Dog Collar & Leash Set', category: 'Travel & Outdoor', petType: 'Dogs', price: 2799, rating: 4.7, reviews: 189, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🎀' },
    { id: 34, name: 'Retractable Dog Leash', category: 'Travel & Outdoor', petType: 'Dogs', price: 1299, rating: 4.6, reviews: 156, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🔗' },
    { id: 35, name: 'Padded Dog Harness', category: 'Travel & Outdoor', petType: 'Dogs', price: 1599, rating: 4.8, reviews: 234, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🦺' },
    { id: 36, name: 'Dog Travel Carrier', category: 'Travel & Outdoor', petType: 'Dogs', price: 3499, rating: 4.7, reviews: 123, image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🎒' },

    // Travel & Outdoor - Cats
    { id: 37, name: 'Cat Harness & Leash', category: 'Travel & Outdoor', petType: 'Cats', price: 899, rating: 4.5, reviews: 89, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🎀' },
    { id: 38, name: 'Cat Carrier Bag', category: 'Travel & Outdoor', petType: 'Cats', price: 1899, rating: 4.8, reviews: 167, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '👜' },
    { id: 39, name: 'Cat Backpack Carrier', category: 'Travel & Outdoor', petType: 'Cats', price: 2999, rating: 4.9, reviews: 145, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Trendy', emoji: '🎒' },

    // Health & Safety - Dogs
    { id: 40, name: 'Natural Vitamin Supplements', category: 'Health & Safety', petType: 'Dogs', price: 1599, originalPrice: 2099, rating: 4.6, reviews: 92, image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Sale', emoji: '💊' },
    { id: 41, name: 'Hip & Joint Care Tablets', category: 'Health & Safety', petType: 'Dogs', price: 2299, rating: 4.8, reviews: 156, image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🦴' },
    { id: 42, name: 'Dog First-Aid Kit', category: 'Health & Safety', petType: 'Dogs', price: 1199, rating: 4.7, reviews: 134, image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🏥' },

    // Health & Safety - Cats
    { id: 43, name: 'Cat Vitamins & Supplements', category: 'Health & Safety', petType: 'Cats', price: 1299, rating: 4.7, reviews: 123, image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '💊' },
    { id: 44, name: 'Hairball Remedy Paste', category: 'Health & Safety', petType: 'Cats', price: 599, rating: 4.8, reviews: 189, image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🌿' },
    { id: 45, name: 'Cat Calming Spray', category: 'Health & Safety', petType: 'Cats', price: 799, rating: 4.6, reviews: 145, image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '😌' },

    // Grooming & Hygiene - Dogs
    { id: 46, name: 'Anti-Flea Dog Shampoo', category: 'Grooming & Hygiene', petType: 'Dogs', price: 699, rating: 4.8, reviews: 234, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🧴' },
    { id: 47, name: 'Dog Brush for Long Hair', category: 'Grooming & Hygiene', petType: 'Dogs', price: 899, rating: 4.7, reviews: 167, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🪮' },
    { id: 48, name: 'Dog Nail Clippers', category: 'Grooming & Hygiene', petType: 'Dogs', price: 399, rating: 4.6, reviews: 145, image: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '✂️' },

    // Grooming & Hygiene - Cats
    { id: 49, name: 'Gentle Cat Shampoo', category: 'Grooming & Hygiene', petType: 'Cats', price: 599, rating: 4.8, reviews: 178, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: '', emoji: '🧴' },
    { id: 50, name: 'Cat Deshedding Tool', category: 'Grooming & Hygiene', petType: 'Cats', price: 1199, rating: 4.9, reviews: 234, image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=400', badge: 'Popular', emoji: '🪮' }
  ];

  const filteredProducts = allProducts.filter(product => {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-peach-25 to-lavender-25 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-mint-100 to-peach-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/shop" className="flex items-center space-x-2 text-mint-600 hover:text-mint-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Shop</span>
            </Link>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-poppins">
            Complete Pet Supply{' '}
            <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-xl text-gray-600 font-quicksand">
            Browse our complete collection of {allProducts.length}+ premium pet products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-mint-100">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
              />
            </div>

            {/* Pet Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
              <select 
                value={selectedPetType}
                onChange={(e) => setSelectedPetType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
              >
                {petTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-mint-400"
              >
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.emoji} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-mint-100">
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {product.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                )}
                
                <button 
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                >
                  <Heart className={`w-4 h-4 transition-colors ${
                    likedProducts.includes(product.id) ? 'text-coral-500 fill-current' : 'text-gray-600'
                  }`} />
                </button>

                <div className="absolute bottom-3 left-3 text-2xl opacity-60">
                  {product.emoji}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xl font-bold gradient-text">₹{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">₹{product.originalPrice}</div>
                      )}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-green-600 font-semibold">
                        Save ₹{(product.originalPrice - product.price)}!
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-mint-400 to-peach-400 text-white rounded-xl hover:from-mint-500 hover:to-peach-500 transition-all duration-300 hover:scale-105 text-sm font-semibold"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Overview */}
        <div className="bg-gradient-to-br from-mint-100 to-peach-100 rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 font-poppins">
            Shop by Category
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(1).map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-white shadow-lg border-2 border-mint-400'
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="text-4xl mb-3">{category.emoji}</div>
                <div className="font-semibold text-gray-800 text-sm">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;