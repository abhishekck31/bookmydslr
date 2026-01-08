import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, phone, city, details, source } = body

        if (!name || !phone || !city) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                phone,
                city,
                details: typeof details === 'object' ? JSON.stringify(details) : details,
                source: source || 'Website',
            }
        })

        return NextResponse.json({ success: true, leadId: lead.id })
    } catch (error) {
        console.error("Lead API Error:", error)
        return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }
}
