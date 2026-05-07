import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

// Validation schema with preprocessing
const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  compareAtPrice: z.preprocess(
    (val) => (val === null || val === undefined || val === '' ? undefined : val),
    z.number().positive('Compare at price must be positive').optional()
  ),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string().url('Each image must be a valid URL')).min(1, 'At least one image is required'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  specifications: z.record(z.string()).optional().default({}),
});

// GET - Get all products for seller
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'seller' && session.user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized. Only sellers can access this.' },
        { status: 401 }
      );
    }

    await connectDB();

    // Get seller's products
    const products = await Product.find({ seller: session.user.id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'seller' && session.user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized. Only sellers can create products.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    console.log('Received product data:', JSON.stringify(body, null, 2));
    
    // Validate input
    const validatedData = productSchema.parse(body);
    
    console.log('Validated product data:', JSON.stringify(validatedData, null, 2));

    await connectDB();

    // Check if category exists
    const category = await Category.findById(validatedData.category);
    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      // Add random suffix to make it unique
      const uniqueSlug = `${slug}-${Date.now()}`;
      validatedData.slug = uniqueSlug;
    } else {
      validatedData.slug = slug;
    }

    // Create product
    const product = await Product.create({
      ...validatedData,
      seller: session.user.id,
    });

    await product.populate('category', 'name slug');

    return NextResponse.json(
      {
        message: 'Product created successfully',
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format validation errors for better readability
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: formattedErrors,
          message: formattedErrors.map(e => `${e.field}: ${e.message}`).join(', ')
        },
        { status: 400 }
      );
    }

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', message: error.message },
      { status: 500 }
    );
  }
}
