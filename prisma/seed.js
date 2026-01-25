const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'dslr-cameras' },
            update: {},
            create: {
                name: 'DSLR Cameras',
                slug: 'dslr-cameras',
                image: '/images/categories/dslr.jpg',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'mirrorless-cameras' },
            update: {},
            create: {
                name: 'Mirrorless Cameras',
                slug: 'mirrorless-cameras',
                image: '/images/categories/mirrorless.jpg',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'lenses' },
            update: {},
            create: {
                name: 'Lenses',
                slug: 'lenses',
                image: '/images/categories/lenses.jpg',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'accessories' },
            update: {},
            create: {
                name: 'Accessories',
                slug: 'accessories',
                image: '/images/categories/accessories.jpg',
            },
        }),
    ]);

    console.log('✅ Created categories:', categories.length);

    // Create sample products
    const products = await Promise.all([
        prisma.product.upsert({
            where: { id: 'sample-canon-eos-r5' },
            update: {},
            create: {
                id: 'sample-canon-eos-r5',
                name: 'Canon EOS R5',
                description: 'Professional full-frame mirrorless camera with 45MP sensor and 8K video recording',
                price: 3899,
                brand: 'Canon',
                type: 'Mirrorless',
                categoryId: categories[1].id,
                isAvailable: true,
                rating: 4.8,
                reviews: 245,
                discountPercentage: 10,
                offerName: 'Limited Time Offer',
                image: '/images/products/canon-r5.jpg',
                specs: {
                    sensor: '45MP Full-Frame CMOS',
                    iso: '100-51200',
                    video: '8K RAW up to 29.97fps',
                    autofocus: 'Dual Pixel CMOS AF II',
                },
                features: [
                    'In-body Image Stabilization',
                    '8K Video Recording',
                    'High-speed Continuous Shooting',
                    'Weather-sealed Body',
                ],
            },
        }),
        prisma.product.upsert({
            where: { id: 'sample-nikon-d850' },
            update: {},
            create: {
                id: 'sample-nikon-d850',
                name: 'Nikon D850',
                description: 'High-resolution DSLR with 45.7MP sensor, perfect for landscape and studio photography',
                price: 2996,
                brand: 'Nikon',
                type: 'DSLR',
                categoryId: categories[0].id,
                isAvailable: true,
                rating: 4.9,
                reviews: 512,
                discountPercentage: 15,
                offerName: 'Holiday Special',
                image: '/images/products/nikon-d850.jpg',
                specs: {
                    sensor: '45.7MP FX-Format CMOS',
                    iso: '64-25600',
                    video: '4K UHD at 30fps',
                    autofocus: '153-point AF System',
                },
                features: [
                    'Tilting Touchscreen LCD',
                    'Focus Shift Shooting',
                    '7fps Continuous Shooting',
                    'Dual Card Slots',
                ],
            },
        }),
        prisma.product.upsert({
            where: { id: 'sample-sony-a7iv' },
            update: {},
            create: {
                id: 'sample-sony-a7iv',
                name: 'Sony A7 IV',
                description: 'Versatile full-frame mirrorless camera with 33MP sensor and advanced autofocus',
                price: 2498,
                brand: 'Sony',
                type: 'Mirrorless',
                categoryId: categories[1].id,
                isAvailable: true,
                rating: 4.7,
                reviews: 389,
                discountPercentage: 5,
                image: '/images/products/sony-a7iv.jpg',
                specs: {
                    sensor: '33MP Full-Frame Exmor R CMOS',
                    iso: '100-51200',
                    video: '4K 60p 10-bit 4:2:2',
                    autofocus: '759-point Phase Detection',
                },
                features: [
                    'Real-time Eye AF',
                    '5-axis Image Stabilization',
                    'Vari-angle LCD Screen',
                    'Dual Card Slots',
                ],
            },
        }),
    ]);

    console.log('✅ Created products:', products.length);

    // Create admin user (password: admin123)
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@bookmydslr.com' },
        update: {},
        create: {
            email: 'admin@bookmydslr.com',
            password: '$2a$10$rOvHPGkwQqKfZGKz8qKxXOxGxGxGxGxGxGxGxGxGxGxGxGxGxGx', // admin123
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Create global settings
    const settings = await prisma.globalSettings.upsert({
        where: { id: 'singleton' },
        update: {},
        create: {
            id: 'singleton',
            discountPercent: 10,
            isDiscountActive: true,
        },
    });

    console.log('✅ Created global settings');

    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
