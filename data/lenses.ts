// Add a comment at the top of the file to guide users on how to add new lenses
// ===== LENS DATA =====
// You can add new lenses by adding objects to this array
// Make sure to include all required properties and maintain the same structure
//
// HOW TO ADD A NEW LENS:
// 1. Copy an existing lens object
// 2. Update the id to be unique (increment from the last id)
// 3. Update all the properties with your new lens's details
// 4. Make sure to include all required fields (name, description, price, etc.)
// 5. Add the new object to the lenses array below
export const lenses = [
  { id: 1, name: "10-22mm f/3.5 USM EF-S Wide Angle Lens", brand: "Canon", price: 400, description: "Wide angle lens", type: "Wide Angle", image: "/CanonLens/10-22mmf3.5usmEF-SWideAnglelense.png", available: true },
  { id: 2, name: "Canon 50mm EF 1.4 USM Lens", brand: "Canon", price: 500, description: "Prime lens", type: "Prime", image: "/CanonLens/Canon50mmef1.4usmlense.png", available: true },
  { id: 3, name: "Tamron 70-200mm f/2.8 Lens (Canon Mount)", brand: "Tamron", price: 1000, description: "Telephoto zoom lens", type: "Zoom", image: "/CanonLens/Tamron 70-200mm 2.8 lense (Canon Mount).png", available: true },
  { id: 4, name: "Canon 10-18mm EF-S Mount Wide Angle Lens", brand: "Canon", price: 400, description: "Wide angle lens", type: "Wide Angle", image: "/CanonLens/USM LENS.png", available: true },
  { id: 5, name: "Canon 24mm f/2.8 EF-S Prime Lens", brand: "Canon", price: 300, description: "Prime lens", type: "Prime", image: "/CanonLens/Canon 24mm f2.8mm EF S prime lense.png", available: true },
  { id: 6, name: "Canon 24-105 IS I", brand: "Canon", price: 500, description: "Zoom lens", type: "Zoom", image: "/CanonLens/canonIS1.png", available: true },
  { id: 7, name: "Canon 50mm f/1.8 Lens", brand: "Canon", price: 300, description: "Prime lens", type: "Prime", image: "/CanonLens/Canon 50mm 1.8 lense.png", available: true },
  { id: 8, name: "Canon EF-EOS M Mount Adapter", brand: "Canon", price: 200, description: "Mount adapter", type: "Adapter", image: "/CanonLens/Canon EF-EOS M Mount ADAPTER.png", available: true },
  { id: 9, name: "Canon EF 16-35mm f/4L IS USM Lens", brand: "Canon", price: 700, description: "Wide angle lens", type: "Wide Angle", image: "/CanonLens/canonRF-24-105mm.png", available: true },
  { id: 10, name: "Canon 55-250mm Lens", brand: "Canon", price: 300, description: "Telephoto zoom lens", type: "Zoom", image: "/CanonLens/Canon 55-250mm Lense.png", available: true },
  { id: 11, name: "Canon EF 55-250mm STM", brand: "Canon", price: 400, description: "Telephoto zoom lens", type: "Zoom", image: "/CanonLens/Canon Ef 55-250mm STM.png", available: true },
  { id: 12, name: "Canon EF 24-105 IS II", brand: "Canon", price: 700, description: "Zoom lens", type: "Zoom", image: "/CanonLens/Canon EF 24-105 is2.png", available: true },
  { id: 13, name: "Canon 75-300mm Lens", brand: "Canon", price: 350, description: "Telephoto zoom lens", type: "Zoom", image: "/CanonLens/canon 75-300mm lense.png", available: true },
  { id: 14, name: "Canon EF 85mm f/1.8 USM Medium Telephoto Lens for Canon SLR Cameras", brand: "Canon", price: 700, description: "Medium telephoto lens", type: "Telephoto", image: "/CanonLens/canontelephotoEF85MM.png", available: true },
  { id: 15, name: "Canon EF 70-200mm f/4L USM Telephoto Zoom Lens for Canon SLR Camera", brand: "Canon", price: 1000, description: "Telephoto zoom lens", type: "Zoom", image: "/CanonLens/Canon EF 70-200mm.png", available: true },
  { id: 16, name: "Tamron SP 24-70mm f/2.8 Di VC USD [Canon EF Mount]", brand: "Tamron", price: 500, description: "Standard zoom lens", type: "Zoom", image: "/CanonLens/Tamron SP 24-70mm.png", available: true }
];
