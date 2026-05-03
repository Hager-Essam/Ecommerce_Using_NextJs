'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

// Sample orders data
const sampleOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.97,
    items: [
      {
        id: '1',
        name: 'Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
        quantity: 2,
        price: 99.99,
      },
      {
        id: '2',
        name: 'Smart Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
        quantity: 1,
        price: 199.99,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 149.98,
    trackingNumber: 'TRK123456789',
    items: [
      {
        id: '3',
        name: 'Laptop Backpack',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
        quantity: 2,
        price: 49.99,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-25',
    status: 'processing',
    total: 79.99,
    items: [
      {
        id: '4',
        name: 'Coffee Maker',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200&h=200&fit=crop',
        quantity: 1,
        price: 79.99,
      },
    ],
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    label: 'Pending',
  },
  processing: {
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    label: 'Processing',
  },
  shipped: {
    icon: Truck,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    label: 'Shipped',
  },
  delivered: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-100',
    label: 'Delivered',
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-100',
    label: 'Cancelled',
  },
};

export default function OrdersPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>

        {sampleOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {sampleOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Order Number</p>
                          <p className="font-semibold">{order.orderNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-semibold">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="font-semibold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`${statusConfig[order.status].bg} ${statusConfig[order.status].color} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2`}
                        >
                          <StatusIcon className="h-4 w-4" />
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                    </div>
                    {order.trackingNumber && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Tracking: <span className="font-semibold">{order.trackingNumber}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        View Details
                      </Link>
                      {order.status === 'delivered' && (
                        <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          Write Review
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                          Track Order
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
