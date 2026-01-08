import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Fetching latest products...')
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: { category: true }
        })
        console.log(JSON.stringify(products, null, 2))
    } catch (error) {
        console.error("Error fetching products:", error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
