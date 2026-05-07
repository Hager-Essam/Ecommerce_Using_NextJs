'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Loader, Database } from 'lucide-react';
import Link from 'next/link';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const seedCategories = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/seed/categories', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to seed categories');
      }
    } catch (err) {
      setError('An error occurred while seeding categories');
    } finally {
      setLoading(false);
    }
  };

  const checkCategories = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/seed/categories');
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to check categories');
      }
    } catch (err) {
      setError('An error occurred while checking categories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Database className="mx-auto h-16 w-16 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Database Setup
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Initialize your database with categories
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          {/* Success Message */}
          {result && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {result.message}
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Categories: {result.count}</p>
                    {result.categories && result.categories.length > 0 && (
                      <ul className="mt-2 list-disc list-inside">
                        {result.categories.map((cat) => (
                          <li key={cat._id || cat.slug}>{cat.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              What does this do?
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Creates 8 product categories</li>
              <li>• Electronics, Fashion, Home & Garden, etc.</li>
              <li>• Required for adding products</li>
              <li>• Safe to run multiple times</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={checkCategories}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Database className="h-5 w-5" />
                  Check Categories
                </>
              )}
            </button>

            <button
              onClick={seedCategories}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Seeding...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Seed Categories
                </>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="pt-4 border-t space-y-2">
            <Link
              href="/seller/products/new"
              className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              → Go to Add Product
            </Link>
            <Link
              href="/seller/dashboard"
              className="block text-center text-sm text-gray-600 hover:text-gray-700"
            >
              → Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Quick Setup Instructions
          </h3>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Click "Check Categories" to see if categories exist</li>
            <li>If no categories found, click "Seed Categories"</li>
            <li>Wait for success message</li>
            <li>Go to "Add Product" to create your first product</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
