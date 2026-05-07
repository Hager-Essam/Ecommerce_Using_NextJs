import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=400&fit=crop',
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and fitness gear',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
  },
  {
    name: 'Books',
    slug: 'books',
    description: 'Wide selection of books and magazines',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop',
  },
  {
    name: 'Toys & Games',
    slug: 'toys-games',
    description: 'Fun toys and games for all ages',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop',
  },
  {
    name: 'Beauty & Health',
    slug: 'beauty-health',
    description: 'Beauty products and health essentials',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    description: 'Car accessories and automotive parts',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
  },
];

export async function POST(req) {
  try {
    await connectDB();

    // Check if categories already exist
    const existingCount = await Category.countDocuments();
    
    if (existingCount > 0) {
      return NextResponse.json(
        {
          message: 'Categories already exist',
          count: existingCount,
        },
        { status: 200 }
      );
    }

    // Create categories
    const createdCategories = await Category.insertMany(categories);

    return NextResponse.json(
      {
        message: 'Categories seeded successfully',
        count: createdCategories.length,
        categories: createdCategories,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed categories error:', error);
    return NextResponse.json(
      {
        error: 'Failed to seed categories',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const count = await Category.countDocuments();
    const categories = await Category.find().select('name slug description');

    return NextResponse.json(
      {
        message: count > 0 ? 'Categories exist' : 'No categories found. Use POST to seed.',
        count,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get categories',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
