
import { PrismaClient } from '@prisma/client'
import { cameras } from '../data/cameras'
import { lenses } from '../data/lenses'
import { accessories } from '../data/accessories'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Slugify helper
const slugify = (text: string) =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')

async function main() {
    console.log('Start seeding ...')

    // Clear existing data to avoid duplicates
    await prisma.product.deleteMany({})
    console.log('Cleared existing products.')

    // 1. Create Admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.admin.upsert({
        where: { email: 'admin@bookmydslr.com' },
        update: {},
        create: {
            email: 'admin@bookmydslr.com',
            password: hashedPassword,
        },
    })
    console.log(`Created admin: ${admin.email}`)

    // 2. Define Categories
    const categoryNames = [
        "DSLR Camera",
        "Mirrorless Camera",
        "Camera Lens",
        "Action Camera",
        "Gimbal",
        "Action Camera Accessory",
        "Gimbal Accessory"
    ];

    const categoryMap = new Map<string, string>(); // Name -> ID

    for (const name of categoryNames) {
        const slug = slugify(name);
        const cat = await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name, slug },
        })
        categoryMap.set(name, cat.id);
    }
    console.log('Categories seeded.');

    const getCategoryId = (catName: string) => {
        return categoryMap.get(catName) || categoryMap.get("DSLR Camera")!;
    }

    // 3. Seed Cameras
    for (const camera of cameras) {
        const categoryId = getCategoryId(camera.category);

        // For Json type, pass the object directly!
        // No JSON.stringify needed for Json fields.
        const specs = camera.specs || null
        const features = camera.features || null

        try {
            const product = await prisma.product.upsert({
                where: { id: `cam-${camera.id}` },
                update: {},
                create: {
                    id: `cam-${camera.id}`,
                    name: camera.name,
                    description: camera.description,
                    price: camera.price,
                    image: camera.image,
                    categoryId: categoryId,
                    brand: camera.brand,
                    type: camera.type,
                    isAvailable: camera.available,
                    rating: camera.rating ?? null,
                    reviews: camera.reviews ?? 0,
                    specs: specs ?? null,
                    features: features ?? null,
                }
            })

            await prisma.productImage.create({
                data: { url: camera.image, productId: product.id }
            })

            if (camera.gallery && camera.gallery.length > 0) {
                for (const img of camera.gallery) {
                    await prisma.productImage.create({
                        data: { url: img, productId: product.id }
                    })
                }
            }
        } catch (e) {
            console.error(`Failed to seed camera: ${camera.name}`, e)
        }
    }

    // 4. Seed Lenses
    for (const lens of lenses) {
        const categoryId = getCategoryId(lens.category);
        const specs = lens.specs || null
        const features = lens.features || null

        try {
            const product = await prisma.product.upsert({
                where: { id: `lens-${lens.id}` },
                update: {},
                create: {
                    id: `lens-${lens.id}`,
                    name: lens.name,
                    description: lens.description,
                    price: lens.price,
                    image: lens.image,
                    categoryId: categoryId,
                    brand: lens.brand,
                    type: lens.type,
                    isAvailable: lens.available,
                    rating: lens.rating ?? null,
                    reviews: lens.reviews ?? 0,
                    specs: specs ?? null,
                    features: features ?? null,
                }
            })

            await prisma.productImage.create({
                data: { url: lens.image, productId: product.id }
            })
        } catch (e) {
            console.error(`Failed to seed lens: ${lens.name}`, e)
        }
    }

    // 5. Seed Accessories
    for (const acc of accessories) {
        const categoryId = getCategoryId(acc.category);
        // acc.specs might be undefined in type, handle carefully
        const specs = (acc as any).specs || null
        const features = (acc as any).features || null

        try {
            const product = await prisma.product.upsert({
                where: { id: acc.id },
                update: {},
                create: {
                    id: acc.id,
                    name: acc.name,
                    description: acc.description,
                    price: acc.price,
                    image: acc.image,
                    categoryId: categoryId,
                    brand: acc.brand,
                    type: acc.type,
                    isAvailable: acc.available,
                    rating: acc.rating ?? null,
                    reviews: acc.reviews ?? 0,
                    specs: specs ?? null,
                    features: features ?? null,
                }
            })

            await prisma.productImage.create({
                data: { url: acc.image, productId: product.id }
            })
        } catch (e) {
            console.error(`Failed to seed accessory: ${acc.name}`, e)
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
