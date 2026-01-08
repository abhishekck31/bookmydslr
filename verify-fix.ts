import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function test() {
    try {
        const settings = await prisma.globalSettings.findUnique({ where: { id: 'singleton' } });
        console.log('---VERIFICATION_START---');
        console.log('STATUS: SUCCESS');
        console.log('TABLE_EXISTS: YES');
        console.log('RECORD_FOUND:', settings ? 'YES' : 'NO');
        console.log('---VERIFICATION_END---');
    } catch (err: any) {
        console.log('---VERIFICATION_START---');
        console.log('STATUS: FAILURE');
        console.log('ERROR:', err.message);
        console.log('---VERIFICATION_END---');
    } finally {
        await prisma.$disconnect();
        process.exit(0);
    }
}
test();
