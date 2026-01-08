
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Debugging Settings ---')
  try {
    console.log('1. Attempting to connection...')
    await prisma.$connect()
    console.log('2. Connected. Fetching settings...')
    
    // Timer to catch hangs
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Query timed out after 5s")), 5000)
    )

    const query = prisma.globalSettings.findUnique({
        where: { id: 'singleton' }
    })

    const result = await Promise.race([query, timeout])
    console.log('3. Result:', result)

    if (!result) {
        console.log('4. Settings null. Attempting create...')
        const newSettings = await prisma.globalSettings.create({
            data: {
                id: 'singleton',
                discountPercent: 0,
                isDiscountActive: false,
            }
        })
        console.log('5. Created:', newSettings)
    }

  } catch(e) {
    console.error('ERROR:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
