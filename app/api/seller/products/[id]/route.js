import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().min(0).optional(),
  compareAtPrice: z.number().min(0).optional(),
  category: z.string().optional(),
  images: z.array(z.string()).min(1).optional(),
  stock: z.number().min(0).optional(),
  specifications: z.record(z.string()).optional(),
  isActive: z.boolean().optional(),
});

// GET - Get single product
export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'seller' && session.user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const product = await Product.findOne({
      _id: params.id,
      seller: session.user.id,
    }).populate('category', 'name slug');

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'seller' && session.user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = productSchema.parse(body);

    await connectDB();

    // Find product and verify ownership
    const product = await Product.findOne({
      _id: params.id,
      seller: session.user.id,
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      );
    }

    // Update slug if name changed
    if (validatedData.name && validatedData.name !== product.name) {
      const slug = validatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      validatedData.slug = slug;
    }

    // Update product
    Object.assign(product, validatedData);
    await product.save();
    await product.populate('category', 'name slug');

    return NextResponse.json(
      {
        message: 'Product updated successfully',
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'seller' && session.user.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Find and delete product
    const product = await Product.findOneAndDelete({
      _id: params.id,
      seller: session.user.id,
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
