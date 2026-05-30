const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProducts() {
    try {
        const cameras = await prisma.product.findMany({
            where: {
                id: {
                    startsWith: 'cam-'
                }
            },
            take: 5,
            select: {
                id: true,
                name: true,
                price: true,
                isAvailable: true
            }
        });

        console.log('Camera products:', JSON.stringify(cameras, null, 2));

        const total = await prisma.product.count();
        console.log('\nTotal products in DB:', total);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

checkProducts();
