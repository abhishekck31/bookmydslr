// Add a comment at the top of the file to guide users on how to add new accessories
// ===== ACCESSORIES DATA =====
// You can add new accessories by adding objects to this array
// Make sure to include all required properties and maintain the same structure
//
// HOW TO ADD A NEW ACCESSORY:
// 1. Copy an existing accessory object
// 2. Update the id to be unique (increment from the last id or use a descriptive string like "acc-011")
// 3. Update all the properties with your new accessory's details
// 4. Make sure to include all required fields (name, description, price, etc.)
// 5. Add the new object to the accessories array below

export const accessories = [
  // --- Action Cameras & Accessories ---
  { id: "ac-1", name: "GoPro Mic Adapter 3.5mm", category: "Action Camera Accessory", type: "Mic Adapter", price: 150, description: "Mic adapter for GoPro", image: "/mic&rec/gopromicadapter.png", available: true },
  { id: "ac-2", name: "GoPro 9 Black", category: "Action Camera", type: "Action Camera", price: 600, description: "Action camera", image: "/ActionCamera/gopro9black.png", available: true },
  { id: "ac-3", name: "Max Pro Lens for GoPro 9 and 10", category: "Action Camera Accessory", type: "Lens", price: 200, description: "Lens for GoPro", image: "/ActionCamera/maxprolensforgopro9.png", available: true },
  { id: "ac-4", name: "INSTA 360 ONE X3 72MP", category: "Action Camera", type: "Action Camera", price: 900, description: "360 action camera", image: "/ActionCamera/insta360onex3.png", available: true },
  { id: "ac-5", name: "GoPro Hero 10 Black", category: "Action Camera", type: "Action Camera", price: 700, description: "Action camera", image: "/ActionCamera/goprohero10.png", available: true },
  { id: "ac-6", name: "INSTA 360 ONE R 4K", category: "Action Camera", type: "Action Camera", price: 500, description: "360 action camera", image: "/ActionCamera/insta360oneR4K.png", available: true },
  { id: "ac-7", name: "GoPro Hero 11 Black", category: "Action Camera", type: "Action Camera", price: 800, description: "Action camera with 5.3K video and 27MP photos", image: "/ActionCamera/gopro11.png", available: true },
  { id: "ac-8", name: "GoPro Hero 12 Black", category: "Action Camera", type: "Action Camera", price: 900, description: "Action camera with 5.3K video and 27MP photos", image: "/ActionCamera/gopro12.png", available: true },
 

  // --- Gimbals ---
  { id: "g-1", name: "DJI Ronin S (Gimbal)", category: "Gimbal", type: "Gimbal", price: 1500, description: "3-axis gimbal", image: "/Gimbal/DJIRoninS.png", available: true },
  { id: "g-2", name: "Zhiyun Crane 2", category: "Gimbal", type: "Gimbal", price: 800, description: "3-axis gimbal", image: "/Gimbal/ZHIYUNCRANE2.png", available: true },
  { id: "g-3", name: "DJI Mobile Gimbal 2", category: "Gimbal", type: "Gimbal", price: 250, description: "Mobile gimbal", image: "/Gimbal/DJIMOBILEGIMBAL.png", available: true },
  { id: "g-4", name: "DJI RS3 Gimbal", category: "Gimbal", type: "Gimbal", price: 1500, description: "3-axis gimbal", image: "/Gimbal/DJIRS3GIMBAL.png", available: true },
  { id: "g-5", name: "DJI Gimbal OM 6", category: "Gimbal", type: "Gimbal", price: 350, description: "Mobile gimbal", image: "/Gimbal/DJIGIMBALOM6.png", available: true },
  { id: "g-6", name: "DJI RSC (3 Axis Gimbal) (For Mirrorless Camera)", category: "Gimbal", type: "Gimbal", price: 800, description: "3-axis gimbal for mirrorless", image: "/Gimbal/DJIRSC.png", available: true },
  { id: "g-7", name: "Horizontal to Vertical Mount Plate Kit", category: "Gimbal", type: "Gimbal Accessory", price: 100, description: "Mount plate kit", image: "/Gimbal/MOUNTPLATEKIT.png", available: true },
  { id: "g-8", name: "DJI Pocket 2 – Handheld 3-Axis Gimbal Stabilizer with 4K Camera, 1/1.7 CMOS, 64MP Phone", category: "Gimbal", type: "Action Camera", price: 500, description: "Handheld gimbal camera", image: "/ActionCamera/DJIpocket2.png", available: true },
  { id: "g-9", name: "DJI RSC2 Pro Combo", category: "Gimbal", type: "Gimbal", price: 1500, description: "Professional 3-axis gimbal with focus motor and carrying case", image: "/Gimbal/DJIRSC2PROCOMBO.png", available: true },
  { id: "g-10", name: "Zhiyun Crane 3S", category: "Gimbal", type: "Gimbal", price: 1500, description: "Professional 3-axis gimbal with high payload capacity", image: "/Gimbal/ZHIYUNCRANE3S.png", available: true },

  // --- Batteries ---
  { id: "b-1", name: "LP-E10 Battery", category: "Battery", type: "Battery", price: 150, description: "Canon battery", image: "/Battery/lpe10.png", available: true },
  { id: "b-2", name: "LP-E8 Battery", category: "Battery", type: "Battery", price: 150, description: "Canon battery", image: "/Battery/lpe8.png", available: true },
  { id: "b-3", name: "LP-E6 Battery", category: "Battery", type: "Battery", price: 200, description: "Canon battery", image: "/Battery/lpe6.png", available: true },
  { id: "b-4", name: "LP-E17 Battery", category: "Battery", type: "Battery", price: 150, description: "Canon battery", image: "/Battery/lpe17.png", available: true },
  { id: "b-5", name: "Sony NP-Z100 for Sony A7M4, A7M3, A7M2, A7S3", category: "Battery", type: "Battery", price: 200, description: "Sony battery", image: "/Battery/SonyNPZ100.png", available: true },
  { id: "b-6", name: "Battery Grip for Canon 700D, 600D, 650D, 550D", category: "Battery", type: "Battery Grip", price: 200, description: "Battery grip", image: "/Battery/BATTERYGRIPFORCANON.png", available: true },
  { id: "b-7", name: "Nikon EN-EL14a", category: "Battery", type: "Battery", price: 100, description: "Nikon battery", image: "/Battery/NikonEN-EL14A.png", available: true },

  // --- Tripods & Sliders ---
  { id: "ts-1", name: "Simpex E-Image Tripod Professional Tripod with Fluid Head U Pro 10KG", category: "Tripod", type: "Tripod", price: 700, description: "Professional tripod", image: "/Tripod/SIMPEXE-IMAGE.png", available: true },
  { id: "ts-2", name: "4FT Manual Slider with Video Fluid Head", category: "Tripod", type: "Slider", price: 300, description: "Manual slider", image: "/Tripod/4ftmanualslider.png", available: true },
  { id: "ts-3", name: "Simpex Monopod", category: "Tripod", type: "Monopod", price: 300, description: "Monopod", image: "/Tripod/simpexmonopog.png", available: true },
  { id: "ts-4", name: "Simpex VCT 888RM Tripod", category: "Tripod", type: "Tripod", price: 250, description: "Tripod", image: "/Tripod/simpexvct.png", available: true },
  { id: "ts-5", name: "Slider with Fluid Head 47 Inches/120 cm Carbon Fibre Ball Bearing Camera Track Slider", category: "Tripod", type: "Slider", price: 450, description: "Carbon fibre slider", image: "/Tripod/sliderwithfluidhead.png", available: true },
  { id: "ts-6", name: "Joby BWW Gorillapod", category: "Tripod", type: "Tripod", price: 300, description: "Flexible tripod with bendable legs", image: "/Tripod/jobybwwgorillapod.png", available: true },

  // --- Microphones & Recorders ---
  { id: "mr-1", name: "GoPro Mic Adapter 3.5mm", category: "Microphone", type: "Mic Adapter", price: 150, description: "Mic adapter", image: "/mic&rec/gopromicadapter.png", available: true },
  { id: "mr-2", name: "Rode Wireless Go Mic", category: "Microphone", type: "Microphone", price: 500, description: "Wireless mic", image: "/mic&rec/Rodewirelessgomic.png", available: true },
  { id: "mr-3", name: "Collar Mic for DSLR", category: "Microphone", type: "Microphone", price: 150, description: "Collar mic", image: "/mic&rec/collarmic.png", available: true },
  { id: "mr-4", name: "Wireless Microphone System for DSLR, Camcorder, Smartphone and Tablet DWM 101", category: "Microphone", type: "Microphone", price: 350, description: "Wireless mic system", image: "/mic&rec/wirelessmicfordslr.png", available: true },
  { id: "mr-5", name: "Rode Wireless Go II Dual Channel Wireless Microphone System, Black", category: "Microphone", type: "Microphone", price: 700, description: "Dual channel wireless mic", image: "/mic&rec/Rodewirelessgo2.png", available: true },
  { id: "mr-6", name: "Shotgun Mic/Unidirectional Interview Mic", category: "Microphone", type: "Microphone", price: 250, description: "Shotgun mic", image: "/mic&rec/shotgunmic.png", available: true },
  { id: "mr-7", name: "Boya BY-WM8 Pro-K2 UHF Omnidirectional Dual-Channel Wireless Microphone", category: "Microphone", type: "Microphone", price: 600, description: "Dual channel wireless mic", image: "/mic&rec/lapelmic.png", available: true },
  { id: "mr-8", name: "Rode VideoMic Directional Video Condenser Microphone with Mount", category: "Microphone", type: "Microphone", price: 400, description: "Directional mic", image: "/mic&rec/Rodevideomic.png", available: true },
  { id: "mr-9", name: "Zoom H6 6-Track Portable Recorder Stereo Microphones 4 XLR/TRS", category: "Microphone", type: "Recorder", price: 800, description: "Portable recorder", image: "/mic&rec/zoomh6-track.png", available: true },
  { id: "mr-10", name: "Rodelink Wireless Filmmaker Kit", category: "Microphone", type: "Microphone", price: 600, description: "Professional wireless microphone system for filmmaking", image: "/mic&rec/rodelinkwirelessfilmmakerkit.png", available: true },
  { id: "mr-11", name: "Mobile Mic", category: "Microphone", type: "Microphone", price: 200, description: "Compact mobile microphone for smartphones and cameras", image: "/mic&rec/mobilemic.png", available: true },
  { id: "mr-12", name: "Hollyland M2S", category: "Microphone", type: "Microphone", price: 500, description: "Wireless microphone system with dual channel transmission", image: "/mic&rec/hollylandm2s.png", available: true },
  // --- Flashlights & Lighting ---
  { id: "fl-1", name: "Hiffin Professional 200W LED", category: "Lighting", type: "LED Light", price: 450, description: "LED light", image: "/Flashlights/hiffinprof200wled.png", available: true },
  { id: "fl-2", name: "Digitek LED Video Lights", category: "Lighting", type: "LED Light", price: 350, description: "LED video light", image: "/Flashlights/digitekled.png", available: true },
  { id: "fl-3", name: "2 Elinchrom FRX-400 Pro Kit with Skyport Transmitter plus 2 Stands and Softbox", category: "Lighting", type: "Flash Kit", price: 1000, description: "Flash kit", image: "/Flashlights/2elinchromfrx-400.png", available: true },
  { id: "fl-4", name: "Harison Agros L10 DC Panel", category: "Lighting", type: "LED Panel", price: 1000, description: "LED panel", image: "/Flashlights/harisonagrosL10dc.png", available: true },
  { id: "fl-5", name: "Godox LC500R RGB LED Light", category: "Lighting", type: "LED Light", price: 500, description: "RGB LED light", image: "/Flashlights/godoxlc500.png", available: true },
  { id: "fl-6", name: "Simpex SLB 150W", category: "Lighting", type: "LED Light", price: 600, description: "LED light", image: "/Flashlights/simpexslb150.png", available: true },
  { id: "fl-7", name: "2 Video Lights with Umbrella", category: "Lighting", type: "LED Light", price: 500, description: "Video lights with umbrella", image: "/Flashlights/ledlightswithumbrella.png", available: true },
  { id: "fl-8", name: "Godox SL60II D", category: "Lighting", type: "LED Light", price: 600, description: "LED light", image: "/Flashlights/godoxad300.png", available: true },
  { id: "fl-9", name: "Godox AD300 Pro", category: "Lighting", type: "Flash", price: 1000, description: "Flash", image: "/Flashlights/godoxad300.png", available: true },
  { id: "fl-10", name: "2 Godox DS400II with Stand", category: "Lighting", type: "Flash", price: 1000, description: "Flash with stand", image: "/Flashlights/2godoxds400.png", available: true },
  { id: "fl-11", name: "Digitek (DEL-150W)", category: "Lighting", type: "LED Light", price: 600, description: "LED light", image: "/Flashlights/digitek-dell150w.png", available: true },
  { id: "fl-12", name: "Simpex Video Lights", category: "Lighting", type: "LED Light", price: 250, description: "Video light", image: "/Flashlights/simpexvideolights.png", available: true },
  { id: "fl-13", name: "Simpex SLB 150 Bi Bowens", category: "Lighting", type: "LED Light", price: 700, description: "Bi-color LED light", image: "/Flashlights/simpexslb.png", available: true },
  { id: "fl-14", name: "Godox AD600 Pro", category: "Lighting", type: "Flash", price: 1500, description: "Professional 600Ws battery-powered strobe with TTL and HSS", image: "/Flashlights/godoxad600pro.png", available: true },
  { id: "fl-15", name: "Godox V1 Pro for Sony", category: "Lighting", type: "Flash", price: 500, description: "Round head flash with TTL and HSS for Sony cameras", image: "/Flashlights/godoxv1prosony.png", available: true },
  { id: "fl-16", name: "Godox Softbox 120 cm", category: "Lighting", type: "Light Modifier", price: 400, description: "Large softbox for soft, diffused lighting", image: "/Flashlights/godoxsoftbox120cm.png", available: true },
  { id: "fl-17", name: "Digitek 30W RGB", category: "Lighting", type: "LED Light", price: 350, description: "RGB LED light with color control", image: "/Flashlights/digitek30wrgb.png", available: true },
  { id: "fl-18", name: "Simpex LC500R", category: "Lighting", type: "LED Light", price: 400, description: "RGB LED light with remote control", image: "/Flashlights/simpexlc500r.png", available: true },

  // --- Lens Adapters for Canon ---
  { id: "la-1", name: "Electronic Auto Focus Adapter for Canon EOS EF-S Lens to Sony E Mount Full-Frame", category: "Lens Adapter", type: "Lens Adapter", price: 300, description: "EF-S to Sony E mount adapter", image: "/Lensadapforcanon/forcanonef-s-lens.png", available: true },
  { id: "la-2", name: "Canon EF-EOS M Mount Adapter", category: "Lens Adapter", type: "Lens Adapter", price: 200, description: "EF to EOS M mount adapter", image: "/Lensadapforcanon/canonef-eosm-mount.png", available: true },
  { id: "la-3", name: "Viltrox EF-EOS M Electronic AF Auto Focus Lens Mount Adapter for Canon EF/EF-S Lens to Canon", category: "Lens Adapter", type: "Lens Adapter", price: 250, description: "EF/EF-S to Canon adapter", image: "/Lensadapforcanon/viltroxef-eosm-electronic.png", available: true },

  // --- Reflectors ---
  { id: "r-1", name: "42-inch 5-in-1 Collapsible Light Reflector", category: "Reflector", type: "Reflector", price: 100, description: "Collapsible reflector", image: "/Reflector/45-inch-5in-1.png", available: true },
  { id: "r-2", name: "5-in-1 Reflector (150×200 cm)", category: "Reflector", type: "Reflector", price: 250, description: "Large reflector", image: "/Reflector/150x200-5in 1.png", available: true },

  // --- Drones ---
  { id: "dr-1", name: "DJI Phantom 4", brand: "DJI", category: "Drone", type: "Drone", price: 6000, description: "Professional drone with 4K camera and advanced flight features", image: "/Drones/DJIPhantom4.png", available: true },
  { id: "dr-2", name: "DJI Mini 3 Pro", brand: "DJI", category: "Drone", type: "Drone", price: 4000, description: "Compact drone with 4K camera and obstacle avoidance", image: "/Drones/DJIMini3pro.png", available: true },
  { id: "dr-3", name: "DJI Mini 4 Pro", brand: "DJI", category: "Drone", type: "Drone", price: 5000, description: "Latest compact drone with advanced features and 4K camera", image: "/Drones/DJIMini4pro.png", available: true },
  { id: "dr-4", name: "DJI Mavic Mini", brand: "DJI", category: "Drone", type: "Drone", price: 1500, description: "Lightweight drone with 2.7K camera", image: "/Drones/DJIMavicmini.png", available: true },
  { id: "dr-5", name: "DJI Mini SE", brand: "DJI", category: "Drone", type: "Drone", price: 1500, description: "Affordable mini drone with HD camera", image: "/Drones/DJIMinise.png", available: true },

  // --- Sony Crop Mirrorless ---
  { id: "scm-1", name: "Sony E-Mount 55-210mm F4.5-6.3 OSS", brand: "Sony", category: "Sony Crop Mirrorless", type: "Lens", price: 400, description: "Telephoto zoom lens for Sony crop mirrorless cameras", image: "/Sonycropmirrorless/sonye-mount-210mm.png", available: true },
  { id: "scm-2", name: "SONY 50MM 1.8 CROP", brand: "Sony", category: "Sony Crop Mirrorless", type: "Lens", price: 400, description: "Prime lens for Sony crop mirrorless cameras", image: "/Sonycropmirrorless/sony50mm1.8mm.png", available: true },
  { id: "scm-3", name: "Sony Alpha ILCE-6100Y 24.2MP", brand: "Sony", category: "Sony Crop Mirrorless", type: "Camera", price: 1000, description: "Sony crop mirrorless camera", image: "/Sonycropmirrorless/sonlyalpha-ilce6100y.png", available: true },
  { id: "scm-4", name: "Sony Alpha 6000y with 16-50mm", brand: "Sony", category: "Sony Crop Mirrorless", type: "Camera", price: 800, description: "Sony crop mirrorless camera with kit lens", image: "/Sonycropmirrorless/sonyalpha6000y.png", available: true },

  // --- Canon Mirrorless Camera ---
  { id: "cmc-1", name: "Canon EF-EOS M Mount ADAPTER", brand: "Canon", category: "Canon Mirrorless Camera", type: "Adapter", price: 200, description: "EF to EOS M mount adapter", image: "/CanonLens/Canon EF-EOS M Mount ADAPTER.png", available: true },
  { id: "cmc-2", name: "Canon EOS M50 mark 2 with 15-45mm", brand: "Canon", category: "Canon Mirrorless Camera", type: "Camera", price: 800, description: "Canon mirrorless camera with kit lens", image: "/Canon/CANONEOSM50MARK2.png", available: true },
  { id: "cmc-3", name: "(BODY) Canon Digital Camera", brand: "Canon", category: "Canon Mirrorless Camera", type: "Camera Body", price: 2300, description: "Canon mirrorless camera body", image: "/Canon/CANONEOSM50MARK2.png", available: true },
  { id: "cmc-4", name: "Canon EOS R6 Mark II WITH RF 24-105mm", brand: "Canon", category: "Canon Mirrorless Camera", type: "Camera", price: 3000, description: "Canon mirrorless camera with RF 24-105mm lens", image: "/Canon/CANONEOS5DMARK2.png", available: true },
  { id: "cmc-5", name: "Canon EOS R10 24.2MP RF-S18-150mm f/4.5-6.3 IS STM Mirrorless Camera", brand: "Canon", category: "Canon Mirrorless Camera", type: "Camera", price: 1500, description: "Canon mirrorless camera", image: "/Canon/CANONEOSR10.png", available: true },
  { id: "cmc-6", name: "Canon EOS R7 32.5MP Mirrorless Camera", brand: "Canon", category: "Canon Mirrorless Camera", type: "Camera", price: 1800, description: "Canon mirrorless camera", image: "/Canon/CANONEOSM200.png", available: true },
  { id: "cmc-7", name: "(Body )CANON EOS RP MIRRORLESS CAMERA", brand: "Canon", category: "Canon Mirrorless Camera", type: "Camera Body", price: 1200, description: "Canon EOS RP mirrorless camera body", image: "/Canon/CANONEOSM200.png", available: true },

  // --- Canon RF Lenses ---
  { id: "rf-1", name: "Canon RF 24-105 mm F/4 l is", brand: "Canon", category: "Canon RF Lens", type: "Lens", price: 900, description: "Canon RF 24-105mm F4 L IS lens", image: "/Canonrflens/rf24-105mm-F4.png", available: true },
  { id: "rf-2", name: "Canon RF 50mm f/1.8 STM", brand: "Canon", category: "Canon RF Lens", type: "Lens", price: 400, description: "Canon RF 50mm f/1.8 STM lens", image: "/Canonrflens/rf50mm.png", available: true },
  { id: "rf-3", name: "Canon RF 600mm f/11 IS ST", brand: "Canon", category: "Canon RF Lens", type: "Lens", price: 800, description: "Canon RF 600mm f/11 IS ST lens", image: "/Canonrflens/rf600mm.png", available: true },
  { id: "rf-4", name: "Canon RF24-105mm F4-7.1 is", brand: "Canon", category: "Canon RF Lens", type: "Lens", price: 600, description: "Canon RF24-105mm F4-7.1 IS lens", image: "/Canonrflens/rf24-105mm.png", available: true },

  // --- Sony Camera & Lenses ---
  { id: "sony-1", name: "SONY FX3", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 3300, description: "Sony FX3 cinema camera", image: "/Sony/sonyalphaILCE.png", available: true },
  { id: "sony-2", name: "SONY FE 200-600MM 5.6-6.3", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 1800, description: "Sony FE 200-600mm f/5.6-6.3 G OSS lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-3", name: "Sony E Mount Fe 70-200Mm F2.8", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 1800, description: "Sony E Mount FE 70-200mm f/2.8 lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-4", name: "E-MOUNY 2x Teleconverter", brand: "Sony", category: "Sony Camera & Lenses", type: "Teleconverter", price: 700, description: "Sony E-Mount 2x Teleconverter", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-5", name: "Sigma 70-200Mm F/2.8 Dg Dn", brand: "Sigma", category: "Sony Camera & Lenses", type: "Lens", price: 1300, description: "Sigma 70-200mm f/2.8 DG DN lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-6", name: "Tamron 20mm f/2.8 Di III OSD", brand: "Tamron", category: "Sony Camera & Lenses", type: "Lens", price: 500, description: "Tamron 20mm f/2.8 Di III OSD lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-7", name: "Sigma 100-400mm f/5-6.3 DG", brand: "Sigma", category: "Sony Camera & Lenses", type: "Lens", price: 1400, description: "Sigma 100-400mm f/5-6.3 DG lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-8", name: "Sony Alpha 6000y with 16-50mm", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 800, description: "Sony Alpha 6000y camera with 16-50mm lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-9", name: "Sony E-Mount 55-210mm F4.5-6.3 OSS", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 400, description: "Sony E-Mount 55-210mm F4.5-6.3 OSS lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-10", name: "Sony Alpha ILCE-6100Y 24.2MP", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 1000, description: "Sony Alpha ILCE-6100Y 24.2MP camera", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-11", name: "Rokinon 35mm MF 1.5 cine lens", brand: "Rokinon", category: "Sony Camera & Lenses", type: "Lens", price: 500, description: "Rokinon 35mm MF 1.5 cine lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-12", name: "(E Mount) VILTROX 35mm 1.8", brand: "Viltrox", category: "Sony Camera & Lenses", type: "Lens", price: 500, description: "Viltrox 35mm 1.8 E Mount lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-13", name: "(E Mount) VILTROX 85mm 1.8", brand: "Viltrox", category: "Sony Camera & Lenses", type: "Lens", price: 600, description: "Viltrox 85mm 1.8 E Mount lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-14", name: "Sony E Mount FE 90 Mm F2.8", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 1000, description: "Sony E Mount FE 90mm F2.8 lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-15", name: "Sony α7R IV 35 mm Full-Frame", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 2500, description: "Sony α7R IV 35 mm Full-Frame camera", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-16", name: "Samyang AF 35mm F1.4 FE II", brand: "Samyang", category: "Sony Camera & Lenses", type: "Lens", price: 800, description: "Samyang AF 35mm F1.4 FE II lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-17", name: "Sony FE 85mm 1.8", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 700, description: "Sony FE 85mm 1.8 lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-18", name: "E mount SAMYANG 50MM 1.4", brand: "Samyang", category: "Sony Camera & Lenses", type: "Lens", price: 800, description: "Samyang 50mm 1.4 E mount lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-19", name: "E MOUNT SAMYANG 24MM 1.4", brand: "Samyang", category: "Sony Camera & Lenses", type: "Lens", price: 800, description: "Samyang 24mm 1.4 E mount lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-20", name: "E MOUNT SAMYANG 85MM 1.4", brand: "Samyang", category: "Sony Camera & Lenses", type: "Lens", price: 800, description: "Samyang 85mm 1.4 E mount lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-21", name: "Sigma 24-70Mm F/2.8 Dg Dn", brand: "Sigma", category: "Sony Camera & Lenses", type: "Lens", price: 1000, description: "Sigma 24-70mm f/2.8 DG DN lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-22", name: "Sigma 85mm F1.4 DG DN Art", brand: "Sigma", category: "Sony Camera & Lenses", type: "Lens", price: 1000, description: "Sigma 85mm f/1.4 DG DN Art lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-23", name: "Sony Alpha ILCE-7M4K Full-Frame", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 2200, description: "Sony Alpha ILCE-7M4K Full-Frame camera", image: "/Sony/sonyalphaILCE.png", available: true },
  { id: "sony-24", name: "Sony E Mount FE 70–200 mm", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 1000, description: "Sony E Mount FE 70–200 mm lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-25", name: "Sigma 70-200Mm F/2.8 Dg Dn", brand: "Sigma", category: "Sony Camera & Lenses", type: "Lens", price: 1300, description: "Sigma 70-200mm f/2.8 DG DN lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-26", name: "Sony A7R Mark III Body Only", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 1800, description: "Sony A7R Mark III Body Only", image: "/Sony/sonya7r.png", available: true },
  { id: "sony-27", name: "Sony E Mount Fe 100-400Mm", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 2000, description: "Sony E Mount FE 100-400mm lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-28", name: "Electronic Auto Focus Adapter", brand: "Sony", category: "Sony Camera & Lenses", type: "Adapter", price: 300, description: "Electronic Auto Focus Adapter for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-29", name: "Tamaron 17-28mm 2.8 for Sony", brand: "Tamron", category: "Sony Camera & Lenses", type: "Lens", price: 800, description: "Tamaron 17-28mm 2.8 lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-30", name: "Sony FE 50mm 1.8 Prime Lense", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 400, description: "Sony FE 50mm 1.8 Prime Lens", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-31", name: "Sony a7M3 (Full Frame 24.2MP) Body", brand: "Sony", category: "Sony Camera & Lenses", type: "Camera", price: 1800, description: "Sony a7M3 (Full Frame 24.2MP) Body", image: "/Sony/sonya7m3.png", available: true },
  { id: "sony-32", name: "Sigma 35mm f/1.4 DG HSM Art", brand: "Sigma", category: "Sony Camera & Lenses", type: "Lens", price: 1000, description: "Sigma 35mm f/1.4 DG HSM Art lens for Sony", image: "/images-will-be-updated-soon.txt", available: true },
  { id: "sony-33", name: "Sony E mount 28-70mm F3.5-5.6", brand: "Sony", category: "Sony Camera & Lenses", type: "Lens", price: 600, description: "Sony E mount 28-70mm F3.5-5.6 lens", image: "/images-will-be-updated-soon.txt", available: true },
]