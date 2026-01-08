import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const featured = searchParams.get('featured') // Just an example filter

        const where: any = {
            available: true
        }

        if (category && category !== 'All') {
            // Find category ID by name/slug or relate directly?
            // Schema relates by ID. Front-end currently sends names like "DSLR Camera".
            // We can search by category.name
            where.category = {
                name: category
            }
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                images: true,
                category: true
            },
            orderBy: {
                price: 'asc'
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}
