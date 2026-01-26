# 📐 PLP Layout - Visual Guide

## Desktop Layout (1024px+)

```
┌────────────────────────────────────────────────────────────────────┐
│                          PLPHeader (Sticky)                        │
│  ┌──────┐  ┌─────────────────────────────────┐  ┌──────┐         │
│  │ Logo │  │ 🔍 Search cameras, lenses... ⌘K│  │ 🛒 3 │         │
│  └──────┘  └─────────────────────────────────┘  └──────┘         │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│                     CategoryRail (Sticky)                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │  📷  │ │  📷  │ │  🎥  │ │  💡  │ │  🎤  │ │  🔋  │ │ More ▼││
│  │ DSLR │ │ Mirr │ │ Lens │ │Light │ │Audio │ │ Batt │ │       ││
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘│
│     ══════ (Active underline)                                      │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                   Main Content (max-w-1320px)                      │
│                                                                    │
│  Home > Equipment > DSLR Cameras                                  │
│  ─────────────────────────────────────────────────────────────    │
│                                                                    │
│  ▌DSLR Cameras                              ┌──────────────────┐  │
│    24 products available                     │  📊 Filters (3) │  │
│                                              └──────────────────┘  │
│  ────────────────────────────────────────────────────────────────│
│                                                                    │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │  ┌─────┐  │ │  ┌─────┐  │ │  ┌─────┐  │ │  ┌─────┐  │        │
│  │  │Image│  │ │  │Image│  │ │  │Image│  │ │  │Image│  │        │
│  │  └─────┘  │ │  └─────┘  │ │  └─────┘  │ │  └─────┘  │        │
│  │  Canon    │ │  Nikon    │ │  Sony     │ │  Canon    │        │
│  │  EOS R5   │ │  Z9       │ │  A7IV     │ │  5D IV    │        │
│  │  ⭐ 4.8(12) │ │  ⭐ 4.9(8)│ │  ⭐ 4.7(15)│ │  ⭐ 4.6(20)│        │
│  │  ₹2,500/day│ │  ₹3,000/d │ │  ₹2,200/d │ │  ₹1,800/d │        │
│  │ ✓Available│ │ ✓Available│ │ ✗ Booked  │ │ ✓Available│        │
│  │ ┌────────┐│ │ ┌────────┐│ │ ┌────────┐│ │ ┌────────┐│        │
│  │ │RentNow ││ │ │RentNow ││ │ │NotAvail││ │ │RentNow ││        │
│  │ └────────┘│ │ └────────┘│ │ └────────┘│ │ └────────┘│        │
│  │ [Details] │ │ [Details] │ │ [Details] │ │ [Details] │        │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘        │
│                                                                    │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │  Card 5   │ │  Card 6   │ │  Card 7   │ │  Card 8   │        │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘        │
│                                                                    │
│  ← 4 COLUMNS (EXACTLY) →                                          │
└────────────────────────────────────────────────────────────────────┘
```

## Tablet Layout (640px - 1023px)

```
┌────────────────────────────────────────┐
│          PLPHeader (Sticky)            │
│  Logo  [Search Bar]  [Cart]            │
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│       CategoryRail (Sticky)            │
│  [📷][📷][🎥][💡][🎤][🔋] →           │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│           Main Content                 │
│                                        │
│  DSLR Cameras       [Filters (3)]      │
│  24 products                           │
│                                        │
│  ┌────────────┐ ┌────────────┐        │
│  │   Card 1   │ │   Card 2   │        │
│  │            │ │            │        │
│  └────────────┘ └────────────┘        │
│  ┌────────────┐ ┌────────────┐        │
│  │   Card 3   │ │   Card 4   │        │
│  └────────────┘ └────────────┘        │
│                                        │
│  ← 2 COLUMNS →                         │
└────────────────────────────────────────┘
```

## Mobile Layout (< 640px)

