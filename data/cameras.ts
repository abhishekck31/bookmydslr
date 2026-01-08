// ===== CAMERA DATA =====
// You can add new cameras by adding objects to this array
// Make sure to include all required properties and maintain the same structure
//
// HOW TO ADD A NEW CAMERA:
// 1. Copy an existing camera object
// 2. Update the id to be unique (increment from the last id)
// 3. Update all the properties with your new camera's details
// 4. Make sure to include all required fields (name, description, price, etc.)
// 5. Add the new object to the cameras array below

export interface Camera {
  id: number
  name: string
  brand: string
  price: number
  category: string
  description: string
  type: string
  image: string
  available: boolean
  gallery?: string[]
  rating?: number
  reviews?: number
  specs?: Record<string, string>
  features?: string[]
}

export const cameras: Camera[] = [
  // --- Nikon ---
  { id: 1, name: "Nikon D5200", brand: "Nikon", price: 600, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Nikon/nikonD5200.png", available: true },
  { id: 2, name: "Nikon D7200", brand: "Nikon", price: 1000, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Nikon/nikonD7200.png", available: true },
  { id: 3, name: "Nikon D3300 with Dual Lens", brand: "Nikon", price: 500, category: "DSLR Camera", description: "DSLR camera with dual lens kit", type: "DSLR", image: "/Nikon/nikonD3300.png", available: true },
  { id: 4, name: "Nikon D5300 with Dual Lens", brand: "Nikon", price: 700, category: "DSLR Camera", description: "DSLR camera with dual lens kit", type: "DSLR", image: "/Nikon/nikonD5300.png", available: true },
  { id: 5, name: "Nikon D3400", brand: "Nikon", price: 500, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Nikon/nikonD3400.png", available: true },
  { id: 6, name: "Nikon D3200", brand: "Nikon", price: 400, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Nikon/nikonD3200.png", available: true },
  { id: 7, name: "Nikon D610", brand: "Nikon", price: 1200, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Nikon/nikonD610.png", available: true },
  { id: 8, name: "Nikon D5600", brand: "Nikon", price: 900, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Nikon/nikonD5600.png", available: true },
  { id: 9, name: "Nikon Z50", brand: "Nikon", price: 800, category: "Mirrorless Camera", description: "Mirrorless camera", type: "Mirrorless", image: "/Nikon/nikonz50.png", available: true },
  { id: 10, name: "Nikon Z50 Mirrorless with ZDX 16-50mm f/3.5-6.3 VR Lens", brand: "Nikon", price: 800, category: "Mirrorless Camera", description: "Mirrorless camera with kit lens", type: "Mirrorless", image: "/Nikon/nikonz50mirrorless.png", available: true },

  // --- Canon ---
  { id: 11, name: "Canon 550D with Dual Lens", brand: "Canon", price: 500, category: "DSLR Camera", description: "DSLR camera with dual lens kit", type: "DSLR", image: "/Canon/CANON550D.png", available: true },
  { id: 12, name: "Canon 700D Mark II", brand: "Canon", price: 1200, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANON700DMARK2.png", available: true },
  { id: 13, name: "Canon 1200D", brand: "Canon", price: 500, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANON1200D.png", available: true },
  { id: 14, name: "Canon 80D", brand: "Canon", price: 1200, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANON80D.png", available: true },
  { id: 15, name: "Canon 750D with Dual Lens", brand: "Canon", price: 800, category: "DSLR Camera", description: "DSLR camera with dual lens kit", type: "DSLR", image: "/Canon/CANON750D.png", available: true },
  { id: 16, name: "Canon EOS 70D", brand: "Canon", price: 800, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANONEOS70D.png", available: true },
  { id: 17, name: "Canon EOS 70D", brand: "Canon", price: 1000, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANONEOS70D.png", available: true },
  { id: 18, name: "Canon 200D Mark II", brand: "Canon", price: 900, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANON200DMARK2.png", available: true },
  { id: 19, name: "Canon 700D with Dual Lens", brand: "Canon", price: 500, category: "DSLR Camera", description: "DSLR camera with dual lens kit", type: "DSLR", image: "/Canon/CANON700D.png", available: true },
  { id: 20, name: "Canon 1500D", brand: "Canon", price: 600, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANON1500D.png", available: true },
  { id: 21, name: "Canon EOS 200D", brand: "Canon", price: 800, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANONEOS200D.png", available: true },
  { id: 22, name: "Canon 1300D", brand: "Canon", price: 500, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANON1300D.png", available: true },
  { id: 23, name: "Canon EOS 60D", brand: "Canon", price: 700, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANONEOS60D.png", available: true },
  { id: 24, name: "Canon EOS 1100D", brand: "Canon", price: 500, category: "DSLR Camera", description: "DSLR camera", type: "DSLR", image: "/Canon/CANONEOS1100D.png", available: true },
  { id: 25, name: "Canon EOS M200", brand: "Canon", price: 600, category: "Mirrorless Camera", description: "Mirrorless camera", type: "Mirrorless", image: "/Canon/CANONEOSM200.png", available: true },
  { id: 26, name: "Canon EOS 5D Mark IV", brand: "Canon", price: 1500, category: "DSLR Camera", description: "Full-frame DSLR", type: "DSLR", image: "/Canon/CANONEOS5DMARK2.png", available: true },
  { id: 27, name: "Canon EOS M50 Mark II", brand: "Canon", price: 800, category: "Mirrorless Camera", description: "Mirrorless camera", type: "Mirrorless", image: "/Canon/CANONEOSM50MARK2.png", available: true },
  { id: 28, name: "Canon 5D Mark III", brand: "Canon", price: 1000, category: "DSLR Camera", description: "Full-frame DSLR", type: "DSLR", image: "/Canon/CANON5DMARK3.png", available: true },
  { id: 29, name: "Canon EOS R10 24.2MP RF-S18-150mm f/4.5-6.3 IS STM Mirrorless Camera", brand: "Canon", price: 1500, category: "Mirrorless Camera", description: "Mirrorless camera", type: "Mirrorless", image: "/Canon/CANONEOSR10.png", available: true },

  // --- Sony ---
  { id: 30, name: "Sony A7M3 (Full Frame 24.2MP) Body", brand: "Sony", price: 1800, category: "Mirrorless Camera", description: "Full-frame mirrorless", type: "Mirrorless", image: "/Sony/sonya7m3.png", available: true },
  { id: 31, name: "Sony Alpha ILCE-7M4K Full Frame Hybrid Camera 33MP", brand: "Sony", price: 2200, category: "Mirrorless Camera", description: "Full-frame mirrorless", type: "Mirrorless", image: "/Sony/sonyalphaILCE.png", available: true },
  { id: 32, name: "Sony A7R Mark III Body Only", brand: "Sony", price: 1800, category: "Mirrorless Camera", description: "Full-frame mirrorless", type: "Mirrorless", image: "/Sony/sonya7r.png", available: true },
  { id: 33, name: "Sony Alpha ILCE-7RM4 Full Frame Mirrorless Camera Body Featuring Eye AF and 4K Movie Recording (Black)", brand: "Sony", price: 2500, category: "Mirrorless Camera", description: "Full-frame mirrorless", type: "Mirrorless", image: "/Sony/sonyalpha2.png", available: true },

  // --- Panasonic ---
  { id: 34, name: "Panasonic MDH3 Camcorder", brand: "Panasonic", price: 1500, category: "Camcorder", description: "Camcorder", type: "Camcorder", image: "/Panasonic/MDH3.jpg", available: true },
]
