'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, CreditCard, Heart, Package } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
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

  // Sample user data (would come from database)
  const userData = {
    name: session.user?.name || 'User',
    email: session.user?.email || 'user@example.com',
    phone: '+1 (555) 123-4567',
    role: session.user?.role || 'customer',
    avatar: session.user?.image || null,
    addresses: [
      {
        id: '1',
        type: 'Home',
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true,
      },
    ],
    stats: {
      orders: 12,
      wishlist: 5,
      reviews: 8,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt={userData.name} className="w-24 h-24 rounded-full" />
                  ) : (
                    <User className="h-12 w-12 text-blue-600" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-600 capitalize">{userData.role}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.orders}</p>
                  <p className="text-xs text-gray-600">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.wishlist}</p>
                  <p className="text-xs text-gray-600">Wishlist</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{userData.stats.reviews}</p>
                  <p className="text-xs text-gray-600">Reviews</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Package className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Link>
                {userData.role === 'seller' && (
                  <Link
                    href="/seller/dashboard"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <Package className="h-5 w-5" />
                    Seller Dashboard
                  </Link>
                )}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Edit</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">{userData.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{userData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Saved Addresses</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Add New</button>
              </div>
              <div className="space-y-4">
                {userData.addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="font-semibold">{address.type}</span>
                        {address.isDefault && (
                          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">
                      {address.street}, {address.city}, {address.state} {address.zipCode}
                      <br />
                      {address.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Payment Methods</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">Add New</button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No payment methods saved</p>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-semibold">
                  Add your first payment method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
