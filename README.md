# IoT Device Portal UI

A professional, responsive dashboard for viewing IoT device metadata, status, and subscription details. Built with React, Next.js, and TypeScript.

## 🚀 Quick Overview

**Project Type**: Full-stack web application  
**Data Source**: CSV dataset (10,000+ IoT devices)  
**Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS  
**Status**: Production-ready ✅

## 🚀 Features

- **Device Dashboard**: View all IoT devices in a responsive grid or table layout
- **Device Details**: Comprehensive device information including metadata, location, and subscription details
- **Advanced Filtering**: Filter devices by status, type, and search by name/location
- **Real-time Status**: Monitor device status (online, offline, maintenance, error)
- **Subscription Management**: View subscription plans, features, and status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible UI**: Built with accessibility best practices in mind
- **Type-Safe**: Full TypeScript support for type safety and better developer experience

## 🛠️ Technology Stack

### **Core Framework**
- **Next.js 14.2.0** - React framework with App Router
  - Server-side rendering (SSR)
  - File-based routing
  - API routes (`/api/devices`)
  - Automatic optimizations

- **React 18.3.0** - UI library
  - Component-based architecture
  - Hooks (`useState`, `useEffect`, `useMemo`)
  - Client-side interactivity

- **TypeScript 5.5.0** - Type-safe JavaScript
  - Full type coverage
  - Interface definitions
  - Compile-time checking

### **Styling & UI**
- **Tailwind CSS 3.4.4** - Utility-first CSS
  - Responsive utilities
  - Custom theme
  - CSS variables

- **Radix UI** - Accessible primitives
  - Select, Slot, Tabs components
  - Built-in accessibility

- **shadcn/ui Pattern** - Component library
  - Reusable components
  - Copy-paste architecture

- **Lucide React 0.400.0** - Icon library
  - 1000+ icons
  - Tree-shakeable

### **Data Processing**
- **PapaParse 5.5.3** - CSV parsing
  - Handles 10,000+ rows
  - Type-safe parsing

- **date-fns 3.6.0** - Date utilities
  - Formatting
  - Relative time

### **Utilities**
- **clsx 2.1.1** - Conditional classes
- **tailwind-merge 2.4.0** - Merge Tailwind classes
- **class-variance-authority 0.7.0** - Component variants

### **Development Tools**
- **ESLint 8.57.0** - Code linting
- **PostCSS 8.4.38** - CSS processing
- **Autoprefixer 10.4.19** - Vendor prefixing

## 📁 Project Structure

```
iot-device-portal-ui/
├── app/                      # Next.js App Router pages
│   ├── devices/             # Device-related pages
│   │   ├── page.tsx        # Device listing page
│   │   └── [id]/           # Dynamic route for device details
│   │       └── page.tsx
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (redirects to /devices)
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── device/            # Device-specific components
│   │   ├── device-card.tsx
│   │   ├── device-table.tsx
│   │   └── device-filters.tsx
│   ├── layout/            # Layout components
│   │   └── header.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── select.tsx
│       └── table.tsx
├── lib/                   # Utility functions and API
│   ├── api.ts            # API integration layer
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
│   └── device.ts         # Device-related types
└── public/               # Static assets
```

## 🏗️ Architecture Overview

### Component Architecture

The project follows a component-based architecture with clear separation of concerns:

1. **UI Components** (`components/ui/`): Reusable, generic components (Button, Card, Table, etc.)
2. **Feature Components** (`components/device/`): Domain-specific components (DeviceCard, DeviceTable, etc.)
3. **Layout Components** (`components/layout/`): Page layout components (Header, Navigation, etc.)

### Data Flow

1. **API Layer** (`lib/api.ts`): Centralized API functions for fetching device data
2. **Type Definitions** (`types/device.ts`): TypeScript interfaces for type safety
3. **Pages** (`app/`): Next.js pages that use components and API functions

### Routing

- Uses Next.js App Router for file-based routing
- `/` - Redirects to `/devices`
- `/devices` - Device listing page with filters
- `/devices/[id]` - Individual device detail page

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Basic knowledge of React and TypeScript

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "IoT Device Portal UI"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables (optional):**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📚 Key Concepts

### Next.js App Router

This project uses Next.js 14's App Router, which provides:
- **Server Components** by default (better performance)
- **File-based routing** with the `app/` directory
- **Layouts** for shared UI across routes
- **Loading states** and error boundaries

### TypeScript Types

All device data is strongly typed:
- `Device` - Main device interface
- `DeviceStatus` - Device status union type
- `DeviceType` - Device type union type
- `DeviceMetadata` - Device metadata structure
- `Subscription` - Subscription information
- `DeviceFilters` - Filter options

### API Integration

The API layer (`lib/api.ts`) provides:
- `fetchDevices()` - Fetch all devices with optional filters
- `fetchDeviceById()` - Fetch a single device by ID
- Mock data fallback for development

To connect to a real API:
1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Modify `lib/api.ts` to match your API response format
3. Add authentication headers if needed

### Styling Approach

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (supports dark mode)
- **Responsive Design** using Tailwind's breakpoints
- **Component Variants** using class-variance-authority

## 🎨 Design System

### Color Palette

The project uses a semantic color system:
- **Primary**: Blue tones for main actions
- **Secondary**: Gray tones for secondary elements
- **Success**: Green for online/active states
- **Warning**: Yellow for maintenance states
- **Destructive**: Red for errors/offline states

### Component Patterns

- **Cards**: Used for device information display
- **Tables**: For tabular data (device list)
- **Badges**: For status indicators
- **Filters**: For search and filtering functionality

## 🔧 Customization

### Adding New Device Types

1. Update `DeviceType` in `types/device.ts`
2. Add filter option in `components/device/device-filters.tsx`
3. Update display logic in components

### Modifying API Endpoints

Edit `lib/api.ts` to match your backend API:
- Update `API_BASE_URL`
- Modify request/response handling
- Add authentication if needed

### Styling Customization

- Modify `tailwind.config.ts` for theme customization
- Update CSS variables in `app/globals.css` for colors
- Customize component styles in individual component files

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Components automatically adapt to screen size using Tailwind's responsive utilities.

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast color ratios

## 🧪 Development Best Practices

1. **Type Safety**: Always use TypeScript types
2. **Component Reusability**: Create reusable components in `components/ui/`
3. **API Abstraction**: Keep API logic in `lib/api.ts`
4. **Error Handling**: Implement proper error states
5. **Loading States**: Show loading indicators during data fetching
6. **Code Organization**: Follow the project structure

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Type check without emitting files

## 🔮 Future Enhancements

Potential features to add:
- Real-time updates via WebSockets
- Device management actions (edit, delete)
- Export device data (CSV, PDF)
- Advanced analytics and charts
- User authentication and authorization
- Dark mode toggle
- Bulk operations
- Device grouping and tags

## 🤝 Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Write reusable components
4. Add proper error handling
5. Test on multiple screen sizes

## 📄 License

This project is built as a professional demonstration of modern web development practices.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Built with ❤️ using modern web technologies**

