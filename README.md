# Drunch Café - Modern Restaurant Website

A professional, modern multi-page restaurant website for Drunch Café featuring a dark theme with blue accent highlights.

## Features

### Pages
- **Home** - Hero section, featured dishes, why choose us, testimonials, and map
- **About Us** - Restaurant story, mission & vision, and team introduction
- **Menu** - Categorized menu with breakfast, lunch, beverages, and desserts
- **Gallery** - Responsive image grid with hover effects
- **Contact** - Contact information, form, and Google Maps integration

### Interactive Features
- **Table Reservations** - Book a table with date, time, and guest count
- **Online Ordering** - Add items to cart and place orders
- **Customer Reviews** - Display approved customer testimonials
- **FAQ Chatbot** - Interactive chatbot for common questions
- **Shopping Cart** - Persistent cart with localStorage

### Design
- Dark modern UI with black and charcoal backgrounds
- Blue glowing accent colors for buttons and highlights
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional typography and spacing

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Navigation**: Custom state-based routing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Supabase credentials to the `.env` file:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

The database migration has already been applied with the following tables:
- `menu_items` - Restaurant menu with items, prices, and images
- `reservations` - Table booking requests
- `reviews` - Customer reviews and ratings
- `contact_messages` - Contact form submissions
- `orders` - Online order records

Sample data has been pre-populated including menu items and reviews.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Navigation header
│   ├── Footer.tsx           # Footer with links
│   ├── ReservationModal.tsx # Table booking modal
│   ├── CartModal.tsx        # Shopping cart and checkout
│   └── Chatbot.tsx          # FAQ chatbot widget
├── pages/
│   ├── Home.tsx            # Home page
│   ├── About.tsx           # About us page
│   ├── Menu.tsx            # Menu page
│   ├── Gallery.tsx         # Gallery page
│   └── Contact.tsx         # Contact page
├── lib/
│   └── supabase.ts         # Supabase client
├── App.tsx                 # Main application component
└── main.tsx                # Application entry point
```

## Contact Information

**Drunch Café**
- Address: B-12, Block 1, Near Practical Center & Total Parco Petrol Pump, Gulshan-e-Iqbal, Karachi, Pakistan
- Phone: 0312 2323244
- Email: drunch.pakistan@gmail.com

## License

Copyright © 2024 Drunch Café. All rights reserved.
