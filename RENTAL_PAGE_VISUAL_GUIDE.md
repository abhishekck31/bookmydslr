# 📐 Rental Equipment Page - Visual Layout

## Desktop Layout (1024px+)

```
┌────────────────────────────────────────────────────────────────────┐
│                  1️⃣ SEARCH-FIRST HEADER (STICKY)                   │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ 🔍  Search rental equipment (camera, lens, gimbal...)    ✕  │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────┐
│           2️⃣ ICON-BASED CATEGORY NAV (STICKY, MAX 8)              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│
│  │  📷  │ │  📷  │ │  🎥  │ │  💡  │ │  🎤  │ │  🔋  │ │ More ▼││
│  │DSLRs │ │Mir...│ │Lenses│ │Lights│ │Audio │ │Batt..│ │       ││
│  └══════┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘│
│  Active: bold + underline + amber bg                              │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                   MAIN CONTENT (max-w-1320px)                      │
│                                                                    │
│  ▌Rental Equipment              ┌──────────────────────────────┐  │
│    124 items available           │   📊 Filters (3)            │  │
│                                  └──────────────────────────────┘  │
│  ────────────────────────────────────────────────────────────────│
│                                                                    │
│  3️⃣ PRODUCT GRID - EXACTLY 4 COLUMNS                              │
│                                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ ┌──────┐ │ │ ┌──────┐ │ │ ┌──────┐ │ │ ┌──────┐ │            │
│  │ │Image │ │ │ │Image │ │ │ │Image │ │ │ │Image │ │            │
│  │ └──────┘ │ │ └──────┘ │ │ └──────┘ │ │ └──────┘ │            │
│  │✓Available│ │✓Available│ │ ✗ Booked │ │✓Available│            │
│  │          │ │          │ │          │ │          │            │
│  │ Canon    │ │ Nikon    │ │ Sony     │ │ Fujifilm │            │
│  │ EOS R5   │ │ Z9       │ │ A7 IV    │ │ X-T5     │            │
│  │ ⭐ 4.8(12)│ │ ⭐ 4.9(8)│ │ ⭐ 4.7(15)│ │ ⭐ 4.6(9)│            │
│  │          │ │          │ │          │ │          │            │
│  │ ₹2,500   │ │ ₹3,000   │ │ ₹2,200   │ │ ₹1,800   │            │
│  │   /day   │ │   /day   │ │   /day   │ │   /day   │            │
│  │          │ │          │ │          │ │          │            │
│  │[RentNow] │ │[RentNow] │ │[NotAvail]│ │[RentNow] │            │
│  │[Details] │ │[Details] │ │[Details] │ │[Details] │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│                                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Card 5   │ │ Card 6   │ │ Card 7   │ │ Card 8   │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│                                                                    │
│  ← EXACTLY 4 COLUMNS (grid-cols-4) →                              │
└────────────────────────────────────────────────────────────────────┘
```

## Mobile Layout (< 640px)

```
┌──────────────────────────────────┐
│    1️⃣ SEARCH HEADER (STICKY)     │
│  ┌────────────────────────────┐  │
│  │ 🔍  Search equipment...  ✕│  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│   2️⃣ CATEGORY RAIL (STICKY)      │
│  [📷][📷][🎥] →                  │
│  swipeable, no wrapping           │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   MAIN CONTENT                   │
│                                  │
│  Rental Equipment                │
│  124 items       [Filters (3)]   │
│  ─────────────────────────────   │
│                                  │
│  ┌────────────────────────────┐  │
│  │  ┌──────────────────────┐  │  │
│  │  │      Image           │  │  │
│  │  └──────────────────────┘  │  │
│  │  ✓ Available              │  │
│  │  Canon                    │  │
│  │  EOS R5                   │  │
│  │  ⭐ 4.8 (12 reviews)      │  │
│  │                           │  │
│  │  ₹2,500 /day              │  │
│  │                           │  │
│  │  [     Rent Now     ]     │  │
│  │  [   View Details   ]     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │      Card 2                │  │
│  └────────────────────────────┘  │
│                                  │
│  1 COLUMN                        │
└──────────────────────────────────┘
        ↓
┌──────────────────────────────────┐
│   MOBILE BOTTOM NAV              │
│  [🏠][📱][🔍][🛒][👤]           │
│  Home Cat Srch Cart Acct         │
└──────────────────────────────────┘
```

## Search Interaction Flow

```
User Types "canon"
    ↓
Search state updates (instant)
    ↓
Filter function runs:
  products.filter(p =>
    p.name.includes("canon") OR
    p.brand.includes("canon") OR
    p.category.includes("canon")
  )
    ↓
Grid updates instantly
    ↓
Shows: "24 items available"
```

## Category Selection Flow

