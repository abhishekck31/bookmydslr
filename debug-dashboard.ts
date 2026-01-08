
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Debugging Dashboard Queries ---')
  const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms))

  try {
    await prisma.$connect()
    console.log('1. Database connected.')

    // Test Categories
    console.log('2. Fetching Categories...')
    const catQuery = prisma.category.findMany({ orderBy: { name: 'asc' } })
    const categories = await Promise.race([catQuery, timeout(5000)])
    console.log(`   Found ${categories.length} categories.`)

    // Test Products
    console.log('3. Fetching Products...')
    const prodQuery = prisma.product.findMany({ 
        orderBy: { updatedAt: 'desc' },
        include: { category: true, availability: true }
    })
    const products = await Promise.race([prodQuery, timeout(5000)])
    console.log(`   Found ${products.length} products.`)

    // Test Settings (Already verified, but keeping for completeness)
    console.log('4. Fetching Settings...')
    const setQuery = prisma.globalSettings.findUnique({ where: { id: 'singleton' } })
    const settings = await Promise.race([setQuery, timeout(5000)])
    console.log('   Settings found:', !!settings)

  } catch(e) {
    console.error('CRITICAL DATABASE ERROR:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
