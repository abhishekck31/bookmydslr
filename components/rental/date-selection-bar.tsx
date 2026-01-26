"use client"

import { Calendar } from "lucide-react"

export function DateSelectionBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 transform bg-amber-400 p-4 transition-transform duration-300">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                        <span className="font-bold text-black">N</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-black text-lg leading-tight">Select Dates to see Pricing</h3>
                        <p className="text-xs text-black/80 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Check availability for real-time rates
                        </p>
                    </div>
                </div>

                {/* Placeholder for Date Picker Trigger */}
                <button className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg w-full sm:w-auto">
                    Select Dates
                </button>
            </div>
        </div>
    )
}