```
User clicks "Lenses" category icon
    ↓
activeCategory = "lenses"
    ↓
Visual: Icon gets amber bg + underline
    ↓
Filter function runs:
  products.filter(p => 
    p.category.slug === "lenses"
  )
    ↓
Grid updates instantly
    ↓
Search still works (combined filter)
```

## Filter Drawer Flow

```
User clicks "Filters" button
    ↓
Desktop: Right sidebar opens (400px)
Mobile: Bottom sheet slides up (85vh)
    ↓
User selects:
  ☑ Canon
  ☑ Nikon
  Price: ₹500 - ₹5000
  ☑ Available Today
    ↓
User clicks "Apply Filters"
    ↓
filters state updates
    ↓
Filter function combines all:
  - Search query
  - Category
  - Brand
  - Price
  - Availability
    ↓
Grid updates
    ↓
Button shows: "Filters (3)"
```

## Empty State

```
No products match filters
    ↓
┌────────────────────────────┐
│      🔍 (large icon)       │
│                            │
│  No equipment found        │
│                            │
│  Try adjusting your        │
│  search or filters         │
│                            │
│    [  Clear All  ]         │
└────────────────────────────┘
```

## "More" Dropdown

```
Categories Bar:
[📷][📷][🎥][💡][🎤][🔋][⚡][🎬] [More ▼]
                                    │
                                    ▼
                            ┌──────────────┐
                            │ 📹 Sliders   │
                            │ 💾 Storage   │
                            │ 🎒 Bags      │
                            │ ⚙️ Other     │
                            └──────────────┘
```

## Sticky Behavior

```
Scroll Position: Top
┌──────────────────┐
│ Search (visible) │ ← z-50
├──────────────────┤
│ Categories       │ ← z-40
├──────────────────┤
│ Content          │
└──────────────────┘

Scroll Position: Middle  
┌──────────────────┐
│ Search (sticky)  │ ← stays at top
├──────────────────┤
│ Categories       │ ← stays under search
├──────────────────┤
│ Content (scrolled)│
│ [Cards visible]  │
└──────────────────┘
```

## Z-Index Stack

```
Layer 9: Filter drawer backdrop (z-50)
Layer 8: Filter drawer (z-50)
Layer 7: More dropdown (z-50)
Layer 6: Search header (z-50, sticky)
Layer 5: Category nav (z-40, sticky)
Layer 4: Filter button
Layer 3: Product cards
Layer 2: Content bg
Layer 1: Page bg
```

## Grid Measurements

```
Desktop (1024px+):
Container: 1320px max-width
Columns: 4 (grid-cols-4)
Gap: 24px (gap-6)

Card Width Calculation:
= (1320px - (3 × 24px gaps) - (2 × 16px padding)) / 4
= (1320 - 72 - 32) / 4
= 1216 / 4
= 304px per card
```

## Responsive Breakpoints

```
Mobile:     0px  - 639px   (1 column)
Tablet:     640px - 1023px  (2 columns)
Desktop:    1024px+         (4 columns)

Grid classes:
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

## Key Differences vs Old Design

### ❌ OLD (Deleted):
```
┌────────────────────────────┐
│ [All] [DSLR] [Mirrorless] │ ← Pills in rows
│ [Lens] [Gimbal] [Audio]   │
├────────────────────────────┤
│ Brand ▼ | Price ▼ | Sort ▼│ ← Inline filters
├────────────────────────────┤
│ Active: Canon ✕  Price ✕  │ ← Filter chips
├────────────────────────────┤
│ [Card][Card][Card]         │ ← 3 columns
└────────────────────────────┘
```

### ✅ NEW (Built):
```
┌────────────────────────────┐
│ 🔍 Search equipment...     │ ← Search FIRST
├────────────────────────────┤
│ [📷][📷][🎥][💡][More▼]   │ ← Icons, max 8
├────────────────────────────┤
│ 124 items  [Filters (3)]  │ ← Clean header
├────────────────────────────┤
│ [Card][Card][Card][Card]  │ ← EXACTLY 4
└────────────────────────────┘
```

## Color Palette

```
Background:  #F9FAFB (gray-50/50) - soft neutral
Cards:       #FFFFFF (white)
Active:      #FBBF24 (amber-400)
Active BG:   #FEF3C7 (amber-50)
Available:   #22C55E (green-500)
Booked:      #EF4444 (red-500)
Text:        #111827 (gray-900)
Muted:       #6B7280 (gray-500)
```

## Typography

```
Search:        16px base, gray-900
Category:      12px (xs), bold when active
H1:            24-30px (2xl-3xl), bold
Price:         30px (3xl), ultra bold
Brand:         12px (xs), uppercase, gray-500
Name:          16px (base), bold
CTA:           14px (sm), bold
```

---

**This is the exact layout users will see!** 📐✨

**Key Takeaway:** Search is #1, categories are icons, filters are hidden, grid is EXACTLY 4 columns. Clean. Modern. Rental-focused.
