import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    let body: any;
    let productId: string = '';
    
    try {
        const resolvedParams = await params;
        productId = resolvedParams.id;
        body = await request.json()

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name: body.name,
                description: body.description,
                price: body.price ? parseFloat(body.price) : undefined,
                categoryId: body.categoryId,
                brand: body.brand,
                type: body.type,
                image: body.image,
                isAvailable: body.isAvailable,
                specs: body.specs ? (typeof body.specs === 'string' ? JSON.parse(body.specs) : body.specs) : undefined,
                features: body.features ? (Array.isArray(body.features) ? body.features : (typeof body.features === 'string' ? JSON.parse(body.features) : [body.features])) : undefined,
                discountPercentage: body.discountPercentage ? parseFloat(body.discountPercentage) : 0,
                offerName: body.offerName || null
            }
        })

        return NextResponse.json({ success: true, product })
    } catch (error: any) {
        console.error("Admin Update Product Error:", error)
        console.error("Error details:", {
            message: error?.message || 'Unknown error',
            stack: error?.stack || 'No stack trace',
            body: body,
            id: productId
        })
        return NextResponse.json({ 
            error: 'Failed to update product', 
            details: error?.message || 'Unknown error' 
        }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    let productId: string = '';
    
    try {
        const resolvedParams = await params;
        productId = resolvedParams.id;
        await prisma.product.delete({
            where: { id: productId }
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Admin Delete Product Error:", error)
        console.error("Error details:", {
            message: error?.message || 'Unknown error',
            stack: error?.stack || 'No stack trace',
            id: productId
        })
        return NextResponse.json({ 
            error: 'Failed to delete product', 
            details: error?.message || 'Unknown error' 
        }, { status: 500 })
    }
}
