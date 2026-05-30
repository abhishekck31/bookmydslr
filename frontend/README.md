# BookMyDSLR - Camera & Equipment Rental Platform

A comprehensive Next.js-based camera and photography equipment rental platform built with modern web technologies. This platform allows users to browse, rent, and manage camera equipment while providing administrators with powerful inventory management tools.

## 🚀 Features

### For Users
- **Equipment Browsing**: Browse cameras, lenses, and accessories by category
- **Product Details**: View detailed specifications, pricing, and availability
- **Shopping Cart**: Add items to cart and manage rental periods
- **Responsive Design**: 100% mobile-friendly interface
- **Search & Filter**: Advanced search and filtering capabilities

### For Administrators
- **Inventory Management**: Complete CRUD operations for products
- **Availability Toggle**: Quick on/off switches for product availability
- **Discount System**: Percentage-based discounts with offer names
- **Category Management**: Organize products by categories
- **Lead Management**: Track customer inquiries and requests
- **Real-time Updates**: Live inventory status updates

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.4.10 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks + Context API
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

### Backend
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **API**: Next.js API Routes
- **File Upload**: Ready for image uploads

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint + TypeScript
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
book-my-dslr/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard routes
│   │   ├── dashboard/            # Main admin dashboard
│   │   ├── products/             # Product management
│   │   │   ├── [id]/           # Dynamic product routes
│   │   │   └── edit/           # Product editing
│   │   └── categories/          # Category management
│   ├── api/                     # API routes
│   │   ├── admin/               # Admin API endpoints
│   │   │   ├── products/        # Product CRUD APIs
│   │   │   ├── categories/      # Category APIs
│   │   │   ├── leads/          # Lead management
│   │   │   └── settings/       # Global settings
│   │   ├── auth/               # Authentication APIs
│   │   ├── categories/          # Public category APIs
│   │   ├── leads/              # Lead submission
│   │   └── products/           # Public product APIs
│   ├── (public)/               # Public pages
│   │   ├── cameras/            # Camera listings
│   │   ├── lenses/             # Lens listings
│   │   ├── accessories/        # Accessories listings
│   │   └── cart/               # Shopping cart
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/                  # Reusable React components
│   ├── admin/                  # Admin-specific components
│   │   ├── product-table.tsx    # Inventory table with toggles
│   │   ├── product-form.tsx     # Product creation/editing form
│   │   └── dashboard-stats.tsx  # Admin dashboard stats
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx          # Button component
│   │   ├── table.tsx           # Table component
│   │   ├── form.tsx            # Form components
│   │   └── ...                # Other UI components
│   ├── product-card.tsx         # Product display card
│   ├── navbar.tsx              # Navigation bar
│   ├── footer.tsx              # Footer component
│   └── ...                    # Other shared components
├── lib/                       # Utility libraries
│   ├── prisma.ts              # Prisma client configuration
│   └── utils.ts               # Helper functions
├── prisma/                    # Database configuration
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Database migration files
├── public/                     # Static assets
│   ├── images/                # Static images
│   └── icons/                # Icon files
├── styles/                     # Styling files
│   └── globals.css            # Global CSS styles
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.mjs           # Next.js configuration
```

## 🗄️ Database Schema

### Core Models

#### Product
```typescript
{
  id: string                    // UUID primary key
  name: string                 // Product name
  description: string           // Product description
  price: float                 // Daily rental price
  brand: string?               // Brand name
  type: string?                // Product type/model
  categoryId: string            // Category reference
  isAvailable: boolean         // Availability status
  discountPercentage: float?     // Discount percentage (0-100)
  offerName: string?           // Discount offer name
  specs: Json?                 // Technical specifications
  features: Json?              // Product features
  image: string?               // Product image URL
  rating: float?               // Customer rating
  reviews: int?                // Number of reviews
  createdAt: DateTime          // Creation timestamp
  updatedAt: DateTime          // Last update timestamp
}
```

#### Category
```typescript
{
  id: string                   // UUID primary key
  name: string                 // Category name (unique)
  slug: string                 // URL slug (unique)
  image: string?               // Category image
  createdAt: DateTime          // Creation timestamp
  updatedAt: DateTime          // Last update timestamp
}
```

#### Admin
```typescript
{
  id: string                   // UUID primary key
  email: string                // Admin email (unique)
  password: string             // Hashed password
  createdAt: DateTime          // Creation timestamp
  updatedAt: DateTime          // Last update timestamp
}
```

#### Lead
```typescript
{
  id: string                   // UUID primary key
  name: string                 // Customer name
  phone: string                // Customer phone
  city: string                 // Customer city
  details: Json?               // Additional details
  source: string?              // Lead source
  status: string               // Lead status (NEW, CONTACTED, etc.)
  createdAt: DateTime          // Creation timestamp
}
```

#### Availability
```typescript
{
  id: string                   // UUID primary key
  productId: string            // Product reference
  startDate: DateTime          // Unavailable start date
  endDate: DateTime            // Unavailable end date
  reason: string?              // Reason for unavailability
}
```

## 🔌 API Endpoints

### Public APIs

#### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/[id]` - Get specific product

