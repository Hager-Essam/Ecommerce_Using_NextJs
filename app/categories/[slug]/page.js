import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';

// Sample products by category
const getProductsByCategory = (slug) => {
  const allProducts = {
    electronics: [
      {
        id: '1',
        name: 'Wireless Headphones',
        slug: 'wireless-headphones',
        price: 99.99,
        compareAtPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.5,
        reviews: 128,
        inStock: true,
      },
      {
        id: '2',
        name: 'Smart Watch',
        slug: 'smart-watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.8,
        reviews: 256,
        inStock: true,
      },
    ],
    fashion: [
      {
        id: '3',
        name: 'Laptop Backpack',
        slug: 'laptop-backpack',
        price: 49.99,
        compareAtPrice: 79.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.3,
        reviews: 89,
        inStock: true,
      },
      {
        id: '5',
        name: 'Running Shoes',
        slug: 'running-shoes',
        price: 89.99,
        compareAtPrice: 120.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.7,
        reviews: 312,
        inStock: true,
      },
    ],
    'home-garden': [
      {
        id: '4',
        name: 'Coffee Maker',
        slug: 'coffee-maker',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
        category: 'Home & Garden',
        rating: 4.6,
        reviews: 145,
        inStock: true,
      },
      {
        id: '6',
        name: 'Desk Lamp',
        slug: 'desk-lamp',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        category: 'Home & Garden',
        rating: 4.4,
        reviews: 67,
        inStock: true,
      },
    ],
    sports: [
      {
        id: '5',
        name: 'Running Shoes',
        slug: 'running-shoes',
        price: 89.99,
        compareAtPrice: 120.00,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Sports',
        rating: 4.7,
        reviews: 312,
        inStock: true,
      },
    ],
  };

  return allProducts[slug] || [];
};

const getCategoryName = (slug) => {
  const names = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    'home-garden': 'Home & Garden',
    sports: 'Sports',
    books: 'Books',
    'toys-games': 'Toys & Games',
  };
  return names[slug] || 'Category';
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const products = getProductsByCategory(slug);
  const categoryName = getCategoryName(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search in this category..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">No products found in this category yet.</p>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{products.length} products found</p>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Best Rating</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {product.compareAtPrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </div>
                    {product.inStock ? (
                      <p className="text-sm text-green-600 mt-2">In Stock</p>
                    ) : (
                      <p className="text-sm text-red-600 mt-2">Out of Stock</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
