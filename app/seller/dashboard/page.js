'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, ShoppingCart, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  if (session.user?.role !== 'seller' && session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be a seller to access this page.</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Sample seller stats
  const stats = {
    totalProducts: 24,
    totalSales: 15420.50,
    totalOrders: 156,
    revenue: 12336.40,
  };

  const recentOrders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-156',
      customer: 'John Doe',
      product: 'Wireless Headphones',
      amount: 99.99,
      status: 'pending',
      date: '2024-01-25',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-155',
      customer: 'Jane Smith',
      product: 'Smart Watch',
      amount: 199.99,
      status: 'shipped',
      date: '2024-01-24',
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-154',
      customer: 'Bob Johnson',
      product: 'Laptop Backpack',
      amount: 49.99,
      status: 'delivered',
      date: '2024-01-23',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back, {session.user?.name}!</p>
          </div>
          <Link
            href="/seller/products/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+12%</span>
            </div>
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+8%</span>
            </div>
            <p className="text-gray-600 text-sm">Total Sales</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalSales.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+15%</span>
            </div>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">+20%</span>
            </div>
            <p className="text-gray-600 text-sm">Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link href="/seller/orders" className="text-blue-600 hover:text-blue-700 font-semibold">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.amount.toFixed(2)}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-600'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/seller/products/new"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-semibold">Add Product</p>
              </Link>
              <Link
                href="/seller/products"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-semibold">Manage Products</p>
              </Link>
              <Link
                href="/seller/orders"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <ShoppingCart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-semibold">View Orders</p>
              </Link>
              <Link
                href="/seller/earnings"
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <DollarSign className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="font-semibold">Earnings</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
