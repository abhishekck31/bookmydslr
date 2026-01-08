import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
    try {
        console.log('Checking globalSettings property...');
        if ('globalSettings' in prisma) {
            console.log('SUCCESS: globalSettings exists on prisma client');

            console.log('Attempting to fetch globalSettings from DB...');
            // @ts-ignore
            const settings = await prisma.globalSettings.findUnique({
                where: { id: 'singleton' }
            });
            console.log('Fetch result:', settings);
        } else {
            console.log('FAILURE: globalSettings does NOT exist on prisma client');
            console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
        }
    } catch (err: any) {
        if (err.code === 'P2021') {
            console.error('ERROR: Table "GlobalSettings" does not exist in the database.');
        } else {
            console.error('Error during DB access:', err.message || err);
        }
    } finally {
        await prisma.$disconnect();
        process.exit(0);
    }
}

test();
