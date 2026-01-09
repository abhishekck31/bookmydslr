import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Simple check for now - Middleware handles mostly, but double check usually good
// But for "Simple UI", we rely on Middleware.

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        return NextResponse.json(products)
    } catch (error) {
        console.error("Admin Get Products Error:", error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log("Admin Product Create Body:", body)

        // Validate basics
        if (!body.name || !body.price || !body.categoryId) {
            console.log("Validation Failed:", { name: body.name, price: body.price, categoryId: body.categoryId })
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Handle relational connects? 
        // Body should send categoryId.

        const product = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description || '',
                price: parseFloat(body.price),
                categoryId: body.categoryId,
                brand: body.brand,
                type: body.type,
                image: body.image || '', // Required by schema basically, using placeholder or passed URL
                specs: body.specs ? (typeof body.specs === 'string' ? JSON.parse(body.specs) : body.specs) : null,
                features: body.features ? (Array.isArray(body.features) ? body.features : (typeof body.features === 'string' ? JSON.parse(body.features) : [body.features])) : null,
                discountPercentage: body.discountPercentage ? parseFloat(body.discountPercentage) : 0,
                offerName: body.offerName || null
            }
            // Note: ProductImage creation might need a separate call or nested create if supported
        })

        return NextResponse.json({ success: true, product })
    } catch (error) {
        console.error("Admin Create Product Error:", error)
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }
}