```
┌──────────────────────┐
│    PLPHeader         │
│ [🏠] [Search] [🛒]   │
└──────────────────────┘
┌──────────────────────┐
│   CategoryRail       │
│ [📷][📷][🎥] →      │
└──────────────────────┘

┌──────────────────────┐
│   Main Content       │
│                      │
│  DSLR Cameras        │
│  24 products         │
│      [Filters (3)]   │
│                      │
│  ┌────────────────┐  │
│  │   ┌────────┐   │  │
│  │   │ Image  │   │  │
│  │   └────────┘   │  │
│  │   Canon        │  │
│  │   EOS R5       │  │
│  │   ⭐ 4.8 (12)  │  │
│  │   ₹2,500/day   │  │
│  │   ✓ Available  │  │
│  │   [Rent Now]   │  │
│  │   [Details]    │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │   Card 2       │  │
│  └────────────────┘  │
│                      │
│  1 COLUMN            │
└──────────────────────┘
        ↓
┌──────────────────────┐
│  Mobile Bottom Nav   │
│ [🏠][📱][🔍][🛒][👤]│
└──────────────────────┘
```

## Filter Drawer States

### Desktop - Side Drawer (400px)
```
┌──────────────────┬────────────────────────┐
│                  │  Smart Filter Drawer   │
│                  ├────────────────────────┤
│  Product Grid    │  Filters               │
│  (continues)     │  ☑ Canon               │
│                  │  ☑ Nikon               │
│  [Card] [Card]   │  ☐ Sony                │
│  [Card] [Card]   │                        │
│                  │  Price: ₹0 - ₹10,000   │
│                  │  [════○─────]          │
│                  │                        │
│                  │  Camera Type           │
│                  │  [DSLR] [Mirrorless]   │
│                  │                        │
│                  │  ⋮                     │
│                  ├────────────────────────┤
│                  │ [Apply Filters (24)]   │
│                  └────────────────────────┘
└──────────────────┘
```

### Mobile - Bottom Sheet (85vh)
```
┌──────────────────────┐
│   Main Content       │
│   (blurred bg)       │
│                      │
│      ───────         │ ← Swipe down to close
│ ┌──────────────────┐ │
│ │Filters      ✕   │ │
│ │Clear All         │ │
│ ├──────────────────┤ │
│ │Brand             │ │
│ │☑ Canon           │ │
│ │☑ Nikon           │ │
│ │☐ Sony            │ │
│ │                  │ │
│ │Price: ₹0-10k     │ │
│ │[═════○───]       │ │
│ │                  │ │
│ │Camera Type       │ │
│ │[DSLR][Mirrorless]│ │
│ │                  │ │
│ │ ⋮                │ │
│ ├──────────────────┤ │
│ │[Apply (24 found)]│ │
│ └──────────────────┘ │
└──────────────────────┘
```

## Category Rail - "More" Dropdown

```
Desktop Category Rail with More Dropdown:

┌───────────────────────────────────────────────┐
│ [📷][📷][🎥][💡][🎤][🔋][🎮][⚡] [More ▼]     │
└───────────────────────────────────────────────┘
                                        │
                                        ▼
                            ┌────────────────────┐
                            │ 📹 Accessories     │
                            │ 🎬 Sliders         │
                            │ 💾 Storage         │
                            │ 🎒 Bags            │
                            └────────────────────┘
```

## Z-Index Hierarchy

```
Layer 9: (future modals)
Layer 8: (future toast/notifications)
Layer 7: SmartFilterDrawer backdrop (z-50)
Layer 6: SmartFilterDrawer (z-50)
Layer 5: MobileBottomNav (z-50)
Layer 4: PLPHeader (z-50)
Layer 3: CategoryRail (z-40)
Layer 2: More dropdown (z-50)
Layer 1: Product cards
Layer 0: Background
```

## Sticky Behavior (Desktop)

