import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const settings = await prisma.globalSettings.findUnique({
            where: { id: 'singleton' }
        })

        if (!settings) {
            // Initialize if it doesn't exist
            const newSettings = await prisma.globalSettings.create({
                data: {
                    id: 'singleton',
                    discountPercent: 0,
                    isDiscountActive: false,
                }
            })
            return NextResponse.json(newSettings)
        }

        return NextResponse.json(settings)
    } catch (error) {
        console.error("GET Settings Error:", error)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const settings = await prisma.globalSettings.upsert({
            where: { id: 'singleton' },
            update: {
                discountPercent: parseFloat(body.discountPercent),
                isDiscountActive: body.isDiscountActive,
            },
            create: {
                id: 'singleton',
                discountPercent: parseFloat(body.discountPercent),
                isDiscountActive: body.isDiscountActive,
            }
        })

        return NextResponse.json({ success: true, settings })
    } catch (error) {
        console.error("POST Settings Error:", error)
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }
}