#### Categories
- `GET /api/categories` - Get all categories

#### Leads
- `POST /api/leads` - Submit new lead

### Admin APIs (Protected)

#### Authentication
- `POST /api/admin/login` - Admin login

#### Products Management
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

#### Categories Management
- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category

#### Leads Management
- `GET /api/admin/leads` - Get all leads
- `PUT /api/admin/leads/[id]` - Update lead status
- `DELETE /api/admin/leads/[id]` - Delete lead

#### Settings
- `GET /api/admin/settings` - Get global settings
- `PUT /api/admin/settings` - Update global settings

## 🔐 Authentication

### Setup
- **Provider**: NextAuth.js with Credentials provider
- **Admin Credentials**: 
  - Email: `bookmydslr@gmail.com`
  - Password: `bookmydslr@2015`
- **Session Management**: JWT tokens
- **Protection**: Middleware-based route protection

### Access Control
- **Admin Routes**: `/admin/*` protected
- **API Routes**: Admin APIs require authentication
- **Session Duration**: Configurable (default 30 days)

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Authentication
AUTH_SECRET=your-secret-key-here
AUTH_URL=http://localhost:3000  # Production: https://yourdomain.com

# Optional: Additional configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: Secret key for JWT signing
- `AUTH_URL`: Base URL for auth callbacks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishekck31/bookmydslr.git
   cd book-my-dslr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and auth secret
   ```

4. **Set up database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # (Optional) Seed database with sample data
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin/login
   - API Documentation: http://localhost:3000/api

## 🛠️ Development Workflow

### Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio       # Open Prisma Studio
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes
npx prisma migrate dev  # Create new migration
npx prisma db seed     # Seed database
```

### Code Structure Guidelines

#### Components
- Place reusable components in `/components`
- Use TypeScript for all components
- Follow React best practices
- Use Tailwind for styling

#### API Routes
- Follow RESTful conventions
- Use proper HTTP status codes
- Implement error handling
- Validate input data

#### Database
- Use Prisma for all database operations
- Keep schema in sync with code
- Use migrations for schema changes
- Include proper indexes for performance

## 🎨 UI/UX Guidelines

### Design System
- **Color Scheme**: Tailwind default + custom amber accents
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent Tailwind spacing scale
- **Components**: shadcn/ui for consistency

### Responsive Design
- **Mobile-First**: Design for mobile first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Components**: All components are responsive
- **Navigation**: Mobile-friendly hamburger menu

### Accessibility
- **Semantic HTML**: Use proper HTML5 elements
- **ARIA Labels**: Include where necessary
- **Keyboard Navigation**: Support keyboard users
- **Screen Readers**: Compatible with screen readers

## 📦 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment
1. Build the application: `npm run build`
2. Set environment variables
3. Start production server: `npm run start`

### Environment-Specific Considerations
- **Development**: Use local database, hot reload
- **Production**: Use production database, optimized build
- **Database**: Use connection pooling for production

## 🐛 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check DATABASE_URL format
# Ensure SSL is enabled
# Verify network connectivity
```

#### Prisma Issues
```bash
# Regenerate client
npx prisma generate

# Reset database (careful!)
npx prisma db push --force-reset
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=prisma:*
```

## 🤝 Contributing

### Development Guidelines
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** changes following the code style
4. **Test** thoroughly
5. **Commit** with descriptive messages
6. **Push** to your fork
7. **Create** a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Include tests for new features
- Update documentation

## 📝 License

This project is proprietary and not open source. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: support@bookmydslr.com
- Documentation: This README file
- Issues: GitHub Issues (if available)

---

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Complete inventory management system
- ✅ Discount and offer system
- ✅ Responsive design
- ✅ Admin dashboard
- ✅ Product CRUD operations
- ✅ Category management
- ✅ Lead management
- ✅ Authentication system

### Key Features Added
- **Available for Rent Toggle**: Quick availability management
- **Discount System**: Percentage-based discounts with offer names
- **Enhanced Editing**: Complete product detail editing
- **Mobile Optimization**: 100% responsive design
- **Real-time Updates**: Live inventory status changes

---

*Last updated: January 2026*