```
Scroll Position: Top
┌────────────────────┐
│ PLPHeader (visible)│ ← sticky top-0
├────────────────────┤
│ CategoryRail       │ ← sticky (under header)
├────────────────────┤
│ Content scrolls    │
└────────────────────┘

Scroll Position: Middle
┌────────────────────┐
│ PLPHeader (sticky) │ ← stays at top
├────────────────────┤
│ CategoryRail       │ ← stays under header
├────────────────────┤
│ Content (scrolled) │
│ [Cards visible]    │
└────────────────────┘
```

## Responsive Breakpoints

```
Mobile:     0px  - 639px   (1 column)
Tablet:     640px - 1023px  (2 columns)
Desktop:    1024px - 1279px (4 columns)
XL Desktop: 1280px+         (4 columns, max 1320px container)
```

## Hover States (Desktop Only)

### Product Card Hover
```
Before Hover:
┌─────────────┐
│   Image     │
│   Canon R5  │
│   ₹2,500/d  │
│ [Rent Now]  │
└─────────────┘

During Hover:
  ┌─────────────┐
  │   Image ↑   │ ← lifted (-translate-y-1)
  │   Canon R5  │    scaled (110%)
  │   ₹2,500/d  │    shadow-xl
  │ [Rent Now]  │    border-amber-400
  └─────────────┘
```

## Touch Targets (Mobile)

All interactive elements have minimum 44x44px touch targets:

```
✅ Category icons: 80px × ~60px
✅ Filter button: 120px × 44px
✅ Product card CTAs: Full width × 48px
✅ Bottom nav items: ~75px × 60px
✅ Search input: Full width × 40px
```

## Color Palette

```
Background Colors:
├─ Page: #F9FAFB (gray-50/50)
├─ Cards: #FFFFFF (white)
├─ Active category bg: #FEF3C7 (amber-50/50)
└─ Filter drawer bg: #FFFFFF

Text Colors:
├─ Primary: #111827 (gray-900)
├─ Secondary: #4B5563 (gray-600)
├─ Muted: #9CA3AF (gray-400)
└─ Active: EC9006 (amber-600)

Accent Colors:
├─ Primary CTA: #FBBF24 (amber-400)
├─ Border Active: #FBBF24 (amber-400)
├─ Available Badge: #22C55E (green-500)
└─ Booked Badge: #EF4444 (red-500)
```

## Grid Measurements (Desktop 1024px+)

```
Container: 1320px max-width
Columns: 4 exactly
Gap: 24px (1.5rem)

Calculation:
Card Width = (1320px - (3 × 24px gap) - (2 × 16px padding)) / 4
          = (1320 - 72 - 32) / 4
          = 1216 / 4
          = 304px per card
```

## Performance Metrics

```
Target Performance:
├─ FCP: < 1.5s
├─ LCP: < 2.5s
├─ FID: < 100ms
├─ CLS: < 0.1
└─ TTI: < 3.5s

Optimizations Applied:
├─ Server-side rendering ✓
├─ Image lazy loading ✓
├─ Code splitting ✓
├─ Tree-shaking ✓
└─ CSS transitions (GPU) ✓
```

---

## Quick Reference

### File Locations
```
components/rental/
├── plp-header.tsx         → Search + Logo + Cart
├── category-rail.tsx       → Icon categories (max 8)
├── smart-filter-drawer.tsx → Filters (bottom sheet/sidebar)
└── premium-product-card.tsx → Product card

app/rental-equipment/[category]/
└── page.tsx               → Main PLP page

components/
└── mobile-bottom-nav.tsx  → Mobile nav (5 items)
```

### Key Class Names
```tsx
Grid:     "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
Container: "w-full max-w-[1320px] mx-auto"
Card:     "rounded-2xl border-2 hover:border-amber-400"
Button:   "bg-amber-400 hover:bg-amber-500"
Shadow:   "shadow-sm hover:shadow-xl"
```

---

**This is the exact layout your users will see!** 📐✨
