const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixImages() {
    console.log('Starting image path cleanup...');

    // 1. Clear "updated soon" placeholders
    const resultSoon = await prisma.product.updateMany({
        where: {
            image: {
                contains: 'images-will-be-updated-soon.txt'
            }
        },
        data: {
            image: null
        }
    });
    console.log(`Cleared ${resultSoon.count} invalid image placeholders.`);

    // 2. Clear other common invalid placeholders if any
    const resultEmpty = await prisma.product.updateMany({
        where: {
            OR: [
                { image: '' },
                { image: 'undefined' }
            ]
        },
        data: {
            image: null
        }
    });
    console.log(`Cleared ${resultEmpty.count} empty/undefined image paths.`);

    console.log('Cleanup complete.');
    process.exit(0);
}

fixImages().catch(err => {
    console.error(err);
    process.exit(1);
});
